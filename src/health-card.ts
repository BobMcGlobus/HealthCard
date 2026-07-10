import { LitElement, html, css, nothing } from 'lit';
import type { PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  Aggregate,
  GoalType,
  GraphType,
  HealthCardConfig,
  HomeAssistant,
  HassEntity,
  MetricConfig,
  MetricType,
  SeriesConfig,
  TrendMode,
} from './types';
import { PRESETS, SERIES_PALETTE, resolveColor } from './presets';
import type { MetricPreset } from './presets';
import { lang, t } from './i18n';
import { fmtDuration, fmtLastUpdated, fmtNumber, joinUnit } from './format';
import { bucketDaily, fetchHistory, fillGaps, trendDelta } from './history';
import type { HistoryMap } from './history';
import { barChart, lineChart, scoreRing } from './charts';
import './editor';

const CARD_VERSION = '0.2.0';

/** Minimum time between history refetches triggered by state changes */
const REFETCH_MIN_MS = 5 * 60 * 1000;
/** Unconditional refresh (day rollover, recorder catch-up) */
const REFETCH_MAX_AGE_MS = 15 * 60 * 1000;

interface SeriesData extends SeriesConfig {
  colorResolved: string;
  buckets: number[];
  filled: number[];
}

/** Everything derived from a metric config that tile and popup rendering share */
interface MetricCtx {
  m: MetricConfig;
  type: MetricType;
  preset: MetricPreset;
  accent: string;
  name: string;
  icon: string;
  series: SeriesConfig[];
  primaryState?: HassEntity;
  days: number;
  graph: GraphType;
  aggregate: Aggregate;
  trendMode: TrendMode;
  precision?: number;
  unit: string;
  data: SeriesData[];
  valueOverride?: number;
  goalType: GoalType;
  multi: boolean;
}

const CARD_STYLES = ['default', 'withings', 'glass', 'material', 'bubble'];

@customElement('health-card')
export class HealthCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: HealthCardConfig;
  @state() private _history: HistoryMap = {};
  @state() private _popup: number | null = null;

  private _onKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this._popup !== null) this._popup = null;
  };

  public connectedCallback(): void {
    super.connectedCallback();
    window.addEventListener('keydown', this._onKeydown);
  }

  public disconnectedCallback(): void {
    window.removeEventListener('keydown', this._onKeydown);
    super.disconnectedCallback();
  }

  private _fetching = false;
  private _cfgSig = '';
  private _stateSig = '';
  private _lastFetch = 0;

  public static getConfigElement(): HTMLElement {
    return document.createElement('health-card-editor');
  }

  public static getStubConfig(hass: HomeAssistant): Partial<HealthCardConfig> {
    const byClass = (dc: string) =>
      Object.values(hass.states).find(
        (s) => s.entity_id.startsWith('sensor.') && s.attributes.device_class === dc
      )?.entity_id;
    const metrics: MetricConfig[] = [];
    const weight = byClass('weight');
    if (weight) metrics.push({ type: 'weight', entity: weight });
    const temp = byClass('temperature');
    if (temp) metrics.push({ type: 'temperature', entity: temp });
    if (!metrics.length) metrics.push({ type: 'weight', entity: '' });
    return { title: 'Gesundheit', metrics };
  }

  public setConfig(config: HealthCardConfig): void {
    if (!config || !Array.isArray(config.metrics) || !config.metrics.length) {
      throw new Error('Please define at least one metric (metrics: [...])');
    }
    this._config = config;
  }

  public getCardSize(): number {
    const rows = Math.ceil(
      (this._config?.metrics.length ?? 1) / (this._config?.columns ?? 1)
    );
    return 1 + rows * 2;
  }

  public getGridOptions(): Record<string, number> {
    return { columns: 12, min_columns: 6 };
  }

  protected updated(changed: PropertyValues): void {
    super.updated(changed);
    if (changed.has('hass') || changed.has('_config')) void this._maybeFetch();
  }

  private _watchedEntities(): string[] {
    const ids = new Set<string>();
    for (const m of this._config?.metrics ?? []) {
      for (const s of this._series(m)) if (s.entity) ids.add(s.entity);
      for (const id of m.secondary ?? []) ids.add(id);
      for (const id of Object.values(m.phases ?? {})) if (id) ids.add(id);
    }
    return [...ids].filter((id) => this.hass?.states[id]);
  }

  /** Goal can be a plain number, a numeric string or an entity id. */
  private _resolveGoal(goal?: number | string): number {
    if (typeof goal === 'number') return goal;
    if (typeof goal !== 'string' || !goal) return NaN;
    const st = this.hass.states[goal];
    return st ? parseFloat(st.state) : parseFloat(goal);
  }

  private _handleTap(m: MetricConfig, index: number, entityId?: string): void {
    const action = m.tap_action ?? 'popup';
    if (action === 'none') return;
    if (action === 'link') {
      if (!m.link) return;
      if (/^https?:\/\//.test(m.link)) {
        window.open(m.link, '_blank', 'noopener');
        return;
      }
      history.pushState(null, '', m.link);
      this.dispatchEvent(
        new Event('location-changed', { bubbles: true, composed: true })
      );
      return;
    }
    if (action === 'more-info') {
      this._moreInfo(entityId);
      return;
    }
    this._popup = index;
  }

  private _maybeFetch(): void {
    if (!this.hass || !this._config || this._fetching) return;
    const ids = this._watchedEntities();
    if (!ids.length) return;
    const days = Math.max(
      ...this._config.metrics.map((m) => m.days ?? this._config!.days ?? 7)
    );
    const cfgSig = `${days}|${ids.join(',')}`;
    const stateSig = ids.map((id) => this.hass.states[id]?.last_updated ?? '').join('|');
    const now = Date.now();
    const stale =
      cfgSig !== this._cfgSig ||
      now - this._lastFetch > REFETCH_MAX_AGE_MS ||
      (stateSig !== this._stateSig && now - this._lastFetch > REFETCH_MIN_MS);
    if (!stale) return;

    this._fetching = true;
    this._cfgSig = cfgSig;
    this._stateSig = stateSig;
    fetchHistory(this.hass, ids, days)
      .then((h) => {
        this._history = h;
        this._lastFetch = Date.now();
      })
      .catch((e) => console.warn('health-card: history fetch failed', e))
      .finally(() => {
        this._fetching = false;
      });
  }

  private _series(m: MetricConfig): SeriesConfig[] {
    if (m.entities?.length) {
      return m.entities.map((e) => (typeof e === 'string' ? { entity: e } : e));
    }
    const list: SeriesConfig[] = [];
    if (m.entity) list.push({ entity: m.entity });
    if (m.entity2) list.push({ entity: m.entity2 });
    return list;
  }

  private _numeric(stateObj?: HassEntity, attribute?: string): number {
    if (!stateObj) return NaN;
    const raw = attribute ? stateObj.attributes[attribute] : stateObj.state;
    return typeof raw === 'number' ? raw : parseFloat(raw);
  }

  private _moreInfo(entityId?: string): void {
    if (!entityId) return;
    this.dispatchEvent(
      new CustomEvent('hass-more-info', {
        detail: { entityId },
        bubbles: true,
        composed: true,
      })
    );
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const c = this._config;
    const style = CARD_STYLES.includes(c.card_style ?? '') ? c.card_style : 'withings';
    const cardClass = [
      'cardroot',
      `s-${style}`,
      c.tiles === false ? 'flat' : 'tiles',
      c.flush ? 'flush' : '',
    ].join(' ');
    const inner = html`
      ${c.title
        ? html`<div class="header">
            <div class="title">${c.title}</div>
            ${c.subtitle ? html`<div class="subtitle">${c.subtitle}</div>` : nothing}
          </div>`
        : nothing}
      <div
        class="metrics ${c.layout === 'carousel' ? 'carousel' : ''}"
        style="--hc-columns:${c.columns ?? 1}"
      >
        ${c.metrics.map((m, i) => this._renderMetric(m, i))}
      </div>
    `;
    // background: false renders a plain div instead of ha-card so that no
    // theme/card-mod border, shadow or background can leak in.
    return html`
      ${c.background === false
        ? html`<div class="${cardClass} nobg">${inner}</div>`
        : html`<ha-card class=${cardClass}>${inner}</ha-card>`}
      ${this._renderPopup()}
    `;
  }

  /** Builds the shared render context for a metric (used by tile and popup). */
  private _ctx(m: MetricConfig): MetricCtx {
    const type = (m.type && PRESETS[m.type] ? m.type : 'custom') as MetricType;
    const preset = PRESETS[type];
    const accent = resolveColor(m.color) ?? resolveColor(preset.color)!;
    const name = m.name ?? t(this.hass, type);
    const icon = m.icon ?? preset.icon;
    const phaseIds = Object.values(m.phases ?? {}).filter(Boolean) as string[];
    let series = this._series(m);
    // Sleep without a total entity: borrow the first phase entity as primary
    // (timestamp, tap target); value and chart are synthesized from the phases.
    if (!series.length && type === 'sleep' && phaseIds.length) {
      series = [{ entity: phaseIds[0] }];
    }
    const primaryState = series[0]?.entity
      ? this.hass.states[series[0].entity]
      : undefined;
    const days = Math.max(1, m.days ?? this._config?.days ?? 7);
    const graph = m.graph ?? preset.graph;
    const aggregate = m.aggregate ?? preset.aggregate;
    const trendMode = m.trend ?? preset.trend;
    const precision = m.precision ?? preset.precision;
    const unit =
      m.unit ??
      series[0]?.unit ??
      primaryState?.attributes.unit_of_measurement ??
      preset.unit ??
      '';

    const data: SeriesData[] = series.map((s, i) => {
      const buckets = bucketDaily(this._history[s.entity] ?? [], days, aggregate);
      return {
        ...s,
        colorResolved:
          resolveColor(s.color) ??
          (i === 0
            ? accent
            : resolveColor(SERIES_PALETTE[(i - 1) % SERIES_PALETTE.length])!),
        buckets,
        filled: fillGaps(buckets),
      };
    });

    // Sleep with phases but no total entity: value and chart = sum of the
    // sleep phases (awake time excluded).
    let valueOverride: number | undefined;
    if (type === 'sleep' && !m.entity && m.phases && data.length) {
      const sleepIds = (['deep', 'light', 'rem'] as const)
        .map((k) => m.phases![k])
        .filter(Boolean) as string[];
      if (sleepIds.length) {
        const perPhase = sleepIds.map((id) =>
          bucketDaily(this._history[id] ?? [], days, aggregate)
        );
        const combined = Array.from({ length: days }, (_, i) => {
          const vals = perPhase.map((b) => b[i]).filter(Number.isFinite);
          return vals.length ? vals.reduce((a, b) => a + b, 0) : NaN;
        });
        data[0] = { ...data[0], buckets: combined, filled: fillGaps(combined) };
        const current = sleepIds
          .map((id) => this._numeric(this.hass.states[id]))
          .filter(Number.isFinite);
        if (current.length) valueOverride = current.reduce((a, b) => a + b, 0);
      }
    }

    return {
      m,
      type,
      preset,
      accent,
      name,
      icon,
      series,
      primaryState,
      days,
      graph,
      aggregate,
      trendMode,
      precision,
      unit,
      data,
      valueOverride,
      goalType: m.goal_type ?? preset.goalType ?? 'atleast',
      multi: !!m.entities && series.length > 1,
    };
  }

  private _renderMetric(m: MetricConfig, index: number): TemplateResult {
    const c = this._ctx(m);
    if (!c.series.length || !c.primaryState) {
      return html`
        <div class="metric" style="--hc-accent:${c.accent}">
          <div class="head">
            <div class="iconchip"><ha-icon .icon=${c.icon}></ha-icon></div>
            <div class="name">${c.name}</div>
          </div>
          <div class="missing">
            ${c.series[0]?.entity
              ? html`${t(this.hass, 'entity_missing')}: ${c.series[0].entity}`
              : t(this.hass, 'no_data')}
          </div>
        </div>
      `;
    }

    if (c.type === 'score') return this._renderScore(c, index);

    // Multi-series metrics (entities: [...]) carry their info in the chips /
    // progress labels, so the big value, trend status and (for progress bars)
    // the chips are redundant there.
    const showValue = !c.multi || !!m.label;
    const showChips = c.multi && c.graph !== 'progress';
    const showStatus = !c.multi;
    const stack = c.multi && c.graph === 'progress';

    return html`
      <div
        class="metric ${(m.tap_action ?? 'popup') === 'none' ? 'noclick' : ''}"
        style="--hc-accent:${c.accent}"
        @click=${() => this._handleTap(m, index, c.series[0].entity)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${c.icon}></ha-icon></div>
          <div class="name">${c.name}</div>
          <div class="time">
            ${fmtLastUpdated(this.hass, c.primaryState.last_updated)}
          </div>
        </div>
        <div class="body ${stack ? 'stack' : ''}">
          ${showValue || showChips || showStatus || m.secondary?.length
            ? html`<div class="info">
                ${showValue
                  ? this._renderValue(
                      m,
                      c.type,
                      c.data,
                      c.primaryState,
                      c.unit,
                      c.precision,
                      c.preset.duration,
                      c.valueOverride
                    )
                  : nothing}
                ${showChips
                  ? this._renderSeriesChips(c.data, c.precision, c.trendMode)
                  : nothing}
                ${this._renderSecondary(m)}
                ${showStatus
                  ? this._renderStatus(
                      m,
                      c.data[0],
                      c.primaryState,
                      c.unit,
                      c.precision,
                      c.trendMode,
                      c.goalType,
                      c.valueOverride
                    )
                  : nothing}
              </div>`
            : nothing}
          <div class="chartcell">
            ${this._renderChart(m, c.graph, c.data, c.unit, c.precision)}
          </div>
        </div>
        ${c.type === 'sleep' && m.phases ? this._renderSleepPhases(m) : nothing}
      </div>
    `;
  }

  private _renderScore(c: MetricCtx, index: number): TemplateResult {
    const m = c.m;
    const primaryState = c.primaryState!;
    const v = this._numeric(primaryState, m.attribute);
    const max = m.max ?? 100;
    return html`
      <div
        class="metric score-metric ${(m.tap_action ?? 'popup') === 'none' ? 'noclick' : ''}"
        style="--hc-accent:${c.accent}"
        @click=${() => this._handleTap(m, index, primaryState.entity_id)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${c.icon}></ha-icon></div>
          <div class="name">${c.name}</div>
          <div class="time">
            ${fmtLastUpdated(this.hass, primaryState.last_updated)}
          </div>
        </div>
        <div class="scorewrap">
          ${scoreRing(c.accent)}
          <div class="scoreinner">
            <div class="scorenum">${fmtNumber(this.hass, v, m.precision ?? 0)}</div>
            <div class="scoremax">${t(this.hass, 'of')} ${max}</div>
          </div>
        </div>
        <div class="score-status">
          ${this._renderStatus(m, c.data[0], primaryState, '', 0, m.trend ?? 'up_good', 'atleast')}
        </div>
      </div>
    `;
  }

  /** Formats a value the same way the metric's big value is formatted. */
  private _fmtMetricValue(c: MetricCtx, x: number): string {
    if (c.m.duration ?? c.preset.duration) {
      const phaseUnit = Object.values(c.m.phases ?? {})
        .map((id) => (id ? this.hass.states[id]?.attributes.unit_of_measurement : undefined))
        .find(Boolean);
      const u =
        c.m.unit ??
        (c.valueOverride !== undefined
          ? phaseUnit
          : c.primaryState?.attributes.unit_of_measurement);
      return fmtDuration(x, u);
    }
    return joinUnit(fmtNumber(this.hass, x, c.precision), c.unit);
  }

  private _dayLabels(days: number): TemplateResult | typeof nothing {
    if (days > 14) return nothing;
    const locale = lang(this.hass) === 'de' ? 'de-DE' : 'en-US';
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const labels = Array.from({ length: days }, (_, i) =>
      new Date(start.getTime() - (days - 1 - i) * 86400000).toLocaleDateString(locale, {
        weekday: days > 9 ? 'narrow' : 'short',
      })
    );
    return html`<div class="daylabels" style="--hc-days:${days}">
      ${labels.map((l) => html`<span>${l}</span>`)}
    </div>`;
  }

  private _renderPopup(): TemplateResult | typeof nothing {
    if (this._popup === null || !this._config) return nothing;
    const m = this._config.metrics[this._popup];
    if (!m) return nothing;
    const c = this._ctx(m);
    if (!c.primaryState) return nothing;
    const primaryState = c.primaryState;

    const finite = c.data[0].buckets.filter(Number.isFinite);
    const stats = finite.length
      ? {
          min: Math.min(...finite),
          avg: finite.reduce((a, b) => a + b, 0) / finite.length,
          max: Math.max(...finite),
        }
      : undefined;

    // Popup chart: progress metrics get their bars plus the daily history;
    // metrics without a tile chart (score) fall back to a line chart.
    const historyGraph = c.graph === 'bar' || c.graph === 'progress' ? 'bar' : 'line';
    const chart = html`
      ${c.graph === 'progress'
        ? this._renderChart(m, 'progress', c.data, c.unit, c.precision)
        : nothing}
      <div class="popup-chart">
        ${this._renderChart(m, historyGraph, c.data, c.unit, c.precision)}
        ${this._dayLabels(c.days)}
      </div>
    `;

    return html`
      <div class="backdrop" @click=${() => (this._popup = null)}>
        <div
          class="dialog"
          role="dialog"
          aria-modal="true"
          style="--hc-accent:${c.accent}"
          @click=${(e: Event) => e.stopPropagation()}
        >
          <div class="dialog-head">
            <div class="iconchip"><ha-icon .icon=${c.icon}></ha-icon></div>
            <div class="dialog-title">${c.name}</div>
            <button
              class="close"
              aria-label=${t(this.hass, 'close')}
              @click=${() => (this._popup = null)}
            >
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="dialog-value">
            ${this._renderValue(
              m,
              c.type,
              c.data,
              primaryState,
              c.unit,
              c.precision,
              c.preset.duration,
              c.valueOverride
            )}
            <div class="time">${fmtLastUpdated(this.hass, primaryState.last_updated)}</div>
          </div>
          ${this._renderStatus(
            m,
            c.data[0],
            primaryState,
            c.unit,
            c.precision,
            c.trendMode,
            c.goalType,
            c.valueOverride
          )}
          ${chart}
          ${stats
            ? html`<div class="stats">
                ${(['min', 'avg', 'max'] as const).map(
                  (k) => html`<div class="stat">
                    <div class="stat-label">${t(this.hass, `stat_${k}`)}</div>
                    <div class="stat-value">${this._fmtMetricValue(c, stats[k])}</div>
                  </div>`
                )}
              </div>`
            : nothing}
          ${c.multi ? this._renderSeriesChips(c.data, c.precision, c.trendMode) : nothing}
          ${c.type === 'sleep' && m.phases ? this._renderSleepPhases(m) : nothing}
          ${this._renderSecondary(m)}
          <button
            class="openha"
            @click=${() => {
              this._popup = null;
              this._moreInfo(c.series[0]?.entity);
            }}
          >
            <ha-icon icon="mdi:chart-box-outline"></ha-icon>
            ${t(this.hass, 'open_ha')}
          </button>
        </div>
      </div>
    `;
  }

  private _renderSleepPhases(m: MetricConfig): TemplateResult | typeof nothing {
    const COLORS: Record<string, string> = {
      deep: 'var(--deep-purple-color, #673AB7)',
      light: 'var(--light-blue-color, #03A9F4)',
      rem: 'var(--cyan-color, #00BCD4)',
      awake: 'var(--amber-color, #FFC107)',
    };
    const items = (['deep', 'light', 'rem', 'awake'] as const)
      .map((key) => {
        const id = m.phases?.[key];
        const st = id ? this.hass.states[id] : undefined;
        const v = this._numeric(st);
        if (!Number.isFinite(v)) return undefined;
        return { key, v, unit: st?.attributes.unit_of_measurement, color: COLORS[key] };
      })
      .filter((p): p is NonNullable<typeof p> => !!p);
    if (!items.length) return nothing;
    return html`
      <div class="segbar">
        ${items.map(
          (p) => html`<div class="seg" style="flex-grow:${p.v};background:${p.color}"></div>`
        )}
      </div>
      <div class="phases">
        ${items.map(
          (p) => html`<div class="phase">
            <span class="phasedot" style="background:${p.color}"></span>
            <span>${t(this.hass, `phase_${p.key}`)}</span>
            <span class="phaseval">${fmtDuration(p.v, p.unit)}</span>
          </div>`
        )}
      </div>
    `;
  }

  private _renderValue(
    m: MetricConfig,
    type: string,
    data: SeriesData[],
    primaryState: HassEntity,
    unit: string,
    precision: number | undefined,
    presetDuration: boolean | undefined,
    valueOverride?: number
  ): TemplateResult {
    if (m.label) return html`<div class="value">${m.label}</div>`;

    if (type === 'blood_pressure' && data.length >= 2) {
      const sys = this._numeric(primaryState, m.attribute);
      const dia = this._numeric(this.hass.states[data[1].entity]);
      return html`<div class="value">
          ${fmtNumber(this.hass, sys, 0)}/${fmtNumber(this.hass, dia, 0)}
          <span class="unit">${unit}</span>
        </div>
        <div class="bplabels">
          <span class="bpitem">
            <span class="bpdot" style="background:${data[0].colorResolved}"></span>SYS
            ${fmtNumber(this.hass, sys, 0)}
          </span>
          <span class="bpitem">
            <span class="bpdot" style="background:${data[1].colorResolved}"></span>DIA
            ${fmtNumber(this.hass, dia, 0)}
          </span>
        </div>`;
    }

    const v = valueOverride ?? this._numeric(primaryState, m.attribute);
    if (!Number.isFinite(v)) {
      return html`<div class="value">${primaryState.state}</div>`;
    }
    if (m.duration ?? presetDuration) {
      const phaseUnit = Object.values(m.phases ?? {})
        .map((id) => (id ? this.hass.states[id]?.attributes.unit_of_measurement : undefined))
        .find(Boolean);
      return html`<div class="value">
        ${fmtDuration(
          v,
          m.unit ??
            (valueOverride !== undefined
              ? phaseUnit
              : primaryState.attributes.unit_of_measurement)
        )}
      </div>`;
    }
    return html`<div class="value">
      ${fmtNumber(this.hass, v, precision)}<span class="unit">${unit}</span>
    </div>`;
  }

  private _renderSeriesChips(
    data: SeriesData[],
    precision: number | undefined,
    trendMode: string
  ): TemplateResult {
    return html`<div class="serieslist">
      ${data.map((s) => {
        const st = this.hass.states[s.entity];
        const v = this._numeric(st);
        const sUnit = s.unit ?? st?.attributes.unit_of_measurement ?? '';
        const sName = s.name ?? st?.attributes.friendly_name ?? s.entity;
        const delta = trendDelta(s.filled);
        const arrow = !Number.isFinite(delta)
          ? 'mdi:minus'
          : delta > 0
            ? 'mdi:arrow-top-right'
            : delta < 0
              ? 'mdi:arrow-bottom-right'
              : 'mdi:arrow-right';
        return html`<div class="serieschip">
          ${trendMode !== 'none'
            ? html`<span class="dotarrow" style="background:${s.colorResolved}">
                <ha-icon .icon=${arrow}></ha-icon>
              </span>`
            : nothing}
          <span class="serieslabel">
            ${sName}: ${Number.isFinite(v)
              ? joinUnit(fmtNumber(this.hass, v, precision), sUnit)
              : (st?.state ?? '–')}
          </span>
        </div>`;
      })}
    </div>`;
  }

  private _renderSecondary(m: MetricConfig): TemplateResult | typeof nothing {
    if (!m.secondary?.length) return nothing;
    const parts = m.secondary
      .map((id) => {
        const st = this.hass.states[id];
        if (!st) return undefined;
        const v = this._numeric(st);
        const u = st.attributes.unit_of_measurement ?? '';
        return Number.isFinite(v) ? joinUnit(fmtNumber(this.hass, v), u) : st.state;
      })
      .filter(Boolean);
    if (!parts.length) return nothing;
    return html`<div class="secondary">${parts.join(' • ')}</div>`;
  }

  private _renderStatus(
    m: MetricConfig,
    primary: SeriesData,
    primaryState: HassEntity,
    unit: string,
    precision: number | undefined,
    trendMode: string,
    goalType: GoalType = 'atleast',
    valueOverride?: number
  ): TemplateResult | typeof nothing {
    const v = valueOverride ?? this._numeric(primaryState, m.attribute);
    const goal = this._resolveGoal(m.goal);

    if (Number.isFinite(goal) && Number.isFinite(v)) {
      const start = this._resolveGoal(m.start);
      let raw = NaN;
      if (Number.isFinite(start) && start !== goal) {
        // progress from start towards the goal, works in both directions
        raw = ((start - v) / (start - goal)) * 100;
      } else if (goal > 0) {
        // no start value: plain ratio; atmost = 100 % at/below the goal
        raw = goalType === 'atmost' ? (goal / v) * 100 : (v / goal) * 100;
      }
      if (!Number.isNaN(raw)) {
        const pct = Math.round(Math.min(Math.max(raw, 0), 999));
        const reached = pct >= 100;
        return html`<div class="status ${reached ? 'good' : ''}">
          <ha-icon .icon=${reached ? 'mdi:check-circle' : 'mdi:flag-outline'}></ha-icon>
          <span>${t(this.hass, 'goal')}: ${pct} %</span>
        </div>`;
      }
    }

    if (trendMode === 'none') return nothing;
    const delta = trendDelta(primary.filled);
    if (!Number.isFinite(delta)) return nothing;

    const first = primary.filled.find(Number.isFinite) ?? 0;
    const stable = Math.abs(delta) < Math.max(Math.abs(first) * 0.005, 1e-9);
    const dirClass = stable
      ? 'neutral'
      : trendMode === 'neutral'
        ? 'neutral'
        : (delta > 0) === (trendMode === 'up_good')
          ? 'good'
          : 'bad';
    const arrow = stable
      ? 'mdi:arrow-right'
      : delta > 0
        ? 'mdi:arrow-top-right'
        : 'mdi:arrow-bottom-right';
    const text = stable
      ? t(this.hass, 'stable')
      : `${fmtNumber(this.hass, Math.abs(delta), precision)}${unit ? ` ${unit}` : ''}`;
    return html`<div class="status ${dirClass}">
      <span class="dotarrow"><ha-icon .icon=${arrow}></ha-icon></span>
      <span>${text}</span>
    </div>`;
  }

  private _renderChart(
    m: MetricConfig,
    graph: string,
    data: SeriesData[],
    unit: string,
    precision: number | undefined
  ): TemplateResult | typeof nothing {
    if (graph === 'line') {
      return html`${lineChart(
        data.map((s) => ({ values: s.filled, color: s.colorResolved }))
      )}`;
    }
    if (graph === 'bar') {
      const goal = this._resolveGoal(m.goal);
      return html`${barChart(
        data[0].buckets,
        data[0].colorResolved,
        Number.isFinite(goal) ? goal : undefined
      )}`;
    }
    if (graph === 'progress') {
      const bars = data.map((s) => {
        const st = this.hass.states[s.entity];
        const v = this._numeric(st);
        const goal = this._resolveGoal(s.goal ?? m.goal);
        if (!Number.isFinite(v) || !Number.isFinite(goal) || goal <= 0) return nothing;
        const pct = Math.max(0, Math.min((v / goal) * 100, 100));
        const sUnit = s.unit ?? st?.attributes.unit_of_measurement ?? unit;
        return html`<div class="pbar">
          ${data.length > 1
            ? html`<div class="pbar-label">
                <span>${s.name ?? st?.attributes.friendly_name ?? s.entity}</span>
                <span>${joinUnit(fmtNumber(this.hass, v, precision), sUnit)}</span>
              </div>`
            : nothing}
          <div class="ptrack" style="--hc-p:${s.colorResolved}">
            <div class="pfill" style="width:${pct}%"></div>
          </div>
        </div>`;
      });
      return html`<div class="pbars">${bars}</div>`;
    }
    return nothing;
  }

  static styles = css`
    :host {
      --hc-card-bg: var(--ha-card-background, var(--card-background-color, #fff));
      --hc-tile-bg: color-mix(in srgb, var(--primary-text-color) 4%, var(--hc-card-bg));
      --hc-dot-fill: var(--hc-tile-bg);
    }
    .cardroot {
      display: block;
      padding: 16px;
    }
    .cardroot.flat {
      --hc-tile-bg: transparent;
      --hc-dot-fill: var(--hc-card-bg);
    }
    .cardroot.nobg {
      background: none;
      box-shadow: none;
      border: none;
    }
    .cardroot.flush {
      padding: 0;
    }
    .cardroot.flush .header {
      padding: 0 0 14px 0;
    }

    /* ---- card styles ------------------------------------------------- */
    /* default: plain HA look following the active theme */
    .cardroot.s-default {
      --hc-tile-bg: var(
        --secondary-background-color,
        color-mix(in srgb, var(--primary-text-color) 5%, var(--hc-card-bg))
      );
      --hc-dot-fill: var(--secondary-background-color, var(--hc-card-bg));
      --hc-tile-radius: var(--ha-card-border-radius, 12px);
    }
    /* withings: soft tinted tiles (base tokens, nothing extra needed) */

    /* liquid glass: translucent, blurred, specular top edge */
    .cardroot.s-glass {
      --hc-tile-bg: color-mix(in srgb, var(--hc-card-bg) 42%, transparent);
      --hc-dot-fill: var(--hc-card-bg);
      --hc-tile-radius: 22px;
    }
    ha-card.cardroot.s-glass {
      background: color-mix(in srgb, var(--hc-card-bg) 55%, transparent);
      -webkit-backdrop-filter: blur(18px) saturate(1.5);
      backdrop-filter: blur(18px) saturate(1.5);
    }
    .cardroot.s-glass .metric {
      border: 1px solid color-mix(in srgb, var(--primary-text-color) 12%, transparent);
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, #fff 25%, transparent),
        0 8px 24px color-mix(in srgb, #000 10%, transparent);
      -webkit-backdrop-filter: blur(18px) saturate(1.5);
      backdrop-filter: blur(18px) saturate(1.5);
    }

    /* material you: tonal surfaces, expressive radii */
    .cardroot.s-material {
      --hc-tile-bg: color-mix(in srgb, var(--primary-color) 10%, var(--hc-card-bg));
      --hc-dot-fill: color-mix(in srgb, var(--primary-color) 10%, var(--hc-card-bg));
      --hc-tile-radius: 24px;
    }
    ha-card.cardroot.s-material {
      border-radius: 28px;
    }
    .cardroot.s-material .iconchip {
      border-radius: 12px;
    }
    .cardroot.s-material .value {
      letter-spacing: 0;
    }

    /* bubble: free-floating solid modules with big icon bubbles */
    .cardroot.s-bubble {
      --hc-tile-bg: var(--hc-card-bg);
      --hc-dot-fill: var(--hc-card-bg);
      --hc-tile-radius: 32px;
    }
    ha-card.cardroot.s-bubble {
      background: none;
      box-shadow: none;
      border: none;
    }
    .cardroot.s-bubble .metric {
      box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.08));
      padding: 12px 16px;
    }
    .cardroot.s-bubble .iconchip {
      width: 42px;
      height: 42px;
      background: color-mix(in srgb, var(--hc-accent) 20%, transparent);
    }
    .cardroot.s-bubble .iconchip ha-icon {
      --mdc-icon-size: 22px;
    }
    .cardroot.s-bubble .name {
      font-weight: 700;
    }
    .header {
      padding: 4px 4px 16px 4px;
    }
    .title {
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.3px;
      color: var(--primary-text-color);
    }
    .subtitle {
      font-size: 14px;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .metrics {
      display: grid;
      grid-template-columns: repeat(var(--hc-columns, 1), minmax(0, 1fr));
      gap: 12px;
    }
    .cardroot.flat .metrics {
      gap: 4px;
    }
    .metrics.carousel {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }
    .metrics.carousel::-webkit-scrollbar {
      display: none;
    }
    .metrics.carousel > .metric {
      flex: 0 0 min(85%, 320px);
      scroll-snap-align: center;
    }
    .metric {
      background: var(--hc-tile-bg);
      border-radius: var(--hc-tile-radius, 16px);
      box-sizing: border-box;
      padding: 14px 16px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .metric:hover {
      background: color-mix(in srgb, var(--primary-text-color) 7%, var(--hc-card-bg));
    }
    .metric.noclick {
      cursor: default;
    }
    .metric.noclick:hover {
      background: var(--hc-tile-bg);
    }
    .head {
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
    }
    .iconchip {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--hc-accent);
      background: color-mix(in srgb, var(--hc-accent) 14%, transparent);
    }
    .iconchip ha-icon {
      --mdc-icon-size: 18px;
    }
    .name {
      flex: 1;
      font-size: 15px;
      font-weight: 600;
      color: var(--primary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .time {
      font-size: 12px;
      color: var(--secondary-text-color);
      flex: none;
    }
    .body {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr);
      gap: 14px;
      align-items: center;
    }
    .body.stack {
      grid-template-columns: minmax(0, 1fr);
      gap: 8px;
    }
    .info {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
    }
    .value {
      font-size: 30px;
      font-weight: 700;
      line-height: 1.1;
      letter-spacing: -0.5px;
      color: var(--primary-text-color);
    }
    .unit {
      font-size: 14px;
      font-weight: 600;
      color: var(--secondary-text-color);
      margin-left: 2px;
      letter-spacing: 0;
    }
    .secondary {
      font-size: 13px;
      color: var(--secondary-text-color);
    }
    .status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 500;
      color: var(--secondary-text-color);
    }
    .status ha-icon {
      --mdc-icon-size: 16px;
    }
    .status.good {
      color: var(--success-color, #43a047);
    }
    .status.bad {
      color: var(--error-color, #db4437);
    }
    .status .dotarrow {
      background: color-mix(in srgb, currentColor 15%, transparent);
      color: inherit;
    }
    .dotarrow {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: #fff;
    }
    .dotarrow ha-icon {
      --mdc-icon-size: 12px;
    }
    .serieslist {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .serieschip {
      display: flex;
      align-items: center;
      gap: 7px;
      font-size: 13px;
      color: var(--primary-text-color);
      min-width: 0;
    }
    .serieslabel {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .chartcell {
      min-width: 0;
    }
    .chart {
      width: 100%;
      height: auto;
      display: block;
    }
    .pbars {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
    }
    .pbar-label {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--secondary-text-color);
      margin-bottom: 3px;
    }
    .ptrack {
      height: 8px;
      border-radius: 4px;
      background: color-mix(in srgb, var(--hc-p, var(--hc-accent)) 18%, transparent);
      overflow: hidden;
    }
    .pfill {
      height: 100%;
      border-radius: 4px;
      background: var(--hc-p, var(--hc-accent));
      transition: width 0.3s ease;
    }
    .missing {
      font-size: 13px;
      color: var(--error-color, #db4437);
      word-break: break-all;
    }
    .bplabels {
      display: flex;
      gap: 12px;
      margin-top: 2px;
    }
    .bpitem {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.6px;
      color: var(--secondary-text-color);
    }
    .bpdot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex: none;
    }
    .segbar {
      display: flex;
      gap: 2px;
      height: 10px;
      border-radius: 5px;
      overflow: hidden;
      margin-top: 2px;
    }
    .seg {
      min-width: 4px;
      border-radius: 2px;
    }
    .phases {
      display: flex;
      flex-wrap: wrap;
      gap: 6px 14px;
      margin-top: 6px;
    }
    .phase {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      color: var(--secondary-text-color);
    }
    .phasedot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex: none;
    }
    .phaseval {
      color: var(--primary-text-color);
      font-weight: 600;
    }
    .scorewrap {
      display: grid;
      place-items: center;
      width: min(210px, 100%);
      margin: 0 auto;
    }
    .scorewrap > * {
      grid-area: 1 / 1;
    }
    .scorering {
      width: 100%;
      height: auto;
      display: block;
    }
    .scoreinner {
      text-align: center;
    }
    .scorenum {
      font-size: 46px;
      font-weight: 800;
      letter-spacing: -1px;
      line-height: 1;
      color: var(--primary-text-color);
    }
    .scoremax {
      font-size: 13px;
      font-weight: 600;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .score-status {
      display: flex;
      justify-content: center;
    }

    /* ---- detail popup -------------------------------------------------- */
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      animation: hc-fadein 0.15s ease;
    }
    @keyframes hc-fadein {
      from {
        opacity: 0;
      }
    }
    .dialog {
      width: min(440px, 100%);
      max-height: 86vh;
      overflow-y: auto;
      box-sizing: border-box;
      background: var(--hc-card-bg);
      color: var(--primary-text-color);
      border-radius: 24px;
      padding: 20px;
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      gap: 12px;
      --hc-tile-bg: color-mix(in srgb, var(--primary-text-color) 4%, var(--hc-card-bg));
      --hc-dot-fill: var(--hc-card-bg);
    }
    .dialog-head {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .dialog-title {
      flex: 1;
      font-size: 17px;
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .close {
      width: 32px;
      height: 32px;
      flex: none;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 7%, transparent);
    }
    .close ha-icon {
      --mdc-icon-size: 18px;
    }
    .dialog-value {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 10px;
      flex-wrap: wrap;
    }
    .dialog-value .value {
      font-size: 36px;
    }
    .popup-chart {
      background: var(--hc-tile-bg);
      border-radius: 16px;
      padding: 12px 10px 8px;
    }
    .daylabels {
      display: grid;
      grid-template-columns: repeat(var(--hc-days, 7), 1fr);
      padding: 2px 2% 0;
      font-size: 10px;
      color: var(--secondary-text-color);
      text-align: center;
    }
    .stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
    .stat {
      background: var(--hc-tile-bg);
      border-radius: 12px;
      padding: 8px 10px;
      text-align: center;
    }
    .stat-label {
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .stat-value {
      font-size: 14px;
      font-weight: 700;
    }
    .openha {
      align-self: center;
      display: flex;
      align-items: center;
      gap: 6px;
      border: none;
      background: none;
      color: var(--primary-color);
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      padding: 8px 14px;
      border-radius: 10px;
    }
    .openha:hover {
      background: color-mix(in srgb, var(--primary-color) 10%, transparent);
    }
    .openha ha-icon {
      --mdc-icon-size: 16px;
    }
  `;
}

console.info(
  `%c HEALTH-CARD %c v${CARD_VERSION} `,
  'color: white; background: #6c5ce7; font-weight: 700; border-radius: 4px 0 0 4px; padding: 2px 6px;',
  'color: #6c5ce7; background: #f1effd; font-weight: 700; border-radius: 0 4px 4px 0; padding: 2px 6px;'
);

window.customCards = window.customCards || [];
window.customCards.push({
  type: 'health-card',
  name: 'Health Card',
  description:
    'Withings-style health dashboard: weight, heart rate, blood pressure, body composition, activity, nutrition, sleep and more.',
  preview: true,
  documentationURL: 'https://github.com/BobMcGlobus/HealthCard',
});

declare global {
  interface HTMLElementTagNameMap {
    'health-card': HealthCard;
  }
}
