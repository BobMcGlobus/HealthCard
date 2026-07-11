import { html, svg, nothing } from 'lit';
import type { TemplateResult } from 'lit';

export interface BodyOpts {
  gender: 'female' | 'male';
  /** body morph: -0.35 (slim) .. 1.1 (heavy), 0 = at goal weight */
  shape: number;
  /** 0..1 — dark rings under the eyes (sleep deficit) */
  tired: number;
  /** 0..1 — reddish glow on head and chest (fever) */
  fever: number;
  /** 0..1 — background energy glow intensity */
  glow: number;
  /** CSS color for the energy glow */
  glowColor: string;
  /** draw a blood-pressure cuff on this upper arm */
  cuff?: 'left' | 'right';
}

type Pt = [number, number];

/**
 * Hand-tuned half-width measurements for the silhouette. Instead of freely
 * extrapolating one shape (which quickly looks distorted), the figure blends
 * between curated presets: slim / regular / full per build.
 */
interface ShapeParams {
  shoulder: number;
  arm: number;
  hand: number;
  waist: number;
  belly: number;
  hip: number;
  knee: number;
  ankle: number;
}

const SHAPES: Record<'female' | 'male', ShapeParams[]> = {
  // [slim, regular, full]
  female: [
    { shoulder: 22, arm: 30, hand: 28, waist: 17, belly: 18, hip: 28, knee: 11, ankle: 7 },
    { shoulder: 24, arm: 33, hand: 31, waist: 21, belly: 22, hip: 32, knee: 13, ankle: 8 },
    { shoulder: 28, arm: 41, hand: 38, waist: 32, belly: 35, hip: 40, knee: 17, ankle: 10 },
  ],
  male: [
    { shoulder: 27, arm: 34, hand: 31, waist: 19, belly: 19, hip: 24, knee: 12, ankle: 8 },
    { shoulder: 30, arm: 38, hand: 34, waist: 24, belly: 25, hip: 27, knee: 14, ankle: 9 },
    { shoulder: 34, arm: 46, hand: 42, waist: 36, belly: 40, hip: 35, knee: 18, ankle: 11 },
  ],
};

function lerpParams(a: ShapeParams, b: ShapeParams, t: number): ShapeParams {
  const out = {} as ShapeParams;
  for (const k of Object.keys(a) as (keyof ShapeParams)[]) {
    out[k] = a[k] + (b[k] - a[k]) * t;
  }
  return out;
}

/** Catmull-Rom → cubic bezier, closed loop */
function smoothClosed(pts: Pt[]): string {
  const n = pts.length;
  const p = (i: number) => pts[((i % n) + n) % n];
  let d = `M ${p(0)[0].toFixed(1)} ${p(0)[1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = p(i - 1);
    const p1 = p(i);
    const p2 = p(i + 1);
    const p3 = p(i + 2);
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${c1[0].toFixed(1)} ${c1[1].toFixed(1)}, ${c2[0].toFixed(1)} ${c2[1].toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d} Z`;
}

/**
 * One continuous, softly abstracted silhouette (head to feet, arms resting
 * against the body) — friendly animation-style proportions, no anatomical
 * detail. Colors/gradient come from CSS variables so every card style can
 * restyle the figure; fever, eye shadows and the cuff are overlays.
 */
export function bodyFigure(o: BodyOpts): TemplateResult {
  const s = Math.max(-0.35, Math.min(o.shape, 1.1));
  const presets = SHAPES[o.gender];
  // blend between neighbouring curated presets, never extrapolate
  const p =
    s <= 0
      ? lerpParams(presets[1], presets[0], Math.min(-s / 0.35, 1))
      : lerpParams(presets[1], presets[2], Math.min(s / 0.85, 1));

  const sh = p.shoulder;
  // Built with the flexing arm on the right, then mirrored so it ends up on
  // the viewer's LEFT — matching the rendered figure images. The resting arm
  // (with the BP cuff) is therefore on the viewer's right.
  const pts: Pt[] = [
    // head + neck (right side)
    [100, 10],
    [112, 14],
    [116.5, 29],
    [111, 43],
    [105.5, 51],
    [105, 60], // neck notch
    // trapezius + marked shoulder; the flexed arm is drawn as an overlay,
    // keeping the silhouette path free of self-intersections
    [100 + sh * 0.55, 66],
    [100 + sh + 4, 78], // round shoulder cap
    [100 + p.waist + 6, 106],
    [100 + p.waist + 1, 130],
    [100 + p.waist, 152], // free waist on the flexing side
    [100 + p.belly + 2, 180],
    [100 + p.hip, 200],
    // right leg
    [100 + p.hip - 2, 228],
    [100 + p.knee + 3, 262],
    [100 + p.ankle + 3, 298],
    [100 + p.ankle + 8, 313],
    [103, 316],
    [103, 290],
    [103.5, 258],
    [102, 230],
    [100, 220], // crotch
    // left leg (mirrored)
    [98, 230],
    [96.5, 258],
    [97, 290],
    [97, 316],
    [100 - p.ankle - 8, 313],
    [100 - p.ankle - 3, 298],
    [100 - p.knee - 3, 262],
    [100 - p.hip + 2, 228],
    [100 - p.hip, 200],
    // left side with resting arm (hand, waist notch)
    [100 - p.belly - 3, 182],
    [100 - p.waist - 4, 170],
    [100 - p.hand + 2, 176],
    [100 - p.hand - 1, 155],
    [100 - p.arm, 120],
    [100 - sh - 5, 80],
    [100 - sh * 0.55, 66],
    // neck + head (left side)
    [95, 60],
    [94.5, 51],
    [89, 43],
    [83.5, 29],
    [88, 14],
  ];
  const mir = (pt: Pt): Pt => [200 - pt[0], pt[1]];
  const outline = smoothClosed(pts.map(mir));

  // flexed arm overlay: shoulder → elbow → raised fist, drawn as a stroked
  // polyline with round caps/joins so it can never self-intersect. Built on
  // the right, then mirrored to the left with the rest of the figure.
  const armW = 12 + s * 3;
  const armPts: Pt[] = [
    [100 + sh - 6, 80], // shoulder
    [100 + sh + 20, 92], // elbow, out to the side
    [100 + sh + 13, 50], // raised fist
  ];
  const armPath = armPts
    .map(mir)
    .map((pt, i) => `${i ? 'L' : 'M'} ${pt[0].toFixed(1)} ${pt[1].toFixed(1)}`)
    .join(' ');

  // the cuff sits on the resting (viewer-right after mirroring) upper arm
  const cuffX = 100 + (sh + 7);
  const cuffAngle = 14;

  return html`<svg class="bodyfig" viewBox="0 0 200 330" aria-hidden="true">
    <defs>
      <linearGradient id="hc-body-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" style="stop-color: var(--hc-body-top)" />
        <stop offset="100%" style="stop-color: var(--hc-body-bottom)" />
      </linearGradient>
      <radialGradient id="hc-body-glow">
        <stop offset="0%" style="stop-color:${o.glowColor}" stop-opacity="0.5" />
        <stop offset="70%" style="stop-color:${o.glowColor}" stop-opacity="0.12" />
        <stop offset="100%" style="stop-color:${o.glowColor}" stop-opacity="0" />
      </radialGradient>
      <radialGradient id="hc-fever-glow">
        <stop offset="0%" style="stop-color:var(--error-color, #e53935)" stop-opacity="0.5" />
        <stop offset="100%" style="stop-color:var(--error-color, #e53935)" stop-opacity="0" />
      </radialGradient>
    </defs>

    ${o.glow > 0
      ? svg`<ellipse cx="100" cy="165" rx="96" ry="150"
          fill="url(#hc-body-glow)" opacity=${o.glow}/>`
      : nothing}

    <g class="bodyshape">
      <path class="solid" fill="url(#hc-body-fill)" d=${outline} />
      <path class="flexarm-outline" d=${armPath} style="stroke-width:${armW + 3}px" />
      <path class="flexarm" d=${armPath} style="stroke-width:${armW}px" />
    </g>

    ${o.fever > 0
      ? svg`
        <ellipse cx="100" cy="30" rx="25" ry="25" fill="url(#hc-fever-glow)"
          opacity=${o.fever}/>
        <ellipse cx="100" cy="105" rx="36" ry="32" fill="url(#hc-fever-glow)"
          opacity=${o.fever * 0.9}/>`
      : nothing}

    ${o.tired > 0
      ? svg`
        <path d="M 90.5 33 q 3 3 6 0" fill="none" stroke-linecap="round"
          stroke="color-mix(in srgb, var(--primary-text-color) 55%, transparent)"
          stroke-width="1.6" opacity=${0.25 + o.tired * 0.5}/>
        <path d="M 103.5 33 q 3 3 6 0" fill="none" stroke-linecap="round"
          stroke="color-mix(in srgb, var(--primary-text-color) 55%, transparent)"
          stroke-width="1.6" opacity=${0.25 + o.tired * 0.5}/>`
      : nothing}

    ${o.cuff
      ? svg`<rect x=${cuffX - 10} y="82" width="20" height="13" rx="4"
          fill="var(--hc-accent)" stroke="color-mix(in srgb, #fff 35%, transparent)"
          stroke-width="1" transform="rotate(${cuffAngle} ${cuffX} 88)"/>`
      : nothing}
  </svg>`;
}
