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
  /** Navigation path or URL for tap_action: link */
  link?: string;
  /** Score metrics: maximum value (default 100) */
  max?: number;
  /** Sleep metrics: phase entities for the stage breakdown */
  phases?: SleepPhases;
  /**
   * Optional score entity (0-100, e.g. Withings sleep score): shown as a
   * traffic-light badge on the tile; sleep popups add a calendar heatmap.
   */
  score_entity?: string;
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
