import type { Aggregate, HomeAssistant } from './types';

export interface HistoryPoint {
  /** epoch millis */
  t: number;
  v: number;
}

export type HistoryMap = Record<string, HistoryPoint[]>;

interface WsHistoryState {
  s: string;
  lu: number;
}

/**
 * Fetches recorder history for the given entities via the websocket API.
 * Returns numeric points only; non-numeric states are dropped.
 */
export async function fetchHistory(
  hass: HomeAssistant,
  entityIds: string[],
  days: number
): Promise<HistoryMap> {
  if (!entityIds.length) return {};
  const end = new Date();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (days - 1));

  const resp = await hass.callWS<Record<string, WsHistoryState[]>>({
    type: 'history/history_during_period',
    start_time: start.toISOString(),
    end_time: end.toISOString(),
    entity_ids: entityIds,
    minimal_response: true,
    no_attributes: true,
  });

  const out: HistoryMap = {};
  for (const id of entityIds) {
    out[id] = (resp?.[id] ?? [])
      .map((p) => ({ t: p.lu * 1000, v: parseFloat(p.s) }))
      .filter((p) => Number.isFinite(p.v));
  }
  return out;
}

/**
 * Buckets history points into one value per day (last `days` days incl. today).
 * Days without data are NaN.
 */
export function bucketDaily(
  points: HistoryPoint[],
  days: number,
  aggregate: Aggregate
): number[] {
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  const windowStart = dayStart.getTime() - (days - 1) * 86400000;

  const buckets: number[][] = Array.from({ length: days }, () => []);
  for (const p of points) {
    const idx = Math.floor((p.t - windowStart) / 86400000);
    if (idx >= 0 && idx < days) buckets[idx].push(p.v);
  }

  return buckets.map((vals) => {
    if (!vals.length) return NaN;
    switch (aggregate) {
      case 'min':
        return Math.min(...vals);
      case 'max':
        return Math.max(...vals);
      case 'sum':
        return vals.reduce((a, b) => a + b, 0);
      case 'last':
        return vals[vals.length - 1];
      default:
        return vals.reduce((a, b) => a + b, 0) / vals.length;
    }
  });
}

export interface StatsRow {
  /** bucket start, epoch millis */
  start: number;
  mean: number | null;
  min: number | null;
  max: number | null;
  state: number | null;
  sum: number | null;
}

export type StatsMap = Record<string, StatsRow[]>;

/**
 * Fetches daily long-term statistics — unlike recorder history these survive
 * the purge window, so month/year ranges keep working.
 */
export async function fetchStats(
  hass: HomeAssistant,
  entityIds: string[],
  days: number
): Promise<StatsMap> {
  if (!entityIds.length) return {};
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - (days - 1));

  const resp = await hass.callWS<Record<string, Record<string, unknown>[]>>({
    type: 'recorder/statistics_during_period',
    start_time: start.toISOString(),
    end_time: new Date().toISOString(),
    statistic_ids: entityIds,
    period: 'day',
    types: ['mean', 'min', 'max', 'state', 'sum'],
  });

  const num = (x: unknown): number | null =>
    typeof x === 'number' && Number.isFinite(x) ? x : null;
  const out: StatsMap = {};
  for (const id of entityIds) {
    out[id] = (resp?.[id] ?? []).map((r) => ({
      start:
        typeof r.start === 'number' ? r.start : new Date(r.start as string).getTime(),
      mean: num(r.mean),
      min: num(r.min),
      max: num(r.max),
      state: num(r.state),
      sum: num(r.sum),
    }));
  }
  return out;
}

/** Maps daily statistics rows onto the same day buckets bucketDaily produces. */
export function bucketsFromStats(
  rows: StatsRow[],
  days: number,
  aggregate: Aggregate
): number[] {
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);
  const windowStart = dayStart.getTime() - (days - 1) * 86400000;
  const out: number[] = new Array(days).fill(NaN);
  for (const r of rows) {
    const idx = Math.floor((r.start - windowStart) / 86400000);
    if (idx < 0 || idx >= days) continue;
    const v =
      aggregate === 'min'
        ? r.min
        : aggregate === 'max' || aggregate === 'sum'
          ? (r.max ?? r.mean)
          : aggregate === 'last'
            ? (r.state ?? r.mean)
            : r.mean;
    if (v !== null) out[idx] = v;
  }
  return out;
}

/** Forward- and back-fills NaN gaps so line charts stay continuous. */
export function fillGaps(values: number[]): number[] {
  const out = [...values];
  let last = NaN;
  for (let i = 0; i < out.length; i++) {
    if (Number.isFinite(out[i])) last = out[i];
    else out[i] = last;
  }
  let next = NaN;
  for (let i = out.length - 1; i >= 0; i--) {
    if (Number.isFinite(out[i])) next = out[i];
    else out[i] = next;
  }
  return out;
}

/** First → last change across the (filled) values; NaN when not computable. */
export function trendDelta(values: number[]): number {
  const finite = values.filter(Number.isFinite);
  if (finite.length < 2) return NaN;
  return finite[finite.length - 1] - finite[0];
}
