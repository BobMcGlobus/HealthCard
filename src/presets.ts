import type { Aggregate, GoalType, GraphType, MetricType, TrendMode } from './types';

export interface MetricPreset {
  icon: string;
  color: string;
  graph: GraphType;
  unit?: string;
  aggregate: Aggregate;
  trend: TrendMode;
  duration?: boolean;
  precision?: number;
  goalType?: GoalType;
}

/**
 * Theme-aware named colors: uses the HA theme color variables
 * (--red-color etc., themeable since HA 2022.12) with material fallbacks.
 */
const NAMED_COLORS: Record<string, string> = {
  red: '#F44336',
  pink: '#E91E63',
  purple: '#9C27B0',
  'deep-purple': '#673AB7',
  indigo: '#3F51B5',
  blue: '#2196F3',
  'light-blue': '#03A9F4',
  cyan: '#00BCD4',
  teal: '#009688',
  green: '#4CAF50',
  'light-green': '#8BC34A',
  lime: '#CDDC39',
  yellow: '#FFEB3B',
  amber: '#FFC107',
  orange: '#FF9800',
  'deep-orange': '#FF5722',
  brown: '#795548',
  grey: '#9E9E9E',
  'blue-grey': '#607D8B',
};

export const COLOR_NAMES = Object.keys(NAMED_COLORS);

export function resolveColor(color?: string): string | undefined {
  if (!color) return undefined;
  if (color === 'primary') return 'var(--primary-color)';
  if (color === 'accent') return 'var(--accent-color)';
  if (NAMED_COLORS[color]) return `var(--${color}-color, ${NAMED_COLORS[color]})`;
  return color;
}

export const PRESETS: Record<MetricType, MetricPreset> = {
  weight: {
    icon: 'mdi:scale-bathroom',
    color: 'indigo',
    graph: 'line',
    aggregate: 'mean',
    trend: 'down_good',
    precision: 1,
    goalType: 'atmost',
  },
  heart_rate: {
    icon: 'mdi:heart-pulse',
    color: 'red',
    graph: 'line',
    unit: 'bpm',
    aggregate: 'mean',
    trend: 'neutral',
    precision: 0,
  },
  blood_pressure: {
    icon: 'mdi:heart-cog',
    color: 'pink',
    graph: 'line',
    unit: 'mmHg',
    aggregate: 'mean',
    trend: 'neutral',
    precision: 0,
  },
  temperature: {
    icon: 'mdi:thermometer',
    color: 'amber',
    graph: 'line',
    unit: '°C',
    aggregate: 'mean',
    trend: 'neutral',
    precision: 1,
  },
  body_composition: {
    icon: 'mdi:human',
    color: 'purple',
    graph: 'line',
    unit: '%',
    aggregate: 'mean',
    trend: 'neutral',
    precision: 1,
  },
  steps: {
    icon: 'mdi:walk',
    color: 'orange',
    graph: 'bar',
    aggregate: 'max',
    trend: 'up_good',
    precision: 0,
  },
  workout: {
    icon: 'mdi:run',
    color: 'deep-orange',
    graph: 'bar',
    unit: 'min',
    aggregate: 'max',
    trend: 'up_good',
    precision: 0,
  },
  calories: {
    icon: 'mdi:fire',
    color: 'deep-orange',
    graph: 'progress',
    unit: 'kcal',
    aggregate: 'max',
    trend: 'neutral',
    precision: 0,
  },
  nutrition: {
    icon: 'mdi:food-apple',
    color: 'green',
    graph: 'progress',
    aggregate: 'max',
    trend: 'neutral',
    precision: 0,
  },
  water: {
    icon: 'mdi:cup-water',
    color: 'light-blue',
    graph: 'progress',
    unit: 'ml',
    aggregate: 'max',
    trend: 'up_good',
    precision: 0,
  },
  sleep: {
    icon: 'mdi:sleep',
    color: 'deep-purple',
    graph: 'bar',
    aggregate: 'max',
    trend: 'up_good',
    duration: true,
    precision: 1,
  },
  score: {
    icon: 'mdi:heart-flash',
    color: 'amber',
    graph: 'none',
    aggregate: 'mean',
    trend: 'up_good',
    precision: 0,
  },
  toothbrush: {
    icon: 'mdi:toothbrush-electric',
    color: 'cyan',
    graph: 'bar',
    aggregate: 'max',
    trend: 'up_good',
    duration: true,
    precision: 0,
  },
  body: {
    icon: 'mdi:human',
    color: 'indigo',
    graph: 'none',
    aggregate: 'mean',
    trend: 'down_good',
    precision: 1,
    goalType: 'atmost',
  },
  custom: {
    icon: 'mdi:chart-line',
    color: 'primary',
    graph: 'line',
    aggregate: 'mean',
    trend: 'neutral',
  },
};

/** Withings-like category colors for score breakdowns (activity/body/heart …) */
export const BREAKDOWN_PALETTE = ['amber', 'indigo', 'pink', 'teal', 'purple'];

/** Default colors for additional series in multi-series metrics */
export const SERIES_PALETTE = ['teal', 'orange', 'pink', 'cyan', 'lime'];
