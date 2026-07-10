// Dev-only harness: stubs ha-card / ha-icon and a minimal `hass` object
// so the card can be developed outside Home Assistant.
import '../src/health-card.ts';

// ---- ha-card stub -----------------------------------------------------------
customElements.define(
  'ha-card',
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).innerHTML = `
        <style>
          :host {
            display: block;
            background: var(--ha-card-background, var(--card-background-color, #fff));
            border-radius: var(--ha-card-border-radius, 12px);
            box-shadow: var(--ha-card-box-shadow, 0 2px 10px rgba(0,0,0,0.06));
            color: var(--primary-text-color);
          }
        </style>
        <slot></slot>`;
    }
  }
);

// ---- ha-icon stub (loads real MDI icons from CDN, dev only) ------------------
const iconCache = new Map();
customElements.define(
  'ha-icon',
  class extends HTMLElement {
    static get observedAttributes() {
      return ['icon'];
    }
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }).innerHTML = `
        <style>
          :host { display: inline-flex; width: var(--mdc-icon-size, 24px); height: var(--mdc-icon-size, 24px); }
          svg { width: 100%; height: 100%; fill: currentColor; display: block; }
        </style>
        <span id="s"></span>`;
    }
    set icon(v) {
      this._icon = v;
      this._render();
    }
    get icon() {
      return this._icon;
    }
    attributeChangedCallback(_n, _o, v) {
      this.icon = v;
    }
    async _render() {
      const name = (this._icon || '').replace('mdi:', '');
      if (!name) return;
      if (!iconCache.has(name)) {
        iconCache.set(
          name,
          fetch(`https://cdn.jsdelivr.net/npm/@mdi/svg@7.4.47/svg/${name}.svg`)
            .then((r) => (r.ok ? r.text() : ''))
            .catch(() => '')
        );
      }
      const svg = await iconCache.get(name);
      if (this._icon && this._icon.replace('mdi:', '') === name) {
        this.shadowRoot.getElementById('s').innerHTML = svg;
        this.shadowRoot.getElementById('s').style.display = 'contents';
      }
    }
  }
);

// ---- mock states + history ---------------------------------------------------
const now = new Date();
const todayAt = (h, m) => {
  const d = new Date(now);
  d.setHours(h, m, 0, 0);
  return d.toISOString();
};

function entity(id, state, attrs) {
  return {
    entity_id: id,
    state: String(state),
    attributes: attrs,
    last_changed: todayAt(7, 42),
    last_updated: todayAt(7, 42),
  };
}

const states = {
  'sensor.gewicht': entity('sensor.gewicht', 90.2, { unit_of_measurement: 'kg', friendly_name: 'Gewicht' }),
  'sensor.zielgewicht': entity('sensor.zielgewicht', 85, { unit_of_measurement: 'kg', friendly_name: 'Zielgewicht' }),
  'sensor.startgewicht': entity('sensor.startgewicht', 96, { unit_of_measurement: 'kg', friendly_name: 'Startgewicht' }),
  'sensor.puls': entity('sensor.puls', 69, { unit_of_measurement: 'bpm', friendly_name: 'Puls' }),
  'sensor.blutdruck_sys': entity('sensor.blutdruck_sys', 121, { unit_of_measurement: 'mmHg', friendly_name: 'Systolisch' }),
  'sensor.blutdruck_dia': entity('sensor.blutdruck_dia', 79, { unit_of_measurement: 'mmHg', friendly_name: 'Diastolisch' }),
  'sensor.koerpertemperatur': entity('sensor.koerpertemperatur', 36.6, { unit_of_measurement: '°C', friendly_name: 'Körpertemperatur' }),
  'sensor.muskelmasse': entity('sensor.muskelmasse', 85.1, { unit_of_measurement: '%', friendly_name: 'Muskeln' }),
  'sensor.fettanteil': entity('sensor.fettanteil', 12.4, { unit_of_measurement: '%', friendly_name: 'Fett' }),
  'sensor.schritte': entity('sensor.schritte', 12345, { friendly_name: 'Schritte' }),
  'sensor.schrittziel': entity('sensor.schrittziel', 7000, { unit_of_measurement: 'steps', friendly_name: 'Schrittziel' }),
  'sensor.sport_minuten': entity('sensor.sport_minuten', 49, { unit_of_measurement: 'min', friendly_name: 'Sport' }),
  'sensor.sport_distanz': entity('sensor.sport_distanz', 10.04, { unit_of_measurement: 'km', friendly_name: 'Distanz' }),
  'sensor.sport_kalorien': entity('sensor.sport_kalorien', 621, { unit_of_measurement: 'kcal', friendly_name: 'Kalorien' }),
  'sensor.wasser': entity('sensor.wasser', 1250, { unit_of_measurement: 'ml', friendly_name: 'Wasser' }),
  'sensor.protein': entity('sensor.protein', 92, { unit_of_measurement: 'g', friendly_name: 'Protein' }),
  'sensor.kohlenhydrate': entity('sensor.kohlenhydrate', 180, { unit_of_measurement: 'g', friendly_name: 'Kohlenhydrate' }),
  'sensor.fett_g': entity('sensor.fett_g', 55, { unit_of_measurement: 'g', friendly_name: 'Fett' }),
  'sensor.schlaf': entity('sensor.schlaf', 452, { unit_of_measurement: 'min', friendly_name: 'Schlaf' }),
  'sensor.tiefschlaf': entity('sensor.tiefschlaf', 92, { unit_of_measurement: 'min', friendly_name: 'Tiefschlaf' }),
  'sensor.leichter_schlaf': entity('sensor.leichter_schlaf', 210, { unit_of_measurement: 'min', friendly_name: 'Leichter Schlaf' }),
  'sensor.rem_schlaf': entity('sensor.rem_schlaf', 105, { unit_of_measurement: 'min', friendly_name: 'REM-Schlaf' }),
  'sensor.wachphasen': entity('sensor.wachphasen', 45, { unit_of_measurement: 'min', friendly_name: 'Wach' }),
  'sensor.schlafwert': entity('sensor.schlafwert', 82, { friendly_name: 'Schlafwert' }),
  'sensor.gesundheitsscore': entity('sensor.gesundheitsscore', 96, { friendly_name: 'Gesundheitsscore' }),
  'sensor.zahnputzzeit': entity('sensor.zahnputzzeit', 135, { unit_of_measurement: 's', friendly_name: 'Zahnputzzeit' }),
};

// value profiles for fake history: [base, dailyTrend, jitter]
const profiles = {
  'sensor.gewicht': [91.2, -0.16, 0.15],
  'sensor.puls': [70, -0.2, 3],
  'sensor.blutdruck_sys': [123, -0.4, 3],
  'sensor.blutdruck_dia': [81, -0.3, 2],
  'sensor.koerpertemperatur': [36.6, 0, 0.2],
  'sensor.muskelmasse': [84.4, 0.11, 0.1],
  'sensor.fettanteil': [13.1, -0.11, 0.1],
  'sensor.schritte': [9000, 300, 4500],
  'sensor.sport_minuten': [35, 2, 20],
  'sensor.wasser': [1800, 0, 500],
  'sensor.schlaf': [430, 2, 45],
  'sensor.tiefschlaf': [90, 0.5, 15],
  'sensor.leichter_schlaf': [200, 1, 25],
  'sensor.rem_schlaf': [100, 0.5, 15],
  'sensor.schlafwert': [55, 0.9, 40],
  'sensor.gesundheitsscore': [92, 0.6, 2],
  'sensor.zahnputzzeit': [115, 2, 50],
};

let seed = 42;
const rand = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

function fakeHistory(id, startMs, endMs) {
  const [base, trend, jitter] = profiles[id] ?? [50, 0, 5];
  const points = [];
  const dayMs = 86400000;
  const days = Math.ceil((endMs - startMs) / dayMs);
  for (let d = 0; d < days; d++) {
    const t = startMs + d * dayMs + 8 * 3600000;
    if (t > endMs) break;
    const v = base + trend * d + (rand() - 0.5) * jitter;
    points.push({ s: String(Math.max(0, v)), lu: t / 1000 });
  }
  return points;
}

const hass = {
  states,
  language: 'de',
  locale: { language: 'de' },
  callWS: async (msg) => {
    if (msg.type === 'history/history_during_period') {
      const start = new Date(msg.start_time).getTime();
      const end = new Date(msg.end_time).getTime();
      const out = {};
      for (const id of msg.entity_ids) out[id] = fakeHistory(id, start, end);
      return out;
    }
    if (msg.type === 'recorder/statistics_during_period') {
      const start = new Date(msg.start_time).getTime();
      const end = new Date(msg.end_time).getTime();
      const out = {};
      for (const id of msg.statistic_ids) {
        out[id] = fakeHistory(id, start, end).map((p) => ({
          start: p.lu * 1000,
          mean: +p.s,
          min: +p.s * 0.97,
          max: +p.s * 1.03,
          state: +p.s,
          sum: null,
        }));
      }
      return out;
    }
    return {};
  },
};

// ---- mount the card -----------------------------------------------------------
const config = {
  type: 'custom:health-card',
  title: 'Messungen',
  subtitle: 'Letzte 7 Tage',
  metrics: [
    { type: 'score', entity: 'sensor.gesundheitsscore' },
    {
      type: 'weight',
      entity: 'sensor.gewicht',
      goal: 'sensor.zielgewicht',
      start: 'sensor.startgewicht',
    },
    {
      type: 'body_composition',
      label: 'Fettabbau',
      entities: [
        { entity: 'sensor.muskelmasse', name: 'Muskeln' },
        { entity: 'sensor.fettanteil', name: 'Fett' },
      ],
    },
    { type: 'steps', entity: 'sensor.schritte', goal: 'sensor.schrittziel' },
    { type: 'heart_rate', entity: 'sensor.puls' },
    { type: 'blood_pressure', entity: 'sensor.blutdruck_sys', entity2: 'sensor.blutdruck_dia' },
    { type: 'temperature', entity: 'sensor.koerpertemperatur' },
    {
      type: 'workout',
      entity: 'sensor.sport_minuten',
      duration: true,
      secondary: ['sensor.sport_distanz', 'sensor.sport_kalorien'],
    },
    { type: 'water', entity: 'sensor.wasser', goal: 2000 },
    {
      type: 'nutrition',
      entities: [
        { entity: 'sensor.protein', name: 'Protein', goal: 120 },
        { entity: 'sensor.kohlenhydrate', name: 'Kohlenhydrate', goal: 250 },
        { entity: 'sensor.fett_g', name: 'Fett', goal: 70 },
      ],
    },
    {
      type: 'sleep',
      entity: 'sensor.schlaf',
      score_entity: 'sensor.schlafwert',
      phases: {
        deep: 'sensor.tiefschlaf',
        light: 'sensor.leichter_schlaf',
        rem: 'sensor.rem_schlaf',
        awake: 'sensor.wachphasen',
      },
    },
    { type: 'toothbrush', entity: 'sensor.zahnputzzeit', goal: 120 },
  ],
};

const card = document.createElement('health-card');
let current = { ...config };
card.setConfig(current);
card.hass = hass;
document.getElementById('mount').appendChild(card);

const apply = (patch) => {
  current = { ...current, ...patch };
  card.setConfig(current);
};

document.getElementById('theme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
});
document.getElementById('width').addEventListener('click', () => {
  const w = document.getElementById('wrap');
  const wide = w.style.maxWidth !== '900px';
  w.style.maxWidth = wide ? '900px' : '420px';
  apply({ columns: wide ? 2 : 1 });
});
document.getElementById('layout').addEventListener('click', () => {
  apply({ layout: current.layout === 'carousel' ? 'grid' : 'carousel', columns: 1 });
});
document.getElementById('bg').addEventListener('click', () => {
  const off = current.background !== false;
  apply({ background: off ? false : true, flush: off });
});

const STYLES = ['withings', 'default', 'glass', 'material', 'bubble', 'mirror'];
document.getElementById('style').addEventListener('click', () => {
  const next = STYLES[(STYLES.indexOf(current.card_style ?? 'withings') + 1) % STYLES.length];
  apply({ card_style: next });
  document.getElementById('style').textContent = `Stil: ${next}`;
  // glass needs something colorful behind it, mirror a black wall
  document.body.style.background =
    next === 'glass'
      ? 'linear-gradient(135deg, #4568dc 0%, #b06ab3 50%, #ee9ca7 100%) fixed'
      : next === 'mirror'
        ? '#000'
        : '';
});
