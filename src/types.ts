export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  language: string;
  locale?: { language: string };
  callWS<T>(msg: Record<string, unknown>): Promise<T>;
}

export type MetricType =
  | 'weight'
  | 'heart_rate'
  | 'blood_pressure'
  | 'temperature'
  | 'body_composition'
  | 'steps'
  | 'workout'
  | 'calories'
  | 'nutrition'
  | 'water'
  | 'sleep'
  | 'score'
  | 'toothbrush'
  | 'body'
  | 'cycle'
  | 'custom';

export type GraphType = 'line' | 'bar' | 'progress' | 'none';
export type Aggregate = 'mean' | 'min' | 'max' | 'last' | 'sum';
export type TrendMode = 'up_good' | 'down_good' | 'neutral' | 'none';
/** atleast: goal reached at/above the value (steps); atmost: at/below (target weight) */
export type GoalType = 'atleast' | 'atmost';
/** popup = built-in detail popup, more-info = native HA dialog */
export type TapAction = 'popup' | 'more-info' | 'link' | 'none';
export type CardStyle =
  | 'default'
  | 'withings'
  | 'glass'
  | 'material'
  | 'bubble'
  | 'mirror';

export interface SleepPhases {
  deep?: string;
  light?: string;
  rem?: string;
  awake?: string;
}

export type BodyAnchorPosition =
  | 'head'
  | 'chest'
  | 'arm-left'
  | 'arm-right'
  | 'belly'
  | 'legs';

/** Value label pinned to a spot on the body figure */
export interface BodyAnchor {
  entity: string;
  /** second entity, e.g. diastolic — arm anchors with entity2 render a cuff */
  entity2?: string;
  name?: string;
  color?: string;
  position?: BodyAnchorPosition;
  /** free placement (percent of the figure area), overrides position */
  x?: number;
  y?: number;
  /** put the label on the opposite side of the dot */
  flip?: boolean;
  /** where the dot sits relative to the label (8-way); overrides flip/side */
  dot?:
    | 'left'
    | 'right'
    | 'top'
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-right';
}

export interface SeriesConfig {
  entity: string;
  name?: string;
  color?: string;
  unit?: string;
  /** Target: a number or an entity id */
  goal?: number | string;
}

export interface MetricConfig {
  type?: MetricType;
  /** Primary entity (shorthand for a single series) */
  entity?: string;
  /** Second entity, e.g. diastolic blood pressure */
  entity2?: string;
  /** Multiple series (body composition, macros, ...) */
  entities?: (string | SeriesConfig)[];
  /** Extra entities shown as "10,04 km • 621 kcal" below the value */
  secondary?: string[];
  name?: string;
  /** Big text shown instead of the value (e.g. "Fettabbau") */
  label?: string;
  icon?: string;
  color?: string;
  unit?: string;
  days?: number;
  graph?: GraphType;
  /** Target: a number or an entity id (e.g. sensor.zielgewicht) */
  goal?: number | string;
  /**
   * Starting value (number or entity id). When set, the goal percentage is
   * the progress from start to goal: (start - value) / (start - goal).
   */
  start?: number | string;
  /** Goal direction: atleast (default) or atmost (e.g. losing weight) */
  goal_type?: GoalType;
  precision?: number;
  aggregate?: Aggregate;
  trend?: TrendMode;
  /** Format the value as a duration ("7 h 12 min") */
  duration?: boolean;
  /** Read this attribute instead of the state */
  attribute?: string;
  /** What a tap on the tile does (default: popup = more-info) */
  tap_action?: TapAction;
  /** Show the popup details (periods, big chart, stats) inline on the tile */
  expanded?: boolean;
  /** Navigation path or URL for tap_action: link */
  link?: string;
  /** Score metrics: maximum value (default 100) */
  max?: number;
  /** Sleep metrics: phase entities for the stage breakdown */
  phases?: SleepPhases;
  /**
   * Optional score entity (0-100, e.g. Withings sleep score): shown as a
   * traffic-light badge on the tile; sleep popups add a calendar heatmap.
   * On body metrics it drives the background energy glow.
   */
  score_entity?: string;
  /**
   * Score metrics: sub-goal categories (e.g. activity/body/heart). The ring
   * dots / arc segments take the category colors proportionally.
   */
  breakdown?: (string | SeriesConfig)[];
  /** Body metrics: silhouette build (default female) */
  gender?: 'female' | 'male';
  /** Body metrics: sleep score entity (0-100) — low values draw eye shadows */
  sleep_entity?: string;
  /** Body metrics: sleep score below which eye shadows appear (default 60) */
  tired_below?: number;
  /** Body metrics: eye-shadow position (percent of figure area) */
  tired_x?: number;
  tired_y?: number;
  /** Body metrics: body temperature entity — fever tints head and chest */
  temperature_entity?: string;
  /** Body metrics: temperature that counts as fever (default 37.8) */
  fever_from?: number;
  /** Body metrics: fever glow position (percent of figure area) */
  fever_x?: number;
  fever_y?: number;
  /** Body metrics: force-show fever + eye shadows for placement/preview */
  preview_effects?: boolean;
  /** Body metrics: fade the bottom edge of the figure (default true) */
  fade_figure?: boolean;
  /** Body metrics: over how many px at the bottom of the figure frame the
   *  figure fades out to transparent (a mask, theme-proof; default 200;
   *  150 in the upper-body crop) */
  fade_height?: number;
  /** Body metrics: show the whole figure or only head + torso */
  body_crop?: 'full' | 'upper';
  /** Body metrics: zoom factor for the figure (default 1) */
  figure_zoom?: number;
  /** Body metrics: vertical nudge of the figure in percent (negative = up) */
  figure_offset_y?: number;
  /** Body metrics: horizontal nudge of the figure in percent (negative = left) */
  figure_offset_x?: number;
  /** Body metrics: value labels pinned to body parts */
  anchors?: BodyAnchor[];
  /** Body metrics: label chip background opacity (0-1, default 1) */
  label_opacity?: number;
  /** Body metrics: label text-size multiplier (default 1) */
  label_size?: number;
  /** Body metrics: which bundled figure set to render (default mannequin) */
  figure_style?: 'flat' | 'glass' | 'mannequin' | 'pixar';
  /** Override where the bundled figure images are served from (trailing /) */
  figure_base?: string;
  /**
   * Body metrics: use your own rendered figures instead of the built-in SVG.
   * The card picks slim/regular/full by weight vs goal; energy glow, fever
   * overlay and anchors keep working on top of the image.
   */
  images?: { slim?: string; regular?: string; full?: string };
  /**
   * Body images on black backgrounds (e.g. AI renderings): turns luminance
   * into alpha so black becomes transparent — works on light and dark themes.
   */
  image_remove_black?: boolean;

  /** Cycle metrics: total cycle length in days (default 28) */
  cycle_length?: number;
  /** Cycle metrics: period (menstruation) length in days (default 5) */
  period_length?: number;
  /** Cycle metrics: day of ovulation (default cycle_length − 14) */
  ovulation_day?: number;
  /** Cycle metrics: text sensor for the phase name (overrides the computed one) */
  phase_entity?: string;
}

export interface HealthCardConfig {
  type: string;
  title?: string;
  subtitle?: string;
  /** Default history window in days for all metrics */
  days?: number;
  /** Grid columns for the metric tiles (1-3) */
  columns?: number;
  /** Render metrics as tinted tiles (default) or flat rows */
  tiles?: boolean;
  /** grid (default) or carousel: horizontally scrollable tiles */
  layout?: 'grid' | 'carousel';
  /** Visual style: default (plain HA), withings (default), glass, material, bubble, mirror */
  card_style?: CardStyle;
  /** false: remove the ha-card background/shadow (for use inside containers) */
  background?: boolean;
  /** true: no outer padding, tiles run edge to edge */
  flush?: boolean;
  metrics: MetricConfig[];
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}
