import { LitElement, html, css, nothing } from 'lit';
import type { TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  BodyAnchor,
  HealthCardConfig,
  HomeAssistant,
  MetricConfig,
  MetricType,
} from './types';
import { COLOR_NAMES, PRESETS, resolveColor } from './presets';
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
    style_mirror: 'Magic Mirror',
    sec_display: 'Appearance',
    sec_goal: 'Goal & progress',
    sec_behavior: 'Behavior & data',
    sec_phases: 'Sleep phases',
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
    score_entity: 'Score sensor (traffic-light badge)',
    breakdown: 'Sub-scores (category colors)',
    expanded: 'Expanded tile (details inline)',
    sec_body: 'Body figure',
    gender: 'Build',
    gender_female: 'Female',
    gender_male: 'Male',
    sleep_entity: 'Sleep score sensor (eye shadows)',
    temperature_entity: 'Temperature sensor (fever glow)',
    fever_from: 'Fever from (°C)',
    anchors: 'Value labels on the figure',
    add_anchor: 'Add label',
    anchor_x: 'X %',
    anchor_y: 'Y %',
    figure_style: 'Figure style',
    tab_general: 'General',
    figure_offset_x: 'Horizontal offset %',
    fs_flat: 'Flat silhouette',
    fs_glass: 'Liquid Glass',
    fs_mannequin: 'Mannequin',
    fs_pixar: 'Soft 3D',
    body_crop: 'Crop',
    bc_full: 'Full body',
    bc_upper: 'Upper body',
    figure_zoom: 'Zoom',
    figure_offset_y: 'Vertical offset %',
    tired_below: 'Eye shadows below score',
    dot: 'Dot position',
    dot_left: 'left',
    dot_right: 'right',
    dot_top: 'top',
    dot_bottom: 'bottom',
    tired_x: 'Eye shadows X %',
    tired_y: 'Eye shadows Y %',
    fever_x: 'Fever X %',
    fever_y: 'Fever Y %',
    preview_effects: 'Preview fever + eye shadows',
    fade_figure: 'Fade figure bottom',
    fade_height: 'Fade height %',
    label_opacity: 'Label opacity',
    sec_cycle: 'Cycle',
    cycle_length: 'Cycle length (days)',
    period_length: 'Period length (days)',
    ovulation_day: 'Ovulation day',
    phase_entity: 'Phase sensor (optional)',
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
    style_mirror: 'Magic Mirror',
    sec_display: 'Darstellung',
    sec_goal: 'Ziel & Fortschritt',
    sec_behavior: 'Verhalten & Daten',
    sec_phases: 'Schlafphasen',
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
    score_entity: 'Score-Sensor (Ampel-Badge)',
    breakdown: 'Sub-Scores (Kategoriefarben)',
    expanded: 'Erweiterte Kachel (Details eingeblendet)',
    sec_body: 'Körperfigur',
    gender: 'Körperbau',
    gender_female: 'Weiblich',
    gender_male: 'Männlich',
    sleep_entity: 'Schlafwert-Sensor (Augenringe)',
    temperature_entity: 'Temperatur-Sensor (Fieber-Glow)',
    fever_from: 'Fieber ab (°C)',
    anchors: 'Wert-Labels auf der Figur',
    add_anchor: 'Label hinzufügen',
    anchor_x: 'X %',
    anchor_y: 'Y %',
    figure_style: 'Figur-Stil',
    tab_general: 'Allgemein',
    figure_offset_x: 'Horizontaler Versatz %',
    fs_flat: 'Flache Silhouette',
    fs_glass: 'Liquid Glass',
    fs_mannequin: 'Schaufensterpuppe',
    fs_pixar: 'Weiches 3D',
    body_crop: 'Ausschnitt',
    bc_full: 'Ganzer Körper',
    bc_upper: 'Oberkörper',
    figure_zoom: 'Zoom',
    figure_offset_y: 'Vertikaler Versatz %',
    tired_below: 'Augenringe unter Score',
    dot: 'Punkt-Position',
    dot_left: 'links',
    dot_right: 'rechts',
    dot_top: 'oben',
    dot_bottom: 'unten',
    tired_x: 'Augenringe X %',
    tired_y: 'Augenringe Y %',
    fever_x: 'Fieber X %',
    fever_y: 'Fieber Y %',
    preview_effects: 'Fieber + Augenringe testen',
    fade_figure: 'Figur unten ausblenden',
    fade_height: 'Ausblendhöhe %',
    label_opacity: 'Label-Deckkraft',
    sec_cycle: 'Zyklus',
    cycle_length: 'Zykluslänge (Tage)',
    period_length: 'Periodenlänge (Tage)',
    ovulation_day: 'Eisprung-Tag',
    phase_entity: 'Phasen-Sensor (optional)',
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
  @state() private _tab = 'general';

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
                options: ['default', 'withings', 'glass', 'material', 'bubble', 'mirror'].map(
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

  /** Tabs shown for a metric — AlertTicker-style hub navigation. */
  private _metricTabs(type: MetricType): Array<{ id: string; icon: string; label: string }> {
    const tabs = [
      { id: 'general', icon: 'mdi:tune-variant', label: this._label('tab_general') },
      { id: 'display', icon: 'mdi:palette-outline', label: this._label('sec_display') },
      { id: 'goal', icon: 'mdi:flag-checkered', label: this._label('sec_goal') },
      { id: 'behavior', icon: 'mdi:gesture-tap', label: this._label('sec_behavior') },
    ];
    if (type === 'body')
      tabs.push({ id: 'body', icon: 'mdi:human', label: this._label('sec_body') });
    if (type === 'sleep')
      tabs.push({ id: 'sleep', icon: 'mdi:sleep', label: this._label('sec_phases') });
    if (type === 'cycle')
      tabs.push({ id: 'cycle', icon: 'mdi:calendar-heart', label: this._label('sec_cycle') });
    return tabs;
  }

  private _metricSchema(m: MetricConfig, tab: string): unknown[] {
    const type = (m.type ?? 'custom') as MetricType;
    const opts = (keys: string[], prefix: string) =>
      keys.map((k) => ({ value: k, label: this._label(`${prefix}_${k}`) }));
    const entitiesEditable = !m.entities || m.entities.every((e) => typeof e === 'string');

    switch (tab) {
      case 'display':
        return [
          {
            type: 'grid',
            name: '',
            schema: [
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
              {
                name: 'precision',
                selector: { number: { min: 0, max: 3, mode: 'box' } },
              },
            ],
          },
          { name: 'label', selector: { text: {} } },
          { name: 'expanded', selector: { boolean: {} } },
        ];

      case 'goal':
        return [
          // rows pair same-height components: numbers, then pickers, then selects
          {
            type: 'grid',
            name: '',
            schema: [
              { name: 'goal', selector: { number: { mode: 'box', step: 'any' } } },
              { name: 'start', selector: { number: { mode: 'box', step: 'any' } } },
            ],
          },
          {
            type: 'grid',
            name: '',
            schema: [
              { name: 'goal_entity', selector: { entity: {} } },
              { name: 'start_entity', selector: { entity: {} } },
            ],
          },
          {
            type: 'grid',
            name: '',
            schema: [
              {
                name: 'goal_type',
                selector: {
                  select: {
                    mode: 'dropdown',
                    options: opts(['atleast', 'atmost'], 'gt'),
                  },
                },
              },
              ...(type === 'score'
                ? [{ name: 'max', selector: { number: { min: 1, mode: 'box' } } }]
                : []),
            ],
          },
        ];

      case 'behavior':
        return [
          {
            type: 'grid',
            name: '',
            schema: [
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
          { name: 'secondary', selector: { entity: { multiple: true } } },
          { name: 'score_entity', selector: { entity: {} } },
        ];

      case 'body':
        return [
          {
            type: 'grid',
            name: '',
            schema: [
              {
                name: 'gender',
                selector: {
                  select: {
                    mode: 'dropdown',
                    options: opts(['female', 'male'], 'gender'),
                  },
                },
              },
              {
                name: 'figure_style',
                selector: {
                  select: {
                    mode: 'dropdown',
                    options: opts(['flat', 'glass', 'mannequin', 'pixar'], 'fs'),
                  },
                },
              },
              {
                name: 'body_crop',
                selector: {
                  select: {
                    mode: 'dropdown',
                    options: opts(['full', 'upper'], 'bc'),
                  },
                },
              },
              {
                name: 'figure_zoom',
                selector: { number: { min: 0.5, max: 3, step: 0.1, mode: 'slider' } },
              },
              {
                name: 'figure_offset_x',
                selector: { number: { min: -40, max: 40, step: 1, mode: 'slider' } },
              },
              {
                name: 'figure_offset_y',
                selector: { number: { min: -40, max: 40, step: 1, mode: 'slider' } },
              },
            ],
          },
          {
            type: 'grid',
            name: '',
            schema: [
              { name: 'sleep_entity', selector: { entity: {} } },
              { name: 'temperature_entity', selector: { entity: {} } },
              {
                name: 'tired_below',
                selector: { number: { min: 0, max: 100, mode: 'box' } },
              },
              {
                name: 'fever_from',
                selector: { number: { mode: 'box', step: 'any' } },
              },
              { name: 'tired_x', selector: { number: { min: 0, max: 100, mode: 'box' } } },
              { name: 'tired_y', selector: { number: { min: 0, max: 100, mode: 'box' } } },
              { name: 'fever_x', selector: { number: { min: 0, max: 100, mode: 'box' } } },
              { name: 'fever_y', selector: { number: { min: 0, max: 100, mode: 'box' } } },
            ],
          },
          {
            name: 'label_opacity',
            selector: { number: { min: 0, max: 1, step: 0.05, mode: 'slider' } },
          },
          { name: 'preview_effects', selector: { boolean: {} } },
          { name: 'fade_figure', selector: { boolean: {} } },
          {
            name: 'fade_height',
            selector: { number: { min: 5, max: 90, step: 1, mode: 'slider' } },
          },
        ];

      case 'cycle':
        return [
          {
            type: 'grid',
            name: '',
            schema: [
              {
                name: 'cycle_length',
                selector: { number: { min: 15, max: 60, mode: 'box' } },
              },
              {
                name: 'period_length',
                selector: { number: { min: 1, max: 15, mode: 'box' } },
              },
              {
                name: 'ovulation_day',
                selector: { number: { min: 1, max: 45, mode: 'box' } },
              },
            ],
          },
          { name: 'phase_entity', selector: { entity: {} } },
        ];

      case 'sleep':
        return [
          {
            type: 'grid',
            name: '',
            schema: [
              { name: 'phases_deep', selector: { entity: {} } },
              { name: 'phases_light', selector: { entity: {} } },
              { name: 'phases_rem', selector: { entity: {} } },
              { name: 'phases_awake', selector: { entity: {} } },
            ],
          },
        ];

      default:
        // general
        return [
          {
            type: 'grid',
            name: '',
            schema: [
              {
                name: 'type',
                selector: {
                  select: {
                    mode: 'dropdown',
                    options: METRIC_TYPES.map((k) => ({
                      value: k,
                      label: t(this.hass, k),
                    })),
                  },
                },
              },
              { name: 'name', selector: { text: {} } },
            ],
          },
          { name: 'entity', selector: { entity: {} } },
          ...(type === 'blood_pressure'
            ? [{ name: 'entity2', selector: { entity: {} } }]
            : []),
          ...(MULTI_TYPES.includes(type) && entitiesEditable
            ? [{ name: 'entities', selector: { entity: { multiple: true } } }]
            : []),
          ...(type === 'score' &&
          (!m.breakdown || m.breakdown.every((b) => typeof b === 'string'))
            ? [{ name: 'breakdown', selector: { entity: { multiple: true } } }]
            : []),
        ];
    }
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
        <div
          class="metric-head"
          @click=${() => {
            this._expanded = open ? -1 : i;
            this._tab = 'general';
          }}
        >
          <span
            class="chip"
            style="--c:${resolveColor(m.color) ?? resolveColor(preset.color)}"
          >
            <ha-icon .icon=${m.icon ?? preset.icon}></ha-icon>
          </span>
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
        ${open ? this._renderMetricBody(m, i, type) : nothing}
      </div>
    `;
  }

  private _renderMetricBody(m: MetricConfig, i: number, type: MetricType): TemplateResult {
    const tabs = this._metricTabs(type);
    const active = tabs.some((x) => x.id === this._tab) ? this._tab : 'general';
    return html`<div class="metric-body">
      <div class="tabs">
        ${tabs.map(
          (x) => html`<button
            class="tab ${active === x.id ? 'active' : ''}"
            @click=${() => (this._tab = x.id)}
          >
            <ha-icon .icon=${x.icon}></ha-icon>
            <span>${x.label}</span>
          </button>`
        )}
      </div>
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
        .schema=${this._metricSchema(m, active)}
        .computeLabel=${(s: { name: string }) => this._label(s.name)}
        @value-changed=${(ev: CustomEvent) => this._metricChanged(ev, i)}
      ></ha-form>
      ${active === 'body' ? this._renderAnchorEditor(m, i) : nothing}
    </div>`;
  }

  private _anchorSchema(): unknown[] {
    return [
      { name: 'entity', selector: { entity: {} } },
      {
        type: 'grid',
        name: '',
        schema: [
          { name: 'name', selector: { text: {} } },
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
          { name: 'anchor_x', selector: { number: { min: 0, max: 100, mode: 'box' } } },
          { name: 'anchor_y', selector: { number: { min: 0, max: 100, mode: 'box' } } },
          {
            name: 'dot',
            selector: {
              select: {
                mode: 'dropdown',
                options: [
                  { value: 'left', label: '← ' + this._label('dot_left') },
                  { value: 'right', label: '→ ' + this._label('dot_right') },
                  { value: 'top', label: '↑ ' + this._label('dot_top') },
                  { value: 'bottom', label: '↓ ' + this._label('dot_bottom') },
                  { value: 'top-left', label: '↖' },
                  { value: 'top-right', label: '↗' },
                  { value: 'bottom-left', label: '↙' },
                  { value: 'bottom-right', label: '↘' },
                ],
              },
            },
          },
        ],
      },
      { name: 'entity2', selector: { entity: {} } },
    ];
  }

  private _renderAnchorEditor(m: MetricConfig, mi: number): TemplateResult {
    const anchors = m.anchors ?? [];
    return html`
      <div class="anchor-editor">
        <div class="anchor-editor-title">${this._label('anchors')}</div>
        ${anchors.map(
          (a, ai) => html`
            <div class="anchor-row">
              <ha-form
                .hass=${this.hass}
                .data=${{ ...a, anchor_x: a.x, anchor_y: a.y }}
                .schema=${this._anchorSchema()}
                .computeLabel=${(s: { name: string }) => this._label(s.name)}
                @value-changed=${(ev: CustomEvent) => this._anchorChanged(ev, mi, ai)}
              ></ha-form>
              <button
                class="icon-btn danger"
                title="✕"
                @click=${() => this._removeAnchor(mi, ai)}
              >
                <ha-icon icon="mdi:delete-outline"></ha-icon>
              </button>
            </div>
          `
        )}
        <button class="add small" @click=${() => this._addAnchor(mi)}>
          <ha-icon icon="mdi:plus"></ha-icon>
          ${this._label('add_anchor')}
        </button>
      </div>
    `;
  }

  private _anchorChanged(ev: CustomEvent, mi: number, ai: number): void {
    ev.stopPropagation();
    if (!this._config) return;
    const v = { ...(ev.detail.value as Record<string, unknown>) };
    const anchor: Record<string, unknown> = {};
    if (v.entity) anchor.entity = v.entity;
    if (v.entity2) anchor.entity2 = v.entity2;
    if (v.name) anchor.name = v.name;
    if (v.color) anchor.color = v.color;
    if (v.anchor_x !== undefined && v.anchor_x !== null) anchor.x = v.anchor_x;
    if (v.anchor_y !== undefined && v.anchor_y !== null) anchor.y = v.anchor_y;
    if (v.dot) anchor.dot = v.dot;
    const metrics = [...this._config.metrics];
    const anchors = [...(metrics[mi].anchors ?? [])];
    anchors[ai] = anchor as unknown as BodyAnchor;
    metrics[mi] = { ...metrics[mi], anchors };
    this._emit({ ...this._config, metrics });
  }

  private _addAnchor(mi: number): void {
    if (!this._config) return;
    const metrics = [...this._config.metrics];
    const anchors = [...(metrics[mi].anchors ?? []), { entity: '', x: 50, y: 40 }];
    metrics[mi] = { ...metrics[mi], anchors };
    this._emit({ ...this._config, metrics });
  }

  private _removeAnchor(mi: number, ai: number): void {
    if (!this._config) return;
    const metrics = [...this._config.metrics];
    const anchors = (metrics[mi].anchors ?? []).filter((_, i) => i !== ai);
    metrics[mi] = { ...metrics[mi], anchors };
    this._emit({ ...this._config, metrics });
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
      border-radius: 12px;
      overflow: hidden;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;
    }
    .metric:hover {
      border-color: color-mix(in srgb, var(--primary-color) 50%, var(--divider-color));
    }
    .metric.open {
      border-color: var(--primary-color);
      box-shadow: 0 2px 12px color-mix(in srgb, var(--primary-color) 12%, transparent);
    }
    .metric-head {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      cursor: pointer;
      color: var(--primary-text-color);
    }
    .chip {
      width: 30px;
      height: 30px;
      flex: none;
      border-radius: 9px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--c, var(--primary-color));
      background: color-mix(in srgb, var(--c, var(--primary-color)) 15%, transparent);
    }
    .chip ha-icon {
      --mdc-icon-size: 17px;
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
    .tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      margin-bottom: 14px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--divider-color);
    }
    .tab {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 6px 11px;
      border: none;
      border-radius: 999px;
      background: none;
      cursor: pointer;
      color: var(--secondary-text-color);
      font-size: 12px;
      font-weight: 500;
      font-family: inherit;
    }
    .tab ha-icon {
      --mdc-icon-size: 15px;
    }
    .tab:hover {
      background: color-mix(in srgb, var(--primary-text-color) 6%, transparent);
    }
    .tab.active {
      background: color-mix(in srgb, var(--primary-color) 14%, transparent);
      color: var(--primary-color);
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
    .add.small {
      margin-top: 8px;
      padding: 6px 12px;
      font-size: 13px;
    }
    .anchor-editor {
      margin-top: 14px;
      padding-top: 12px;
      border-top: 1px solid var(--divider-color);
    }
    .anchor-editor-title {
      font-weight: 500;
      font-size: 14px;
      margin-bottom: 8px;
      color: var(--primary-text-color);
    }
    .anchor-row {
      display: flex;
      align-items: flex-start;
      gap: 6px;
      padding: 8px;
      margin-bottom: 8px;
      border: 1px solid var(--divider-color);
      border-radius: 10px;
    }
    .anchor-row ha-form {
      flex: 1;
      min-width: 0;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'health-card-editor': HealthCardEditor;
  }
}
