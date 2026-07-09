import type { HomeAssistant } from './types';
import { lang, t } from './i18n';

export function fmtNumber(
  hass: HomeAssistant | undefined,
  value: number,
  precision?: number
): string {
  if (!Number.isFinite(value)) return '–';
  const locale = lang(hass) === 'de' ? 'de-DE' : 'en-US';
  if (precision === undefined) {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value);
  }
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  }).format(value);
}

/** "92 g" but "85,1%" / "36,6°C" — no space before %, °, ' and " */
export function joinUnit(value: string, unit?: string): string {
  if (!unit) return value;
  return /^[%°'"]/.test(unit) ? `${value}${unit}` : `${value} ${unit}`;
}

/**
 * Formats a duration value as "7 h 12 min".
 * The source unit is taken from the entity ("min", "h", "s"); defaults to minutes.
 */
export function fmtDuration(value: number, unit?: string): string {
  if (!Number.isFinite(value)) return '–';
  let minutes: number;
  const u = (unit ?? 'min').toLowerCase();
  if (u.startsWith('h')) minutes = value * 60;
  else if (u === 's' || u.startsWith('sec')) minutes = value / 60;
  else minutes = value;
  const totalSec = Math.round(minutes * 60);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return m ? `${h} h ${m} min` : `${h} h`;
  // short durations (tooth brushing etc.): keep the seconds
  if (m > 0) return s && m < 10 ? `${m} min ${s} s` : `${m} min`;
  return `${s} s`;
}

/** "7:42" if today, "Gestern" if yesterday, otherwise a short date. */
export function fmtLastUpdated(hass: HomeAssistant | undefined, iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const locale = lang(hass) === 'de' ? 'de-DE' : 'en-US';
  const today = new Date();
  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
  if (sameDay(d, today)) {
    return d.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' });
  }
  const yesterday = new Date(today.getTime() - 86400000);
  if (sameDay(d, yesterday)) return t(hass, 'yesterday');
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
}
