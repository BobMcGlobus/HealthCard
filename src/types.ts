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
  /** Body metrics: sleep score entity — low values draw eye shadows */
  sleep_entity?: string;
  /** Body metrics: body temperature entity — fever tints head and chest */
  temperature_entity?: string;
  /** Body metrics: temperature that counts as fever (default 37.8) */
  fever_from?: number;
  /** Body metrics: value labels pinned to body parts */
  anchors?: BodyAnchor[];
  /**
   * Body metrics: use a bundled rendered figure set instead of the SVG.
   * 'svg' (default) draws the built-in silhouette.
   */
  figure_style?: 'svg' | 'flat' | 'glass' | 'mannequin' | 'pixar';
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
