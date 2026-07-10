import { LitElement, html, css, nothing } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  HealthCardConfig,
  HomeAssistant,
  MetricConfig,
  MetricType,
} from './types';
import { COLOR_NAMES, PRESETS } from './presets';
import { lang, t } from './i18n';

const METRIC_TYPES = Object.keys(PRESETS) as MetricType[];
const MULTI_TYPES: MetricType[] = ['body_composition', 'nutrition'];

const LABELS: Record<string, Record<string, string>> = {
  en: {
    title: 'Title',
    subtitle: 'Subtitle',
    days: 'History (days)',
    columns: 'Columns',
    tiles: 'Show metrics as tiles',
    layout: 'Layout',
    layout_grid: 'Grid',
    layout_carousel: 'Carousel (scrollable)',
    background: 'Card background',
    flush: 'Edge to edge (no outer padding)',
    card_style: 'Style',
    style_default: 'HA default',
    style_withings: 'Withings',
    style_glass: 'Liquid Glass',
    style_material: 'Material You',
    style_bubble: 'Bubble',
    goal_type: 'Goal direction',
    gt_atleast: 'Reach at least',
    gt_atmost: 'Stay at/below (e.g. lose weight)',
    goal_entity: 'Goal sensor (overrides number)',
    start: 'Start value (number)',
    start_entity: 'Start sensor (overrides number)',
    tap_action: 'Tap action',
    ta_popup: 'Popup (detail view)',
    'ta_more-info': 'More-info (HA dialog)',
    ta_link: 'Link',
    ta_none: 'Nothing',
    link: 'Link (path or URL)',
    max: 'Maximum (score)',
    phase_deep: 'Deep sleep entity',
    phase_light: 'Light sleep entity',
    phase_rem: 'REM sleep entity',
    phase_awake: 'Awake entity',
    type: 'Type',
    entity: 'Entity',
    entity2: 'Second entity (e.g. diastolic)',
    entities: 'Entities (multiple series)',
    secondary: 'Extra entities (info line)',
    name: 'Name',
    icon: 'Icon',
    color: 'Color',
    unit: 'Unit',
    graph: 'Chart',
    goal: 'Goal (number)',
    precision: 'Decimals',
    aggregate: 'Aggregation',
    trend: 'Trend',
    label: 'Text instead of value',
    add_metric: 'Add metric',
    graph_line: 'Line',
    graph_bar: 'Bars',
    graph_progress: 'Progress',
    graph_none: 'None',
    agg_mean: 'Average',
    agg_min: 'Minimum',
    agg_max: 'Maximum',
    agg_sum: 'Sum',
    agg_last: 'Last value',
    trend_up_good: 'Rising is good',
    trend_down_good: 'Falling is good',
    trend_neutral: 'Neutral',
    trend_none: 'Hide',
  },
  de: {
    title: 'Titel',
    subtitle: 'Untertitel',
    days: 'Verlauf (Tage)',
    columns: 'Spalten',
    tiles: 'Metriken als Kacheln anzeigen',
    layout: 'Layout',
    layout_grid: 'Raster',
    layout_carousel: 'Slideshow (scrollbar)',
    background: 'Kartenhintergrund',
    flush: 'Randlos (kein Außenabstand)',
    card_style: 'Stil',
    style_default: 'HA-Standard',
    style_withings: 'Withings',
    style_glass: 'Liquid Glass',
    style_material: 'Material You',
    style_bubble: 'Bubble',
    goal_type: 'Zielrichtung',
    gt_atleast: 'Mindestens erreichen',
    gt_atmost: 'Höchstens (z. B. abnehmen)',
    goal_entity: 'Ziel-Sensor (hat Vorrang)',
    start: 'Startwert (Zahl)',
    start_entity: 'Start-Sensor (hat Vorrang)',
    tap_action: 'Klick-Aktion',
    ta_popup: 'Popup (Detailansicht)',
    'ta_more-info': 'More-Info (HA-Dialog)',
    ta_link: 'Link',
    ta_none: 'Nichts',
    link: 'Link (Pfad oder URL)',
    max: 'Maximum (Score)',
    phase_deep: 'Tiefschlaf-Entität',
    phase_light: 'Leichtschlaf-Entität',
    phase_rem: 'REM-Schlaf-Entität',
    phase_awake: 'Wachphasen-Entität',
    type: 'Typ',
    entity: 'Entität',
    entity2: 'Zweite Entität (z. B. diastolisch)',
    entities: 'Entitäten (mehrere Serien)',
    secondary: 'Zusatz-Entitäten (Infozeile)',
    name: 'Name',
    icon: 'Icon',
    color: 'Farbe',
    unit: 'Einheit',
    graph: 'Diagramm',
    goal: 'Ziel (Zahl)',
    precision: 'Nachkommastellen',
    aggregate: 'Aggregation',
    trend: 'Trend',
    label: 'Text statt Wert',
    add_metric: 'Metrik hinzufügen',
    graph_line: 'Linie',
    graph_bar: 'Balken',
    graph_progress: 'Fortschritt',
    graph_none: 'Kein',
    agg_mean: 'Mittelwert',
    agg_min: 'Minimum',
    agg_max: 'Maximum',
    agg_sum: 'Summe',
    agg_last: 'Letzter Wert',
    trend_up_good: 'Steigen ist gut',
    trend_down_good: 'Fallen ist gut',
    trend_neutral: 'Neutral',
    trend_none: 'Ausblenden',
  },
};

@customElement('health-card-editor')
export class HealthCardEditor extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config?: HealthCardConfig;
  @state() private _expanded = -1;

  public setConfig(config: HealthCardConfig): void {
    this._config = config;
  }

  private _label(key: string): string {
    const l = LABELS[lang(this.hass)] ?? LABELS.en;
    return l[key] ?? LABELS.en[key] ?? key;
  }

  private _topSchema(): unknown[] {
    return [
      { name: 'title', selector: { text: {} } },
      { name: 'subtitle', selector: { text: {} } },
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'days', selector: { number: { min: 1, max: 60, mode: 'box' } } },
          { name: 'columns', selector: { number: { min: 1, max: 3, mode: 'box' } } },
          {
            name: 'layout',
            selector: {
              select: {
                mode: 'dropdown',
                options: [
                  { value: 'grid', label: this._label('layout_grid') },
                  { value: 'carousel', label: this._label('layout_carousel') },
                ],
              },
            },
          },
          {
            name: 'card_style',
            selector: {
              select: {
                mode: 'dropdown',
                options: ['default', 'withings', 'glass', 'material', 'bubble'].map(
                  (v) => ({ value: v, label: this._label(`style_${v}`) })
                ),
              },
            },
          },
        ],
      },
      { name: 'tiles', selector: { boolean: {} } },
      { name: 'background', selector: { boolean: {} } },
      { name: 'flush', selector: { boolean: {} } },
    ];
  }

  private _metricSchema(m: MetricConfig): unknown[] {
    const type = (m.type ?? 'custom') as MetricType;
    const opts = (keys: string[], prefix: string) =>
      keys.map((k) => ({ value: k, label: this._label(`${prefix}_${k}`) }));
    const entitiesEditable = !m.entities || m.entities.every((e) => typeof e === 'string');
    return [
      {
        name: 'type',
        selector: {
          select: {
            mode: 'dropdown',
            options: METRIC_TYPES.map((k) => ({ value: k, label: t(this.hass, k) })),
          },
        },
      },
      { name: 'entity', selector: { entity: {} } },
      ...(type === 'blood_pressure'
        ? [{ name: 'entity2', selector: { entity: {} } }]
        : []),
      ...(MULTI_TYPES.includes(type) && entitiesEditable
        ? [{ name: 'entities', selector: { entity: { multiple: true } } }]
        : []),
      ...(type === 'sleep'
        ? [
            { name: 'phases_deep', selector: { entity: {} } },
            { name: 'phases_light', selector: { entity: {} } },
            { name: 'phases_rem', selector: { entity: {} } },
            { name: 'phases_awake', selector: { entity: {} } },
          ]
        : []),
      { name: 'secondary', selector: { entity: { multiple: true } } },
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'name', selector: { text: {} } },
          { name: 'icon', selector: { icon: {} } },
          {
            name: 'color',
            selector: {
              select: {
                mode: 'dropdown',
                custom_value: true,
                options: COLOR_NAMES.map((c) => ({ value: c, label: c })),
              },
            },
          },
          { name: 'unit', selector: { text: {} } },
          {
            name: 'graph',
            selector: {
              select: {
                mode: 'dropdown',
                options: opts(['line', 'bar', 'progress', 'none'], 'graph'),
              },
            },
          },
          { name: 'days', selector: { number: { min: 1, max: 60, mode: 'box' } } },
          { name: 'goal', selector: { number: { mode: 'box', step: 'any' } } },
          { name: 'goal_entity', selector: { entity: {} } },
          { name: 'start', selector: { number: { mode: 'box', step: 'any' } } },
          { name: 'start_entity', selector: { entity: {} } },
          {
            name: 'goal_type',
            selector: {
              select: {
                mode: 'dropdown',
                options: opts(['atleast', 'atmost'], 'gt'),
              },
            },
          },
          {
            name: 'precision',
            selector: { number: { min: 0, max: 3, mode: 'box' } },
          },
          ...(type === 'score'
            ? [{ name: 'max', selector: { number: { min: 1, mode: 'box' } } }]
            : []),
          {
            name: 'tap_action',
            selector: {
              select: {
                mode: 'dropdown',
                options: opts(['popup', 'more-info', 'link', 'none'], 'ta'),
              },
            },
          },
          ...(m.tap_action === 'link'
            ? [{ name: 'link', selector: { text: {} } }]
            : []),
          {
            name: 'aggregate',
            selector: {
              select: {
                mode: 'dropdown',
                options: opts(['mean', 'min', 'max', 'sum', 'last'], 'agg'),
              },
            },
          },
          {
            name: 'trend',
            selector: {
              select: {
                mode: 'dropdown',
                options: opts(['up_good', 'down_good', 'neutral', 'none'], 'trend'),
              },
            },
          },
        ],
      },
      { name: 'label', selector: { text: {} } },
    ];
  }

  protected render(): TemplateResult | typeof nothing {
    if (!this.hass || !this._config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${{
          tiles: true,
          background: true,
          layout: 'grid',
          card_style: 'withings',
          ...this._config,
        }}
        .schema=${this._topSchema()}
        .computeLabel=${(s: { name: string }) => this._label(s.name)}
        @value-changed=${this._topChanged}
      ></ha-form>

      <div class="metrics">
        ${this._config.metrics.map((m, i) => this._renderMetricEditor(m, i))}
      </div>

      <button class="add" @click=${this._addMetric}>
        <ha-icon icon="mdi:plus"></ha-icon>
        ${this._label('add_metric')}
      </button>
    `;
  }

  private _renderMetricEditor(m: MetricConfig, i: number): TemplateResult {
    const type = (m.type ?? 'custom') as MetricType;
    const preset = PRESETS[type] ?? PRESETS.custom;
    const open = this._expanded === i;
    const count = this._config!.metrics.length;
    return html`
      <div class="metric ${open ? 'open' : ''}">
        <div class="metric-head" @click=${() => (this._expanded = open ? -1 : i)}>
          <ha-icon .icon=${m.icon ?? preset.icon}></ha-icon>
          <span class="metric-title">
            ${m.name ?? t(this.hass, type)}
            <span class="metric-entity">${m.entity ?? ''}</span>
          </span>
          <button
            class="icon-btn"
            .disabled=${i === 0}
            title="↑"
            @click=${(e: Event) => this._move(e, i, -1)}
          >
            <ha-icon icon="mdi:chevron-up"></ha-icon>
          </button>
          <button
            class="icon-btn"
            .disabled=${i === count - 1}
            title="↓"
            @click=${(e: Event) => this._move(e, i, 1)}
          >
            <ha-icon icon="mdi:chevron-down"></ha-icon>
          </button>
          <button class="icon-btn danger" @click=${(e: Event) => this._remove(e, i)}>
            <ha-icon icon="mdi:delete-outline"></ha-icon>
          </button>
          <ha-icon
            class="expand"
            icon=${open ? 'mdi:chevron-up' : 'mdi:chevron-down'}
          ></ha-icon>
        </div>
        ${open
          ? html`<div class="metric-body">
              <ha-form
                .hass=${this.hass}
                .data=${{
                  ...m,
                  goal: typeof m.goal === 'number' ? m.goal : undefined,
                  goal_entity: typeof m.goal === 'string' ? m.goal : undefined,
                  start: typeof m.start === 'number' ? m.start : undefined,
                  start_entity: typeof m.start === 'string' ? m.start : undefined,
                  phases_deep: m.phases?.deep,
                  phases_light: m.phases?.light,
                  phases_rem: m.phases?.rem,
                  phases_awake: m.phases?.awake,
                }}
                .schema=${this._metricSchema(m)}
                .computeLabel=${(s: { name: string }) => this._label(s.name)}
                @value-changed=${(ev: CustomEvent) => this._metricChanged(ev, i)}
              ></ha-form>
            </div>`
          : nothing}
      </div>
    `;
  }

  private _emit(config: HealthCardConfig): void {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent('config-changed', {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _clean<T extends object>(obj: T): T {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      if (v === '' || v === null || v === undefined) continue;
      if (Array.isArray(v) && !v.length) continue;
      out[k] = v;
    }
    return out as T;
  }

  private _topChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    if (!this._config) return;
    const value = ev.detail.value as Partial<HealthCardConfig>;
    this._emit(this._clean({ ...this._config, ...value, metrics: this._config.metrics }));
  }

  private _metricChanged(ev: CustomEvent, index: number): void {
    ev.stopPropagation();
    if (!this._config) return;
    const value = { ...(ev.detail.value as Record<string, unknown>) };

    // Reassemble the flattened phases_* fields into the phases object
    const phases: Record<string, string> = {};
    for (const key of ['deep', 'light', 'rem', 'awake']) {
      const v = value[`phases_${key}`];
      delete value[`phases_${key}`];
      if (typeof v === 'string' && v) phases[key] = v;
    }
    if (Object.keys(phases).length) value.phases = phases;
    else delete value.phases;

    // goal/start are edited as a number box plus an entity picker that both
    // write to the same config key; a picked sensor wins over the number.
    for (const key of ['goal', 'start']) {
      const entityValue = value[`${key}_entity`];
      delete value[`${key}_entity`];
      if (typeof entityValue === 'string' && entityValue) value[key] = entityValue;
    }

    const metrics = [...this._config.metrics];
    metrics[index] = this._clean(value as MetricConfig);
    this._emit({ ...this._config, metrics });
  }

  private _addMetric(): void {
    if (!this._config) return;
    const metrics = [...this._config.metrics, { type: 'weight' as MetricType }];
    this._expanded = metrics.length - 1;
    this._emit({ ...this._config, metrics });
  }

  private _remove(ev: Event, index: number): void {
    ev.stopPropagation();
    if (!this._config) return;
    const metrics = this._config.metrics.filter((_, i) => i !== index);
    if (this._expanded === index) this._expanded = -1;
    this._emit({ ...this._config, metrics });
  }

  private _move(ev: Event, index: number, dir: number): void {
    ev.stopPropagation();
    if (!this._config) return;
    const metrics = [...this._config.metrics];
    const target = index + dir;
    if (target < 0 || target >= metrics.length) return;
    [metrics[index], metrics[target]] = [metrics[target], metrics[index]];
    if (this._expanded === index) this._expanded = target;
    this._emit({ ...this._config, metrics });
  }

  static styles = css`
    .metrics {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 16px;
    }
    .metric {
      border: 1px solid var(--divider-color);
      border-radius: 8px;
      overflow: hidden;
    }
    .metric-head {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      cursor: pointer;
      color: var(--primary-text-color);
    }
    .metric-head > ha-icon {
      color: var(--secondary-text-color);
    }
    .metric-title {
      flex: 1;
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .metric-entity {
      color: var(--secondary-text-color);
      font-size: 12px;
      margin-left: 6px;
    }
    .metric-body {
      padding: 12px;
      border-top: 1px solid var(--divider-color);
    }
    .icon-btn {
      background: none;
      border: none;
      padding: 4px;
      cursor: pointer;
      color: var(--secondary-text-color);
      display: flex;
      border-radius: 6px;
    }
    .icon-btn:hover {
      background: color-mix(in srgb, var(--primary-text-color) 8%, transparent);
    }
    .icon-btn[disabled] {
      opacity: 0.3;
      cursor: default;
    }
    .icon-btn.danger:hover {
      color: var(--error-color, #db4437);
    }
    .icon-btn ha-icon {
      --mdc-icon-size: 18px;
    }
    .expand {
      color: var(--secondary-text-color);
    }
    .add {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 14px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 500;
      color: var(--primary-color);
      background: color-mix(in srgb, var(--primary-color) 12%, transparent);
    }
    .add ha-icon {
      --mdc-icon-size: 18px;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'health-card-editor': HealthCardEditor;
  }
}
