import { html, nothing, svg } from 'lit';
import type { TemplateResult } from 'lit';

export interface LineSeries {
  values: number[];
  color: string;
}

export interface ChartOpts {
  /** viewBox width (default 220) */
  w?: number;
  /** viewBox height (default 60) */
  h?: number;
  /** draw ring dots on line charts (default true) */
  dots?: boolean;
}

const W = 220;
const H = 60;
const PAD = 7;

function scale(all: number[]): { lo: number; hi: number } {
  const finite = all.filter(Number.isFinite);
  const min = Math.min(...finite);
  const max = Math.max(...finite);
  const range = max - min || Math.abs(max) * 0.1 || 1;
  return { lo: min - range * 0.18, hi: max + range * 0.18 };
}

/**
 * Withings-style smoothed sparkline with ring dots on each day.
 * Supports multiple series sharing one y-scale.
 */
export function lineChart(
  seriesList: LineSeries[],
  opts: ChartOpts = {}
): TemplateResult | typeof nothing {
  const w = opts.w ?? W;
  const h = opts.h ?? H;
  const showDots = opts.dots ?? true;
  const drawable = seriesList.filter((s) => s.values.some(Number.isFinite));
  if (!drawable.length) return nothing;
  const { lo, hi } = scale(drawable.flatMap((s) => s.values));
  const n = Math.max(...drawable.map((s) => s.values.length));
  const x = (i: number) => PAD + (i * (w - 2 * PAD)) / Math.max(n - 1, 1);
  const y = (v: number) => h - PAD - ((v - lo) / (hi - lo)) * (h - 2 * PAD);

  const parts = drawable.map((s) => {
    const pts = s.values
      .map((v, i) => ({ x: x(i), y: y(v), ok: Number.isFinite(v) }))
      .filter((p) => p.ok);
    if (!pts.length) return nothing;
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const cx = (pts[i - 1].x + pts[i].x) / 2;
      d += ` C ${cx} ${pts[i - 1].y}, ${cx} ${pts[i].y}, ${pts[i].x} ${pts[i].y}`;
    }
    return svg`
      <path d=${d} fill="none" stroke=${s.color} stroke-width="2.2"
        stroke-linecap="round" stroke-linejoin="round"/>
      ${
        showDots
          ? pts.map(
              (p) => svg`<circle cx=${p.x} cy=${p.y} r="3.1" fill="var(--hc-dot-fill)"
                stroke=${s.color} stroke-width="2"/>`
            )
          : nothing
      }
    `;
  });

  return html`<svg class="chart" viewBox="0 0 ${w} ${h}" aria-hidden="true">${parts}</svg>`;
}

/** Rounded daily bars with an optional dashed goal line. */
export function barChart(
  values: number[],
  color: string,
  goal?: number,
  opts: ChartOpts = {}
): TemplateResult | typeof nothing {
  const w = opts.w ?? W;
  const h = opts.h ?? H;
  if (!values.some((v) => Number.isFinite(v) && v > 0)) return nothing;
  const vals = values.map((v) => (Number.isFinite(v) && v > 0 ? v : 0));
  const max = Math.max(...vals, goal ?? 0) || 1;
  const n = vals.length;
  const slot = (w - 2 * PAD) / n;
  const bw = Math.min(slot * 0.55, 14);
  const y = (v: number) => (v / max) * (h - 2 * PAD);

  const bars = vals.map((v, i) => {
    const bh = Math.max(y(v), v > 0 ? 3 : 1.5);
    const bx = PAD + i * slot + (slot - bw) / 2;
    return svg`<rect x=${bx} y=${h - PAD - bh} width=${bw} height=${bh}
      rx=${Math.min(bw / 2, 4)} fill=${color} opacity=${v > 0 ? 1 : 0.25}/>`;
  });

  const goalLine = Number.isFinite(goal as number)
    ? svg`<line x1=${PAD} x2=${w - PAD} y1=${h - PAD - y(goal!)} y2=${h - PAD - y(goal!)}
        stroke=${color} stroke-width="1" stroke-dasharray="3 3" opacity="0.5"/>`
    : nothing;

  return html`<svg class="chart" viewBox="0 0 ${w} ${h}" aria-hidden="true">
    ${goalLine}${bars}
  </svg>`;
}

const SCORE_PALETTE = [
  'var(--amber-color, #FFC107)',
  'var(--purple-color, #9C27B0)',
  'var(--pink-color, #E91E63)',
];
const NEUTRAL_DOT = 'color-mix(in srgb, var(--primary-text-color) 16%, transparent)';

/**
 * Withings-style confetti dot ring. The share of colored dots (clockwise from
 * the top) reflects the score ratio; the center glow takes the score color.
 */
export function scoreRing(scoreColor: string, ratio: number): TemplateResult {
  const rnd = (i: number) => Math.abs((Math.sin(i * 127.1) * 43758.5453) % 1);
  const dots = [];
  for (let ring = 0; ring < 2; ring++) {
    const base = ring === 0 ? 74 : 88;
    const count = ring === 0 ? 26 : 32;
    for (let i = 0; i < count; i++) {
      const frac = i / count;
      const a = frac * Math.PI * 2 - Math.PI / 2 + rnd(i + ring * 100) * 0.12;
      const r = base + (rnd(i * 3 + ring * 7) - 0.5) * 6;
      const size = 2.4 + rnd(i * 7 + ring * 13) * 2.4;
      const color =
        frac < ratio
          ? SCORE_PALETTE[Math.floor(rnd(i * 11 + ring * 29) * SCORE_PALETTE.length)]
          : NEUTRAL_DOT;
      dots.push(
        svg`<circle cx=${100 + Math.cos(a) * r} cy=${100 + Math.sin(a) * r}
          r=${size} fill=${color} opacity="0.75"/>`
      );
    }
  }
  return html`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="62" fill="color-mix(in srgb, ${scoreColor} 10%, transparent)" />
    ${dots}
  </svg>`;
}

/** Clean progress ring (default, glass, bubble, mirror score variants). */
export function scoreArc(color: string, ratio: number, width = 10): TemplateResult {
  const R = 82;
  const C = 2 * Math.PI * R;
  return html`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r=${R} fill="none" stroke=${color} opacity="0.16"
      stroke-width=${width}/>
    <circle cx="100" cy="100" r=${R} fill="none" stroke=${color} stroke-width=${width}
      stroke-linecap="round" stroke-dasharray="${C * Math.max(ratio, 0.02)} ${C}"
      transform="rotate(-90 100 100)"/>
  </svg>`;
}

/** Material You: scalloped tonal blob with an outer progress arc. */
export function scoreScallop(
  accent: string,
  scoreColor: string,
  ratio: number
): TemplateResult {
  const pts: string[] = [];
  const N = 144;
  for (let i = 0; i <= N; i++) {
    const th = (i / N) * 2 * Math.PI;
    const r = 72 + 7 * Math.cos(12 * th);
    pts.push(
      `${i ? 'L' : 'M'} ${(100 + Math.cos(th) * r).toFixed(1)} ${(100 + Math.sin(th) * r).toFixed(1)}`
    );
  }
  const R = 92;
  const C = 2 * Math.PI * R;
  return html`<svg class="scorering" viewBox="0 0 200 200" aria-hidden="true">
    <path d="${pts.join(' ')} Z" fill="color-mix(in srgb, ${accent} 22%, transparent)"/>
    <circle cx="100" cy="100" r=${R} fill="none" stroke=${scoreColor} opacity="0.18"
      stroke-width="5"/>
    <circle cx="100" cy="100" r=${R} fill="none" stroke=${scoreColor} stroke-width="5"
      stroke-linecap="round" stroke-dasharray="${C * Math.max(ratio, 0.02)} ${C}"
      transform="rotate(-90 100 100)"/>
  </svg>`;
}

/** Picks the score graphic matching the active card style. */
export function scoreGraphic(
  variant: string,
  accent: string,
  scoreColor: string,
  ratio: number
): TemplateResult {
  if (variant === 'material') return scoreScallop(accent, scoreColor, ratio);
  if (variant === 'bubble') return scoreArc(scoreColor, ratio, 15);
  if (variant === 'mirror') return scoreArc('#fff', ratio, 7);
  if (variant === 'default' || variant === 'glass') return scoreArc(scoreColor, ratio, 10);
  return scoreRing(scoreColor, ratio);
}
