import type { HomeAssistant } from './types';

const STRINGS: Record<string, Record<string, string>> = {
  en: {
    goal: 'Goal',
    rising: 'rising',
    falling: 'falling',
    stable: 'stable',
    today: 'Today',
    yesterday: 'Yesterday',
    no_data: 'No data',
    entity_missing: 'Entity not found',
    weight: 'Weight',
    heart_rate: 'Heart rate',
    blood_pressure: 'Blood pressure',
    temperature: 'Body temperature',
    body_composition: 'Body composition',
    steps: 'Steps',
    workout: 'Workout',
    calories: 'Calories',
    nutrition: 'Nutrition',
    water: 'Water',
    sleep: 'Sleep',
    custom: 'Sensor',
  },
  de: {
    goal: 'Ziel',
    rising: 'steigend',
    falling: 'fallend',
    stable: 'stabil',
    today: 'Heute',
    yesterday: 'Gestern',
    no_data: 'Keine Daten',
    entity_missing: 'Entität nicht gefunden',
    weight: 'Gewicht',
    heart_rate: 'Puls',
    blood_pressure: 'Blutdruck',
    temperature: 'Körpertemperatur',
    body_composition: 'Körperzusammensetzung',
    steps: 'Schritte',
    workout: 'Sport',
    calories: 'Kalorien',
    nutrition: 'Nährstoffe',
    water: 'Wasser',
    sleep: 'Schlaf',
    custom: 'Sensor',
  },
};

export function lang(hass?: HomeAssistant): string {
  const l = hass?.locale?.language ?? hass?.language ?? 'en';
  return l.startsWith('de') ? 'de' : 'en';
}

export function t(hass: HomeAssistant | undefined, key: string): string {
  return STRINGS[lang(hass)][key] ?? STRINGS.en[key] ?? key;
}
