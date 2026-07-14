import { LitElement, html, css, nothing } from 'lit';
import type { PropertyValues, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  Aggregate,
  BodyAnchor,
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
import { BREAKDOWN_PALETTE, PRESETS, SERIES_PALETTE, resolveColor } from './presets';
import type { MetricPreset } from './presets';
import { lang, t } from './i18n';
import { fmtDuration, fmtLastUpdated, fmtNumber, joinUnit } from './format';
import {
  bucketDaily,
  bucketHourly,
  bucketsFromStats,
  fetchHistory,
  fetchStats,
  fillGaps,
  trendDelta,
} from './history';
import type { HistoryMap, StatsMap, StatsPeriod } from './history';
import { barChart, cycleRing, lineChart, scoreGraphic } from './charts';
import type { AxisMark, ChartOpts, CycleSegment } from './charts';
import './editor';

const CARD_VERSION = '0.13.0';

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
  /** number of buckets in the current range */
  days: number;
  /** bucket resolution of the current range */
  kind: RangeKind;
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

const CARD_STYLES = ['default', 'withings', 'glass', 'material', 'bubble', 'mirror'];

type RangeKind = 'hour' | 'day' | 'month';

interface PopupRange {
  key: string;
  kind: RangeKind;
  count: number;
}

const POPUP_RANGES: PopupRange[] = [
  { key: 'day', kind: 'hour', count: 24 },
  { key: 'week', kind: 'day', count: 7 },
  { key: 'month', kind: 'day', count: 30 },
  { key: 'quarter', kind: 'day', count: 90 },
  { key: 'year', kind: 'day', count: 365 },
  { key: 'max', kind: 'month', count: 60 },
];

@customElement('health-card')
export class HealthCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: HealthCardConfig;
  @state() private _history: HistoryMap = {};
  @state() private _popup: number | null = null;
  @state() private _popupRange: string | null = null;
  /** expanded tiles: chosen range key per metric index */
  @state() private _tileRanges: Record<number, string> = {};
  /** long-term statistics cache, keyed by `period|count` */
  @state() private _statsCache: Record<string, StatsMap> = {};
  private _statsCacheTime: Record<string, number> = {};
  private _statsFetching = new Set<string>();

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
    this._syncStats();
    if (
      changed.has('_popup') ||
      changed.has('_popupRange') ||
      changed.has('_tileRanges') ||
      changed.has('_statsCache')
    ) {
      // long-range charts scroll to the most recent data
      this.renderRoot
        ?.querySelectorAll('.chart-scroll')
        .forEach((sc) => (sc.scrollLeft = sc.scrollWidth));
    }
  }

  private _activeRange(): PopupRange | null {
    return POPUP_RANGES.find((r) => r.key === this._popupRange) ?? null;
  }

  /** Long-term statistics for every active range (popup + expanded tiles). */
  private _syncStats(): void {
    if (!this.hass || !this._config) return;
    const active: PopupRange[] = [];
    if (this._popup !== null) {
      const r = this._activeRange();
      if (r) active.push(r);
    }
    this._config.metrics.forEach((m, i) => {
      if (!m.expanded) return;
      const r = POPUP_RANGES.find((x) => x.key === this._tileRanges[i]);
      if (r) active.push(r);
    });
    for (const r of active) {
      const period: StatsPeriod | null =
        r.kind === 'month' ? 'month' : r.kind === 'day' && r.count > 10 ? 'day' : null;
      if (period) this._ensureStats(period, r.count);
    }
  }

  private _ensureStats(period: StatsPeriod, count: number): void {
    const key = `${period}|${count}`;
    const fresh =
      this._statsCache[key] && Date.now() - (this._statsCacheTime[key] ?? 0) < 1800000;
    if (fresh || this._statsFetching.has(key)) return;
    const ids = this._watchedEntities();
    if (!ids.length) return;
    this._statsFetching.add(key);
    fetchStats(this.hass, ids, count, period)
      .then((data) => {
        this._statsCacheTime[key] = Date.now();
        this._statsCache = { ...this._statsCache, [key]: data };
      })
      .catch((e) => console.warn('health-card: statistics fetch failed', e))
      .finally(() => {
        this._statsFetching.delete(key);
      });
  }

  /** Buckets for an entity: hourly/daily from history, long ranges from LTS. */
  private _bucketsFor(
    id: string,
    kind: RangeKind,
    count: number,
    aggregate: Aggregate
  ): number[] {
    if (kind === 'hour') {
      return bucketHourly(this._history[id] ?? [], count, aggregate);
    }
    if (kind === 'month') {
      const rows = this._statsCache[`month|${count}`]?.[id];
      return rows?.length
        ? bucketsFromStats(rows, count, aggregate, 'month')
        : new Array(count).fill(NaN);
    }
    if (count > 10) {
      const rows = this._statsCache[`day|${count}`]?.[id];
      if (rows?.length) return bucketsFromStats(rows, count, aggregate, 'day');
    }
    return bucketDaily(this._history[id] ?? [], count, aggregate);
  }

  private _watchedEntities(): string[] {
    const ids = new Set<string>();
    for (const m of this._config?.metrics ?? []) {
      for (const s of this._series(m)) if (s.entity) ids.add(s.entity);
      for (const id of m.secondary ?? []) ids.add(id);
      for (const id of Object.values(m.phases ?? {})) if (id) ids.add(id);
      if (m.score_entity) ids.add(m.score_entity);
      if (m.sleep_entity) ids.add(m.sleep_entity);
      if (m.temperature_entity) ids.add(m.temperature_entity);
      for (const a of m.anchors ?? []) {
        ids.add(a.entity);
        if (a.entity2) ids.add(a.entity2);
      }
      for (const b of m.breakdown ?? []) ids.add(typeof b === 'string' ? b : b.entity);
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
    // sensible default views: pulse shows today's curve, sleep the calendar month
    this._popupRange =
      m.type === 'heart_rate'
        ? 'day'
        : m.type === 'sleep' && m.score_entity
          ? 'month'
          : null;
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

  private _cardStyle(): string {
    const s = this._config?.card_style ?? 'withings';
    return CARD_STYLES.includes(s) ? s : 'withings';
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    const c = this._config;
    const style = this._cardStyle();
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
  private _ctx(m: MetricConfig, range?: PopupRange | null): MetricCtx {
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
    const kind: RangeKind = range?.kind ?? 'day';
    const days = Math.max(1, range?.count ?? m.days ?? this._config?.days ?? 7);
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
      const buckets = this._bucketsFor(s.entity, kind, days, aggregate);
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
          this._bucketsFor(id, kind, days, aggregate)
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
      kind,
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
    if (c.type === 'body') return this._renderBody(c, index);
    if (c.type === 'cycle') return this._renderCycle(c, index);

    // expanded tiles show the popup details inline
    if (m.expanded) {
      const r = POPUP_RANGES.find((x) => x.key === this._tileRanges[index]) ?? null;
      const ce = r ? this._ctx(m, r) : c;
      const activeKey =
        this._tileRanges[index] ??
        (ce.days === 7 && ce.kind === 'day' ? 'week' : '');
      return html`
        <div
          class="metric expanded ${(m.tap_action ?? 'popup') === 'none' ? 'noclick' : ''}"
          style="--hc-accent:${c.accent}"
          @click=${() => this._handleTap(m, index, c.series[0].entity)}
        >
          <div class="head">
            <div class="iconchip"><ha-icon .icon=${c.icon}></ha-icon></div>
            <div class="name">${c.name}</div>
            ${this._renderScoreBadge(m)}
            <div class="time">
              ${fmtLastUpdated(this.hass, c.primaryState.last_updated)}
            </div>
          </div>
          <div class="exp-value">
            ${this._renderValue(
              m,
              ce.type,
              ce.data,
              ce.primaryState!,
              ce.unit,
              ce.precision,
              ce.preset.duration,
              ce.valueOverride
            )}
            ${this._renderStatus(
              m,
              ce.data[0],
              ce.primaryState!,
              ce.unit,
              ce.precision,
              ce.trendMode,
              ce.goalType,
              ce.valueOverride
            )}
          </div>
          ${this._renderDetails(m, ce, activeKey, (k) => {
            this._tileRanges = { ...this._tileRanges, [index]: k };
          })}
        </div>
      `;
    }

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
          ${this._renderScoreBadge(m)}
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

  /** Resolved breakdown categories for a score metric (sub-goals). */
  private _breakdown(m: MetricConfig) {
    return (m.breakdown ?? [])
      .map((b, i) => {
        const cfg = typeof b === 'string' ? { entity: b } : b;
        const st = this.hass.states[cfg.entity];
        return {
          ...cfg,
          state: st,
          value: this._numeric(st),
          name: cfg.name ?? st?.attributes.friendly_name ?? cfg.entity,
          colorResolved:
            resolveColor(cfg.color) ??
            resolveColor(BREAKDOWN_PALETTE[i % BREAKDOWN_PALETTE.length])!,
        };
      })
      .filter((b) => b.state);
  }

  private _renderScore(c: MetricCtx, index: number): TemplateResult {
    const m = c.m;
    const primaryState = c.primaryState!;
    const v = this._numeric(primaryState, m.attribute);
    const max = m.max ?? 100;

    // sub-goal categories color the ring dots / arc segments proportionally
    const breakdown = this._breakdown(m);
    const withValue = breakdown.filter((b) => Number.isFinite(b.value) && b.value > 0);
    const sum = withValue.reduce((a, b) => a + b.value, 0);
    const segments =
      sum > 0
        ? withValue.map((b) => ({ color: b.colorResolved, share: b.value / sum }))
        : undefined;
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
          ${scoreGraphic(
            this._cardStyle(),
            c.accent,
            this._scoreColor(v, max),
            Math.max(0, Math.min(Number.isFinite(v) ? v / max : 0, 1)),
            segments
          )}
          <div class="scoreinner">
            <div class="scorenum">${fmtNumber(this.hass, v, m.precision ?? 0)}</div>
            <div class="scoremax">${t(this.hass, 'of')} ${max}</div>
          </div>
        </div>
        ${breakdown.length
          ? html`<div class="score-bars">
              ${breakdown.map((b) => {
                const pct = Number.isFinite(b.value)
                  ? Math.max(0, Math.min((b.value / max) * 100, 100))
                  : 0;
                return html`<div class="sbar">
                  <span class="sbar-name">${b.name}</span>
                  <div class="sbar-track">
                    <div
                      class="sbar-fill"
                      style="width:${pct}%;background:${b.colorResolved}"
                    ></div>
                  </div>
                  <span class="sbar-val">
                    ${Number.isFinite(b.value)
                      ? fmtNumber(this.hass, b.value, 0)
                      : '–'}
                  </span>
                </div>`;
              })}
            </div>`
          : nothing}
        <div class="score-status">
          ${this._renderStatus(m, c.data[0], primaryState, '', 0, m.trend ?? 'up_good', 'atleast')}
        </div>
      </div>
    `;
  }

  /** Menstrual cycle ring with phase arcs, current-day marker and phase label. */
  private _renderCycle(c: MetricCtx, index: number): TemplateResult {
    const m = c.m;
    const primaryState = c.primaryState!;
    const len = Math.max(2, Math.round(m.cycle_length ?? 28));
    const period = Math.max(1, Math.round(m.period_length ?? 5));
    const ov = Math.round(m.ovulation_day ?? len - 14);
    const rawDay = this._numeric(primaryState, m.attribute);
    const day = Number.isFinite(rawDay)
      ? Math.max(1, Math.min(Math.round(rawDay), len))
      : 1;

    const fertileStart = Math.max(period + 1, ov - 4);
    const fertileEnd = Math.min(len, ov + 1);
    const RED = 'var(--red-color, #e53935)';
    const GREEN = 'var(--teal-color, #009688)';
    const FOLL = 'color-mix(in srgb, var(--purple-color, #9C27B0) 35%, transparent)';
    const LUT = 'color-mix(in srgb, var(--amber-color, #FFC107) 45%, transparent)';
    const segments: CycleSegment[] = [{ from: 1, to: period, color: RED }];
    if (fertileStart > period + 1)
      segments.push({ from: period + 1, to: fertileStart - 1, color: FOLL });
    segments.push({ from: fertileStart, to: fertileEnd, color: GREEN });
    if (fertileEnd < len) segments.push({ from: fertileEnd + 1, to: len, color: LUT });

    // phase of the current day
    let phaseKey: string;
    if (day <= period) phaseKey = 'menstruation';
    else if (day === ov) phaseKey = 'ovulation';
    else if (day >= fertileStart && day <= fertileEnd) phaseKey = 'fertile';
    else if (day < fertileStart) phaseKey = 'follicular';
    else phaseKey = 'luteal';
    const phaseName = m.phase_entity
      ? (this.hass.states[m.phase_entity]?.state ?? t(this.hass, `phase_${phaseKey}`))
      : t(this.hass, `phase_${phaseKey}`);

    const daysToPeriod = ((len - day + 1) % len) || len;
    const note =
      day >= len
        ? t(this.hass, 'period_today')
        : t(this.hass, 'period_in').replace('{n}', String(daysToPeriod));

    return html`
      <div
        class="metric cycle-metric ${(m.tap_action ?? 'popup') === 'none' ? 'noclick' : ''}"
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
          ${cycleRing(day, len, segments)}
          <div class="scoreinner">
            <div class="scoremax">${t(this.hass, 'cycle_day')}</div>
            <div class="scorenum">${fmtNumber(this.hass, day, 0)}</div>
            <div class="scoremax">${t(this.hass, 'cycle_of')} ${len}</div>
          </div>
        </div>
        <div class="cycle-phase" style="color:${c.accent}">${phaseName}</div>
        <div class="cycle-note">${note}</div>
      </div>
    `;
  }

  private static readonly ANCHOR_POS: Record<
    string,
    { x: number; y: number; side: 'left' | 'right' }
  > = {
    head: { x: 50, y: 9, side: 'right' },
    chest: { x: 44, y: 32, side: 'left' },
    // flex arm is on the viewer-left, resting arm (cuff) on the right
    'arm-left': { x: 30, y: 20, side: 'left' },
    'arm-right': { x: 69, y: 27, side: 'right' },
    belly: { x: 50, y: 54, side: 'right' },
    legs: { x: 57, y: 75, side: 'right' },
  };

  /** Avatar tile: stylized figure with state-driven effects and anchors. */
  private _renderBody(c: MetricCtx, index: number): TemplateResult {
    const m = c.m;
    const primaryState = c.primaryState!;
    const v = this._numeric(primaryState, m.attribute);
    const goal = this._resolveGoal(m.goal);

    // weight vs goal morphs the silhouette (0 = at goal)
    let shape = 0;
    if (Number.isFinite(v) && Number.isFinite(goal) && goal > 0) {
      shape = Math.max(-0.35, Math.min((v / goal - 1) * 2.5, 1.1));
    }
    const preview = !!m.preview_effects;
    const sleepV = m.sleep_entity ? this._numeric(this.hass.states[m.sleep_entity]) : NaN;
    const tiredBelow = m.tired_below ?? 60;
    let tired =
      Number.isFinite(sleepV) && sleepV < tiredBelow
        ? Math.min((tiredBelow - sleepV) / 45 + 0.15, 1)
        : 0;
    const tempV = m.temperature_entity
      ? this._numeric(this.hass.states[m.temperature_entity])
      : NaN;
    const feverFrom = m.fever_from ?? 37.8;
    let fever =
      Number.isFinite(tempV) && tempV >= feverFrom
        ? Math.min((tempV - feverFrom) / 2 + 0.4, 1)
        : 0;
    if (preview) {
      tired = Math.max(tired, 0.85);
      fever = Math.max(fever, 0.75);
    }
    const scoreV = m.score_entity
      ? this._numeric(this.hass.states[m.score_entity])
      : NaN;
    const max = m.max ?? 100;
    const glow = Number.isFinite(scoreV) ? 0.25 + (scoreV / max) * 0.55 : 0;
    const glowColor = Number.isFinite(scoreV)
      ? this._scoreColor(scoreV, max)
      : 'transparent';

    const anchors = (m.anchors ?? []).filter((a) => this.hass.states[a.entity]);
    const fade = m.fade_figure !== false;

    return html`
      <div
        class="metric body-metric ${(m.tap_action ?? 'popup') === 'none' ? 'noclick' : ''}"
        style="--hc-accent:${c.accent}"
        @click=${() => this._handleTap(m, index, primaryState.entity_id)}
      >
        <div class="head">
          <div class="iconchip"><ha-icon .icon=${c.icon}></ha-icon></div>
          <div class="name">${c.name}</div>
          ${this._renderScoreBadge(m)}
          <div class="time">
            ${fmtLastUpdated(this.hass, primaryState.last_updated)}
          </div>
        </div>
        <div class="bodywrap">
          ${glow > 0
            ? html`<div
                class="body-glow"
                style="--hc-glow:${glowColor};opacity:${glow}"
              ></div>`
            : nothing}
          <div
            class="bodyframe ${m.body_crop === 'upper' ? 'crop-upper' : ''} ${fade
              ? 'fade'
              : ''}"
            style="--hc-frame-ar:${this._frameAspect(m)};--hc-fade:${m.fade_height ??
            (m.body_crop === 'upper' ? 150 : 200)}px"
          >
            <div
              class="bodystage"
              style="--hc-zoom:${m.figure_zoom ?? 1};--hc-oy:${m.figure_offset_y ??
              -3}%;--hc-ox:${m.figure_offset_x ?? 0}%"
            >
              ${m.image_remove_black
                ? html`<svg class="unblack-defs" aria-hidden="true">
                    <filter id="hc-unblack">
                      <feColorMatrix
                        type="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  1.2 1.8 0.7 0 -0.18"
                      />
                    </filter>
                  </svg>`
                : nothing}
              <img
                class="bodyimg"
                src=${this._bodyImage(m, shape)}
                style=${m.image_remove_black ? 'filter: url(#hc-unblack)' : ''}
                alt=""
              />
            </div>
          </div>
          ${fever > 0
            ? html`<div
                class="body-fever"
                style="left:${m.fever_x ?? 50}%;top:${m.fever_y ?? 14}%;opacity:${fever}"
              ></div>`
            : nothing}
          ${tired > 0
            ? html`<div
                class="body-tired"
                style="left:${m.tired_x ?? 50}%;top:${m.tired_y ?? 15}%;opacity:${0.25 +
                tired * 0.6}"
              >
                <span></span><span></span>
              </div>`
            : nothing}
          ${anchors.map((a, i) => this._renderAnchor(a, i, m))}
        </div>
        <div class="body-foot">
          ${this._renderValue(m, c.type, c.data, primaryState, c.unit, c.precision, false)}
          ${this._renderStatus(
            m,
            c.data[0],
            primaryState,
            c.unit,
            c.precision,
            c.trendMode,
            c.goalType
          )}
        </div>
      </div>
    `;
  }

  /**
   * Effective figure set. Default is mannequin; the liquid-glass card style
   * defaults to the matching glass figures. Unknown values (e.g. the removed
   * svg style from old configs) fall back to the default.
   */
  private _figStyle(m: MetricConfig): string {
    const sets = ['flat', 'glass', 'mannequin', 'pixar'];
    if (m.figure_style && sets.includes(m.figure_style)) return m.figure_style;
    return this._cardStyle() === 'glass' ? 'glass' : 'mannequin';
  }

  /** Figure image URL for the current weight state. */
  private _bodyImage(m: MetricConfig, shape: number): string {
    const state = shape < -0.12 ? 'slim' : shape < 0.35 ? 'regular' : 'full';
    // user-supplied images win over the bundled sets
    if (m.images) {
      const preferred =
        state === 'slim'
          ? m.images.slim
          : state === 'full'
            ? m.images.full
            : m.images.regular;
      const custom = preferred ?? m.images.regular ?? m.images.slim ?? m.images.full;
      if (custom) return custom;
    }
    const gender = m.gender ?? 'female';
    const weight =
      state === 'slim' ? 'underweight' : state === 'full' ? 'overweight' : 'normal';
    return `${this._figureBase(m)}${this._figStyle(m)}/${gender}_${weight}.png`;
  }

  /**
   * Frame aspect ratio (width/height). The frame is fixed-height so zooming
   * (a transform on the inner stage) magnifies in place instead of growing
   * the card. Full fits the whole portrait figure; upper is a wide band.
   */
  private _frameAspect(m: MetricConfig): number {
    return m.body_crop === 'upper' ? 1.15 : 0.68;
  }

  /** Base URL for bundled figure images (served next to the card by default). */
  private _figureBase(m: MetricConfig): string {
    if (m.figure_base) return m.figure_base.endsWith('/') ? m.figure_base : `${m.figure_base}/`;
    try {
      return new URL('figures/', import.meta.url).href;
    } catch {
      return '/figures/';
    }
  }

  private _renderAnchor(
    a: BodyAnchor,
    i: number,
    m: MetricConfig
  ): TemplateResult | typeof nothing {
    const base = HealthCard.ANCHOR_POS[a.position ?? 'chest'];
    const st = this.hass.states[a.entity];
    if (!base || !st) return nothing;
    // `dot` (8-way) wins; otherwise derive left/right from x, honouring flip
    let dir: string;
    if (a.dot) {
      dir = a.dot;
    } else {
      let side: 'left' | 'right' =
        a.x !== undefined && !a.position ? (a.x >= 50 ? 'right' : 'left') : base.side;
      if (a.flip) side = side === 'right' ? 'left' : 'right';
      dir = side;
    }
    const x = a.x ?? base.x;
    const y = a.y ?? base.y;
    const color =
      resolveColor(a.color) ?? resolveColor(SERIES_PALETTE[i % SERIES_PALETTE.length])!;
    const v = this._numeric(st);
    let value: string;
    if (a.entity2) {
      const v2 = this._numeric(this.hass.states[a.entity2]);
      value = `${fmtNumber(this.hass, v, 0)}/${fmtNumber(this.hass, v2, 0)}`;
    } else {
      value = Number.isFinite(v)
        ? joinUnit(
            fmtNumber(this.hass, v),
            st.attributes.unit_of_measurement ?? ''
          )
        : st.state;
    }
    const op = m.label_opacity ?? 1;
    return html`<div
      class="anchor dot-${dir}"
      style="left:${x}%;top:${y}%;--ac:${color};--hc-label-op:${op}"
    >
      <span class="anchor-dot"></span>
      <div class="anchor-chip">
        <span class="anchor-name">${a.name ?? st.attributes.friendly_name ?? ''}</span>
        <span class="anchor-val">${value}</span>
      </div>
    </div>`;
  }

  /** Traffic-light color for score visuals, driven by the score ratio. */
  private _scoreColor(v: number, max: number): string {
    const ratio = Number.isFinite(v) ? v / max : 0;
    if (ratio >= 0.75) return 'var(--success-color, #43a047)';
    if (ratio >= 0.45) return 'var(--warning-color, #fb8c00)';
    return 'var(--error-color, #e53935)';
  }

  /** Traffic-light badge for a metric's score_entity (e.g. sleep score). */
  private _renderScoreBadge(m: MetricConfig): TemplateResult | typeof nothing {
    if (!m.score_entity) return nothing;
    const v = this._numeric(this.hass.states[m.score_entity]);
    if (!Number.isFinite(v)) return nothing;
    return html`<span class="scorebadge" style="background:${this._scoreColor(v, 100)}">
      ${fmtNumber(this.hass, v, 0)}
    </span>`;
  }

  /** Calendar heatmap: one cell per day, tinted by the score entity's value. */
  private _renderScoreCalendar(values: number[], days: number): TemplateResult {
    const locale = lang(this.hass) === 'de' ? 'de-DE' : 'en-US';
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - (days - 1));
    const offset = (start.getDay() + 6) % 7; // Monday-first
    const monday = new Date(2024, 0, 1); // a known Monday
    const heads = Array.from({ length: 7 }, (_, i) =>
      new Date(monday.getTime() + i * 86400000).toLocaleDateString(locale, {
        weekday: 'narrow',
      })
    );
    return html`<div class="cal">
      ${heads.map((h) => html`<div class="cal-head">${h}</div>`)}
      ${Array.from({ length: offset }, () => html`<div></div>`)}
      ${values.map((v, i) => {
        const d = new Date(start.getTime() + i * 86400000);
        if (!Number.isFinite(v)) {
          return html`<div class="cal-cell empty">${d.getDate()}</div>`;
        }
        const color = this._scoreColor(v, 100);
        return html`<div
          class="cal-cell"
          title=${Math.round(v)}
          style="background: color-mix(in srgb, ${color} 30%, transparent); color: ${color}"
        >
          ${d.getDate()}
        </div>`;
      })}
    </div>`;
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

  /** Axis marks for the popup chart: gridlines and labels per range kind. */
  private _xMarks(kind: RangeKind, count: number): AxisMark[] {
    const locale = lang(this.hass) === 'de' ? 'de-DE' : 'en-US';
    const marks: AxisMark[] = [];
    if (kind === 'hour') {
      const hourStart = new Date();
      hourStart.setMinutes(0, 0, 0);
      const start = hourStart.getTime() - (count - 1) * 3600000;
      for (let i = 0; i < count; i++) {
        const h = new Date(start + i * 3600000).getHours();
        if (h % 6 === 0) marks.push({ i, label: String(h), line: h === 0 });
      }
      return marks;
    }
    if (kind === 'month') {
      // month buckets: mark january for year-over-year comparison
      const now = new Date();
      for (let i = 0; i < count; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() - (count - 1 - i), 1);
        if (d.getMonth() === 0) marks.push({ i, label: String(d.getFullYear()), line: true });
      }
      return marks;
    }
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - (count - 1));
    if (count <= 14) {
      for (let i = 0; i < count; i++) {
        const d = new Date(start.getTime() + i * 86400000);
        marks.push({ i, label: d.toLocaleDateString(locale, { weekday: 'narrow' }) });
      }
      return marks;
    }
    let mondays = 0;
    let months = 0;
    for (let i = 0; i < count; i++) {
      const d = new Date(start.getTime() + i * 86400000);
      if (count <= 45) {
        // weekly gridlines, label every second monday
        if (d.getDay() === 1) {
          marks.push({
            i,
            label:
              mondays++ % 2 === 0
                ? d.toLocaleDateString(locale, { day: 'numeric', month: 'numeric' })
                : undefined,
            line: true,
          });
        }
      } else if (d.getDate() === 1) {
        // monthly gridlines, label every (second) month on long ranges
        marks.push({
          i,
          label:
            count <= 120 || months % 2 === 0
              ? d.toLocaleDateString(locale, { month: 'short' })
              : undefined,
          line: true,
        });
        months++;
      }
    }
    return marks;
  }

  /** Toothbrush popup: when was brushed — one 24h track per day with dots. */
  private _renderEventTimes(entityId: string): TemplateResult | typeof nothing {
    const pts = (this._history[entityId] ?? []).filter((p) => p.v > 0);
    if (!pts.length) return nothing;
    const locale = lang(this.hass) === 'de' ? 'de-DE' : 'en-US';
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const startMs = start.getTime() - 6 * 86400000;
    const rows = Array.from({ length: 7 }, (_, d) => {
      const dayStart = startMs + d * 86400000;
      return {
        date: new Date(dayStart),
        events: pts.filter((p) => p.t >= dayStart && p.t < dayStart + 86400000),
      };
    });
    return html`<div class="times">
      <div class="times-title">${t(this.hass, 'event_times')}</div>
      ${rows.map(
        (r) => html`<div class="times-row">
          <span class="times-day">
            ${r.date.toLocaleDateString(locale, { weekday: 'short' })}
          </span>
          <div class="times-track">
            ${r.events.map(
              (e) => html`<span
                class="times-dot"
                style="left:${((e.t - r.date.getTime()) / 86400000) * 100}%"
                title=${new Date(e.t).toLocaleTimeString(locale, {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              ></span>`
            )}
          </div>
          <span class="times-count">${r.events.length}×</span>
        </div>`
      )}
      <div class="times-hours">
        <span>0</span><span>6</span><span>12</span><span>18</span><span>24</span>
      </div>
    </div>`;
  }

  /**
   * Detail view shared by the popup and expanded tiles: period picker, big
   * chart with axes, stats grid and metric-specific extras.
   */
  private _renderDetails(
    m: MetricConfig,
    c: MetricCtx,
    activeKey: string,
    setRange: (key: string) => void
  ): TemplateResult {
    const finite = c.data[0].buckets.filter(Number.isFinite);
    const delta = trendDelta(c.data[0].filled);
    const goal = this._resolveGoal(m.goal);
    const v = c.valueOverride ?? this._numeric(c.primaryState, m.attribute);
    const stats: Array<{ label: string; value: string }> = [];
    if (finite.length) {
      stats.push(
        {
          label: t(this.hass, 'stat_min'),
          value: this._fmtMetricValue(c, Math.min(...finite)),
        },
        {
          label: t(this.hass, 'stat_avg'),
          value: this._fmtMetricValue(
            c,
            finite.reduce((a, b) => a + b, 0) / finite.length
          ),
        },
        {
          label: t(this.hass, 'stat_max'),
          value: this._fmtMetricValue(c, Math.max(...finite)),
        }
      );
      if (Number.isFinite(delta) && delta !== 0) {
        stats.push({
          label: t(this.hass, 'stat_trend'),
          value: `${delta > 0 ? '+' : ''}${this._fmtMetricValue(c, delta)}`,
        });
      }
    }
    if (Number.isFinite(goal) && Number.isFinite(v)) {
      const left = c.goalType === 'atmost' ? v - goal : goal - v;
      stats.push({
        label: t(this.hass, 'goal_left'),
        value: left > 0 ? this._fmtMetricValue(c, left) : '✓',
      });
    }

    // History chart with axes: long ranges scroll horizontally without dots.
    const n = c.days;
    const wide = c.kind === 'month' || (c.kind === 'day' && n > 16);
    const historyGraph = c.graph === 'bar' || c.graph === 'progress' ? 'bar' : 'line';
    const isDur = m.duration ?? c.preset.duration;
    const yFmt = (val: number): string =>
      isDur ? this._fmtMetricValue(c, val) : fmtNumber(this.hass, val, c.precision);
    const opts: ChartOpts = {
      w: wide ? n * (c.kind === 'month' ? 14 : 10) : 340,
      h: wide ? 110 : 130,
      dots: c.kind === 'day' && n <= 14,
      yFmt,
      xMarks: this._xMarks(c.kind, n),
    };
    const historyTpl =
      historyGraph === 'bar'
        ? barChart(
            c.data[0].buckets,
            c.data[0].colorResolved,
            Number.isFinite(goal) ? goal : undefined,
            opts
          )
        : lineChart(
            c.data.map((s) => ({ values: s.filled, color: s.colorResolved })),
            opts
          );

    // Sleep score calendar (day resolution only, capped at ~3 months)
    const calDays = Math.min(n, 91);
    const calendar =
      c.type === 'sleep' &&
      c.kind === 'day' &&
      m.score_entity &&
      this.hass.states[m.score_entity]
        ? this._renderScoreCalendar(
            this._bucketsFor(m.score_entity, 'day', calDays, 'mean'),
            calDays
          )
        : nothing;

    return html`
      <div class="periods">
        ${POPUP_RANGES.map(
          (p) => html`<button
            class="period ${activeKey === p.key ? 'active' : ''}"
            @click=${(e: Event) => {
              e.stopPropagation();
              setRange(p.key);
            }}
          >
            ${t(this.hass, `period_${p.key}`)}
          </button>`
        )}
      </div>
      ${c.graph === 'progress'
        ? this._renderChart(m, 'progress', c.data, c.unit, c.precision)
        : nothing}
      <div class="popup-chart">
        ${wide
          ? html`<div class="chart-scroll">
              <div style="width:${opts.w}px">${historyTpl}</div>
            </div>`
          : historyTpl}
      </div>
      ${stats.length
        ? html`<div class="stats">
            ${stats.map(
              (s) => html`<div class="stat">
                <div class="stat-label">${s.label}</div>
                <div class="stat-value">${s.value}</div>
              </div>`
            )}
          </div>`
        : nothing}
      ${calendar}
      ${c.type === 'toothbrush' && c.series[0]?.entity
        ? this._renderEventTimes(c.series[0].entity)
        : nothing}
      ${c.multi ? this._renderSeriesChips(c.data, c.precision, c.trendMode) : nothing}
      ${c.type === 'sleep' && m.phases ? this._renderSleepPhases(m) : nothing}
      ${this._renderSecondary(m)}
    `;
  }

  private _renderPopup(): TemplateResult | typeof nothing {
    if (this._popup === null || !this._config) return nothing;
    const m = this._config.metrics[this._popup];
    if (!m) return nothing;
    const c = this._ctx(m, this._activeRange());
    if (!c.primaryState) return nothing;
    const primaryState = c.primaryState;
    const activeKey =
      this._popupRange ?? (c.days === 7 && c.kind === 'day' ? 'week' : '');

    return html`
      <div class="backdrop s-${this._cardStyle()}" @click=${() => (this._popup = null)}>
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
            ${this._renderScoreBadge(m)}
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
          ${this._renderDetails(m, c, activeKey, (k) => {
            this._popupRange = k;
          })}
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
    const type = (m.type && PRESETS[m.type] ? m.type : 'custom') as MetricType;
    const isDuration = m.duration ?? PRESETS[type].duration;
    const text = stable
      ? t(this.hass, 'stable')
      : isDuration
        ? fmtDuration(Math.abs(delta), unit || undefined)
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

    /* ---- card styles ---------------------------------------------------
       .s-* rules use plain descendant selectors so they style both the card
       tiles and the detail popup (the backdrop carries the same class). */

    /* default: plain HA look following the active theme */
    .s-default {
      --hc-tile-bg: var(
        --secondary-background-color,
        color-mix(in srgb, var(--primary-text-color) 5%, var(--hc-card-bg))
      );
      --hc-dot-fill: var(--secondary-background-color, var(--hc-card-bg));
      --hc-tile-radius: var(--ha-card-border-radius, 12px);
    }
    /* withings: soft tinted tiles (base tokens, nothing extra needed) */

    /* liquid glass: translucent, blurred, specular top edge */
    .s-glass {
      --hc-tile-bg: color-mix(in srgb, var(--hc-card-bg) 42%, transparent);
      --hc-dot-fill: var(--hc-card-bg);
      --hc-tile-radius: 22px;
    }
    ha-card.cardroot.s-glass {
      background: color-mix(in srgb, var(--hc-card-bg) 55%, transparent);
      -webkit-backdrop-filter: blur(18px) saturate(1.5);
      backdrop-filter: blur(18px) saturate(1.5);
    }
    .s-glass .metric {
      border: 1px solid color-mix(in srgb, var(--primary-text-color) 12%, transparent);
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, #fff 25%, transparent),
        0 8px 24px color-mix(in srgb, #000 10%, transparent);
      -webkit-backdrop-filter: blur(18px) saturate(1.5);
      backdrop-filter: blur(18px) saturate(1.5);
    }
    .s-glass .iconchip {
      background: color-mix(in srgb, var(--hc-accent) 24%, transparent);
      border: 1px solid color-mix(in srgb, #fff 30%, transparent);
      box-shadow: inset 0 1px 0 color-mix(in srgb, #fff 40%, transparent);
      -webkit-backdrop-filter: blur(10px) saturate(1.4);
      backdrop-filter: blur(10px) saturate(1.4);
    }
    /* apple-style lens: frosted disc lit from the top left, deep shadow */
    .s-glass .scorewrap::before {
      content: '';
      grid-area: 1 / 1;
      place-self: center;
      width: 58%;
      aspect-ratio: 1;
      border-radius: 50%;
      background:
        radial-gradient(
          120% 120% at 30% 18%,
          color-mix(in srgb, #fff 38%, transparent),
          transparent 62%
        ),
        color-mix(in srgb, var(--hc-card-bg) 38%, transparent);
      border: 1px solid color-mix(in srgb, #fff 45%, transparent);
      box-shadow:
        inset 0 1.5px 1px color-mix(in srgb, #fff 55%, transparent),
        inset 0 -10px 18px color-mix(in srgb, var(--hc-accent) 12%, transparent),
        0 12px 28px color-mix(in srgb, #000 20%, transparent);
      -webkit-backdrop-filter: blur(14px) saturate(1.6);
      backdrop-filter: blur(14px) saturate(1.6);
    }
    /* specular gleam sweeping over the upper left of the lens */
    .s-glass .scorewrap::after {
      content: '';
      grid-area: 1 / 1;
      place-self: center;
      width: 58%;
      aspect-ratio: 1;
      border-radius: 50%;
      background: radial-gradient(
        48% 32% at 32% 16%,
        rgba(255, 255, 255, 0.5),
        transparent 72%
      );
      pointer-events: none;
      position: relative;
      z-index: 2;
    }
    /* the frosted disc forms a stacking context that would otherwise paint
       above the in-flow number/ring — lift both above it */
    .s-glass .scorering,
    .s-glass .scoreinner {
      position: relative;
      z-index: 1;
    }
    .s-glass .scorenum {
      text-shadow: 0 1px 3px color-mix(in srgb, #000 18%, transparent);
    }
    @keyframes hc-pulse {
      0%,
      100% {
        opacity: 0.45;
      }
      50% {
        opacity: 0.9;
      }
    }
    .scorering .glowpulse {
      animation: hc-pulse 2.6s ease-in-out infinite;
    }
    .s-glass .dialog {
      background: color-mix(in srgb, var(--hc-card-bg) 55%, transparent);
      -webkit-backdrop-filter: blur(26px) saturate(1.5);
      backdrop-filter: blur(26px) saturate(1.5);
      border: 1px solid color-mix(in srgb, #fff 25%, transparent);
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, #fff 30%, transparent),
        0 12px 48px rgba(0, 0, 0, 0.35);
    }

    /* material you: per-metric tonal tiles, filled icon, top-left color orb */
    .s-material {
      --hc-tile-radius: 24px;
    }
    ha-card.cardroot.s-material {
      border-radius: 28px;
    }
    .s-material .metric {
      position: relative;
      overflow: hidden;
      background: color-mix(in srgb, var(--hc-accent) 12%, var(--hc-card-bg));
      --hc-dot-fill: color-mix(in srgb, var(--hc-accent) 12%, var(--hc-card-bg));
    }
    .s-material .metric::before {
      content: '';
      position: absolute;
      top: -70px;
      left: -70px;
      width: 190px;
      height: 190px;
      border-radius: 50%;
      background: color-mix(in srgb, var(--hc-accent) 22%, transparent);
      pointer-events: none;
    }
    .s-material .metric > * {
      position: relative;
    }
    .s-material .iconchip {
      border-radius: 14px;
      background: var(--hc-accent);
      color: var(--hc-card-bg);
    }
    .s-material .value {
      letter-spacing: 0;
    }
    .s-material .dialog {
      border-radius: 28px;
      background:
        radial-gradient(
          circle at -30px -30px,
          color-mix(in srgb, var(--hc-accent) 24%, transparent) 0 130px,
          transparent 131px
        ),
        color-mix(in srgb, var(--hc-accent) 9%, var(--hc-card-bg));
      --hc-tile-bg: color-mix(in srgb, var(--hc-accent) 14%, var(--hc-card-bg));
      --hc-dot-fill: color-mix(in srgb, var(--hc-accent) 14%, var(--hc-card-bg));
    }
    .s-material .dialog .iconchip {
      background: var(--hc-accent);
      color: var(--hc-card-bg);
    }

    /* bubble: free-floating solid modules with big icon bubbles */
    .s-bubble {
      --hc-tile-bg: var(--hc-card-bg);
      --hc-dot-fill: var(--hc-card-bg);
      --hc-tile-radius: 32px;
    }
    ha-card.cardroot.s-bubble {
      background: none;
      box-shadow: none;
      border: none;
    }
    .s-bubble .metric {
      box-shadow: var(--ha-card-box-shadow, 0 2px 8px rgba(0, 0, 0, 0.08));
      padding: 12px 16px;
    }
    .s-bubble .iconchip {
      width: 42px;
      height: 42px;
      background: color-mix(in srgb, var(--hc-accent) 20%, transparent);
    }
    .s-bubble .iconchip ha-icon {
      --mdc-icon-size: 22px;
    }
    .s-bubble .name {
      font-weight: 700;
    }
    .s-bubble .dialog {
      border-radius: 32px;
    }

    /* magic mirror: pure black, high contrast, monochrome graphics */
    .s-mirror {
      --hc-tile-bg: #000;
      --hc-dot-fill: #000;
      --hc-tile-radius: 14px;
      color: #fff;
    }
    ha-card.cardroot.s-mirror {
      background: #000;
      box-shadow: none;
      border: none;
    }
    .s-mirror .metric {
      border: 1px solid rgba(255, 255, 255, 0.28);
    }
    .s-mirror .metric:hover {
      background: #0d0d0d;
      --hc-tile-bg: #0d0d0d;
    }
    .s-mirror .title,
    .s-mirror .name,
    .s-mirror .value,
    .s-mirror .scorenum,
    .s-mirror .dialog-title,
    .s-mirror .phaseval,
    .s-mirror .serieschip,
    .s-mirror .stat-value {
      color: #fff;
    }
    .s-mirror .subtitle,
    .s-mirror .time,
    .s-mirror .unit,
    .s-mirror .secondary,
    .s-mirror .scoremax,
    .s-mirror .stat-label,
    .s-mirror .phase,
    .s-mirror .pbar-label,
    .s-mirror .daylabels {
      color: rgba(255, 255, 255, 0.72);
    }
    .s-mirror .status {
      color: rgba(255, 255, 255, 0.85);
    }
    .s-mirror .iconchip {
      background: rgba(255, 255, 255, 0.14);
      color: #fff;
    }
    .s-mirror .chart,
    .s-mirror .segbar,
    .s-mirror .phasedot,
    .s-mirror .bpdot {
      filter: grayscale(1) brightness(1.75);
    }
    .s-mirror .serieschip .dotarrow {
      background: rgba(255, 255, 255, 0.2) !important;
    }
    .s-mirror .pfill {
      background: #fff;
    }
    .s-mirror .ptrack {
      background: rgba(255, 255, 255, 0.18);
    }
    .s-mirror .missing {
      color: rgba(255, 255, 255, 0.8);
    }
    .s-mirror .dialog {
      background: #000;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .s-mirror .popup-chart,
    .s-mirror .stat {
      background: #000;
      border: 1px solid rgba(255, 255, 255, 0.18);
    }
    .s-mirror .close {
      background: rgba(255, 255, 255, 0.16);
      color: #fff;
    }
    .s-mirror .openha {
      color: #fff;
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
    /* tiles off: no style may draw tile borders or shadows (e.g. mirror) */
    .cardroot.flat .metric {
      border: none;
      box-shadow: none;
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
      /* keep the fade overlay (var consumer) in sync with the hover tint so
         no sharp rectangle shows inside the tile */
      background: color-mix(in srgb, var(--primary-text-color) 7%, var(--hc-card-bg));
      --hc-tile-bg: color-mix(in srgb, var(--primary-text-color) 7%, var(--hc-card-bg));
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
    .chart .axis {
      fill: var(--secondary-text-color);
      font-size: 9px;
      font-weight: 500;
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
    .cycle-phase {
      text-align: center;
      font-size: 16px;
      font-weight: 700;
    }
    .cycle-note {
      text-align: center;
      font-size: 13px;
      color: var(--secondary-text-color);
      margin-top: -2px;
    }
    .score-bars {
      display: flex;
      flex-direction: column;
      gap: 6px;
      width: 100%;
      max-width: 260px;
      margin: 0 auto;
    }
    .sbar {
      display: grid;
      grid-template-columns: minmax(56px, auto) 1fr auto;
      align-items: center;
      gap: 8px;
      font-size: 12px;
    }
    .sbar-name {
      color: var(--secondary-text-color);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .sbar-track {
      height: 6px;
      border-radius: 3px;
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
      overflow: hidden;
    }
    .sbar-fill {
      height: 100%;
      border-radius: 3px;
    }
    .sbar-val {
      font-weight: 700;
      color: var(--primary-text-color);
    }
    .s-mirror .sbar-fill {
      filter: grayscale(1) brightness(1.75);
    }
    .exp-value {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 6px 10px;
    }

    /* ---- body / avatar tile -------------------------------------------
       no clip-path: the figure fades out (mask) before the bottom and the
       frame clips its own overflow, so nothing reaches the rounded card
       corners or spills below. the glows may still overflow the top/sides. */
    .body-metric {
      position: relative;
    }
    .bodywrap {
      position: relative;
      width: min(300px, 100%);
      margin: 0 auto;
    }
    /* fixed-height, playing-card-ish frame. nothing is ever hard-clipped:
       the figure may spill toward the card edges (top/sides), only the lower
       edge is covered by a soft gradient overlay so feet melt into the tile
       before the value text. zoom magnifies the inner stage in place, keeping
       the card height constant. the upper-body crop is the one exception —
       cropping is its purpose. */
    .bodyframe {
      position: relative;
      width: 100%;
      aspect-ratio: var(--hc-frame-ar, 0.68);
    }
    /* the frame clips the figure to its box (so the lower body, which the
       fade dissolves, and any zoom overflow never reach the rounded card
       corners or the value label) */
    .bodyframe {
      overflow: hidden;
    }
    .bodystage {
      position: absolute;
      inset: 0;
      transform: translate(var(--hc-ox, 0%), var(--hc-oy, 0%))
        scale(var(--hc-zoom, 1));
      transform-origin: 50% 0;
    }
    /* figure fits the frame, head-aligned to the top */
    .bodyimg {
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: 50% 0;
      display: block;
    }
    .bodyframe.crop-upper .bodyimg {
      height: auto;
      object-fit: unset;
    }
    /* bottom fade: the FIGURE ITSELF fades to transparent over the lowest
       --hc-fade px of the frame (a mask, not a colour overlay). true
       transparency dissolves the figure into whatever is behind on ANY theme
       — solid or translucent, no hover dependency, no coloured band, and the
       rounded card corners show through where the figure has faded out. it is
       frame-relative (not image-relative) so it never lands too low. */
    .bodyframe.fade {
      -webkit-mask-image: linear-gradient(
        to bottom,
        #000 calc(100% - var(--hc-fade, 200px)),
        transparent calc(100% - var(--hc-fade, 200px) * 0.18)
      );
      mask-image: linear-gradient(
        to bottom,
        #000 calc(100% - var(--hc-fade, 200px)),
        transparent calc(100% - var(--hc-fade, 200px) * 0.18)
      );
    }
    .unblack-defs {
      position: absolute;
      width: 0;
      height: 0;
    }
    .body-glow {
      position: absolute;
      inset: -8%;
      border-radius: 50%;
      background: radial-gradient(
        closest-side,
        color-mix(in srgb, var(--hc-glow) 45%, transparent),
        transparent
      );
      pointer-events: none;
    }
    .body-fever {
      position: absolute;
      width: 52%;
      aspect-ratio: 1.1;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background: radial-gradient(
        closest-side,
        color-mix(in srgb, var(--error-color, #e53935) 45%, transparent),
        transparent
      );
      pointer-events: none;
    }
    .body-tired {
      position: absolute;
      transform: translate(-50%, -50%);
      display: flex;
      gap: 5%;
      width: 20%;
      pointer-events: none;
    }
    .body-tired span {
      flex: 1;
      aspect-ratio: 1.7;
      border-radius: 50%;
      background: radial-gradient(
        closest-side,
        color-mix(in srgb, #3a2a4a 85%, transparent),
        transparent
      );
      filter: blur(1px);
    }
    /* the anchor is pinned to the point (x/y); the dot sits at that point and
       the chip is offset to one of 8 directions via a translate */
    .anchor {
      position: absolute;
      pointer-events: none;
      --gap: 9px;
      --dg: 2px;
    }
    .anchor-dot {
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      background: var(--ac);
      border: 2px solid var(--hc-card-bg);
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
    }
    .anchor-chip {
      position: absolute;
      top: 0;
      left: 0;
      background: color-mix(
        in srgb,
        var(--hc-card-bg) calc(var(--hc-label-op, 1) * 100%),
        transparent
      );
      border-radius: 10px;
      padding: 4px 9px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, calc(var(--hc-label-op, 1) * 0.16));
      display: flex;
      flex-direction: column;
      line-height: 1.25;
      white-space: nowrap;
    }
    /* dot-<dir> = dot is on that side of the chip → chip offset the other way.
       diagonals sit closer (smaller gap) so the label hugs the point. */
    .anchor.dot-right .anchor-chip {
      transform: translate(calc(-100% - var(--gap)), -50%);
    }
    .anchor.dot-left .anchor-chip {
      transform: translate(var(--gap), -50%);
    }
    .anchor.dot-bottom .anchor-chip {
      transform: translate(-50%, calc(-100% - var(--gap)));
    }
    .anchor.dot-top .anchor-chip {
      transform: translate(-50%, var(--gap));
    }
    .anchor.dot-bottom-right .anchor-chip {
      transform: translate(calc(-100% - var(--dg)), calc(-100% - var(--dg)));
    }
    .anchor.dot-bottom-left .anchor-chip {
      transform: translate(var(--dg), calc(-100% - var(--dg)));
    }
    .anchor.dot-top-right .anchor-chip {
      transform: translate(calc(-100% - var(--dg)), var(--dg));
    }
    .anchor.dot-top-left .anchor-chip {
      transform: translate(var(--dg), var(--dg));
    }
    /* design-language chip styling */
    .s-glass .anchor-chip {
      border: 1px solid color-mix(in srgb, #fff 30%, transparent);
      -webkit-backdrop-filter: blur(8px) saturate(1.4);
      backdrop-filter: blur(8px) saturate(1.4);
      box-shadow:
        inset 0 1px 0 color-mix(in srgb, #fff 30%, transparent),
        0 4px 14px rgba(0, 0, 0, 0.16);
    }
    .s-material .anchor-chip {
      border-radius: 14px;
      background: color-mix(
        in srgb,
        color-mix(in srgb, var(--hc-accent) 16%, var(--hc-card-bg))
          calc(var(--hc-label-op, 1) * 100%),
        transparent
      );
    }
    .s-bubble .anchor-chip {
      border-radius: 14px;
    }
    .anchor-name {
      font-size: 10px;
      font-weight: 600;
      color: var(--secondary-text-color);
    }
    .anchor-val {
      font-size: 12px;
      font-weight: 700;
      color: var(--primary-text-color);
    }
    .s-mirror .anchor-chip {
      background: #000;
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: none;
    }
    .s-mirror .anchor-dot {
      border-color: #000;
    }
    .body-foot {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      /* lift the value above the (absolutely positioned) figure and fade */
      position: relative;
      z-index: 4;
    }
    .body-foot .value {
      font-size: 24px;
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
    .stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
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
    .scorebadge {
      min-width: 26px;
      height: 20px;
      padding: 0 7px;
      border-radius: 10px;
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex: none;
      box-sizing: border-box;
    }
    .periods {
      display: flex;
      gap: 6px;
    }
    .period {
      border: none;
      cursor: pointer;
      padding: 5px 14px;
      border-radius: 999px;
      font-weight: 600;
      font-size: 12px;
      color: var(--secondary-text-color);
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
    .period.active {
      background: var(--hc-accent);
      color: var(--hc-card-bg);
    }
    .s-mirror .period {
      background: rgba(255, 255, 255, 0.12);
      color: rgba(255, 255, 255, 0.75);
    }
    .s-mirror .period.active {
      background: #fff;
      color: #000;
    }
    .chart-scroll {
      overflow-x: auto;
      scrollbar-width: thin;
    }
    .chart-scroll > div {
      min-width: 100%;
    }
    .cal {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 4px;
    }
    .cal-head {
      font-size: 10px;
      text-align: center;
      color: var(--secondary-text-color);
    }
    .cal-cell {
      aspect-ratio: 1;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 700;
    }
    .cal-cell.empty {
      background: color-mix(in srgb, var(--primary-text-color) 5%, transparent);
      color: var(--secondary-text-color);
      font-weight: 400;
    }
    .s-mirror .cal-cell.empty {
      background: rgba(255, 255, 255, 0.08);
    }
    .times {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
    .times-title {
      font-size: 12px;
      font-weight: 600;
      color: var(--secondary-text-color);
      margin-bottom: 2px;
    }
    .times-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .times-day {
      width: 30px;
      flex: none;
      font-size: 11px;
      color: var(--secondary-text-color);
    }
    .times-track {
      position: relative;
      flex: 1;
      height: 14px;
      border-radius: 7px;
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
    .times-dot {
      position: absolute;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: var(--hc-accent);
    }
    .times-count {
      width: 26px;
      flex: none;
      text-align: right;
      font-size: 11px;
      font-weight: 600;
      color: var(--primary-text-color);
    }
    .times-hours {
      display: flex;
      justify-content: space-between;
      margin: 0 34px 0 38px;
      font-size: 9px;
      color: var(--secondary-text-color);
    }
    .s-mirror .times-track {
      background: rgba(255, 255, 255, 0.12);
    }
    .s-mirror .times-dot {
      background: #fff;
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
