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
  | 'custom';

export type GraphType = 'line' | 'bar' | 'progress' | 'none';
export type Aggregate = 'mean' | 'min' | 'max' | 'last' | 'sum';
export type TrendMode = 'up_good' | 'down_good' | 'neutral' | 'none';

export interface SeriesConfig {
  entity: string;
  name?: string;
  color?: string;
  unit?: string;
  goal?: number;
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
  goal?: number;
  precision?: number;
  aggregate?: Aggregate;
  trend?: TrendMode;
  /** Format the value as a duration ("7 h 12 min") */
  duration?: boolean;
  /** Read this attribute instead of the state */
  attribute?: string;
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
  metrics: MetricConfig[];
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}
