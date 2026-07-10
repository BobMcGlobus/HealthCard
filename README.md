# Health Card

Eine voll konfigurierbare Lovelace-Karte im **Withings-Stil** für Home Assistant:
Gewicht, Puls, Blutdruck, Körpertemperatur, Körperzusammensetzung, Sport, Kalorien,
Nährstoffe, Wasser, Schlaf — mit Sparklines, Balkendiagrammen, Fortschrittsbalken,
Trend-Pfeilen und Zielen. Vollständig Theme-kompatibel (Light & Dark).

## Features

- 🎨 **Withings-Look**: Kacheln mit großen Werten, Icon-Chips, geglättete Verlaufskurven mit Ring-Punkten
- 🌗 **100 % Theme-Support**: nutzt ausschließlich HA-Theme-Variablen (`--primary-text-color`, `--ha-card-background`, `--red-color`, …)
- 📈 **Diagramme pro Metrik**: Linie, Balken, Fortschrittsbalken oder keins
- 🎯 **Ziele**: Zahl **oder Sensor** (z. B. `sensor.zielgewicht`), Richtung wählbar (mindestens erreichen / höchstens — z. B. abnehmen), „Ziel: 94 %" mit Haken bei Erreichen, Ziellinie im Balkendiagramm
- ↗️ **Trends**: automatische Trend-Pfeile aus der Recorder-History (steigend/fallend gut/schlecht konfigurierbar)
- 🧩 **Multi-Serien**: z. B. Muskel- & Fettanteil in einem Chart, Makros als Fortschrittsbalken
- 🛌 **Schlafphasen**: Segmentbalken + Aufschlüsselung (Tief/Leicht/REM/Wach)
- 💯 **Gesamt-Score-Kachel** im Withings-Stil (Punktering, „96 von 100")
- 🪥 **Zähneputzen-Preset** (z. B. Oral-B iO)
- 🎠 **Carousel-Layout**: alle Kacheln horizontal scrollbar auf minimalem Platz
- 🫥 **Einbettbar**: Kartenhintergrund abschaltbar (rendert dann ganz ohne `ha-card` — keine Theme-Border) + randlose Darstellung für Container-Karten
- 🔍 **Detail-Popup**: Klick auf eine Kachel öffnet eine eigene Detailansicht mit großem Verlauf, Wochentagen, Min/Ø/Max und allen Serien/Phasen
- 🖱️ **Klick-Aktion pro Kachel**: Popup (Detailansicht), More-Info (HA-Dialog), Link oder nichts
- 🎨 **5 Kartenstile** über `card_style`: HA-Standard, Withings (Default), Liquid Glass, Material You, Bubble
- 🖱️ **Visueller Editor**: Metriken per UI hinzufügen, sortieren, konfigurieren
- 🌍 Deutsch & Englisch (automatisch nach HA-Sprache)

## Installation

### HACS (empfohlen)

1. HACS → *Custom repositories* → dieses Repository als Typ **Dashboard** hinzufügen
2. „Health Card" installieren
3. Die Ressource wird automatisch registriert

### Manuell

1. [`dist/health-card.js`](dist/health-card.js) nach `config/www/health-card.js` kopieren
2. *Einstellungen → Dashboards → ⋮ → Ressourcen* → `/local/health-card.js` als **JavaScript-Modul** hinzufügen

## Konfiguration

```yaml
type: custom:health-card
title: Messungen
subtitle: Letzte 7 Tage
days: 7
metrics:
  - type: score
    entity: sensor.gesundheitsscore
  - type: weight
    entity: sensor.gewicht
    goal: sensor.zielgewicht     # Zahl oder Sensor
    start: 96                    # Zahl oder Sensor: Ziel-% = Fortschritt Start → Ziel
    goal_type: atmost            # ohne start: Ziel ist erreicht bei <= Zielwert
  - type: body_composition
    label: Fettabbau
    entities:
      - entity: sensor.muskelanteil
        name: Muskeln
      - entity: sensor.fettanteil
        name: Fett
  - type: steps
    entity: sensor.schritte
    goal: 10000
  - type: heart_rate
    entity: sensor.puls
  - type: blood_pressure
    entity: sensor.blutdruck_systolisch
    entity2: sensor.blutdruck_diastolisch
  - type: temperature
    entity: sensor.koerpertemperatur
  - type: workout
    entity: sensor.trainingsminuten
    duration: true
    secondary:
      - sensor.trainingsdistanz
      - sensor.trainingskalorien
  - type: water
    entity: sensor.wasser
    goal: 2000
  - type: nutrition
    entities:
      - entity: sensor.protein
        name: Protein
        goal: 120
      - entity: sensor.kohlenhydrate
        name: Kohlenhydrate
        goal: 250
      - entity: sensor.fett
        name: Fett
        goal: 70
  - type: sleep
    entity: sensor.schlafdauer
    phases:
      deep: sensor.tiefschlaf
      light: sensor.leichter_schlaf
      rem: sensor.rem_schlaf
      awake: sensor.aufwachdauer
  - type: toothbrush
    entity: sensor.oralb_putzzeit
    goal: 120
```

Kompakt in einem Container (z. B. `vertical-stack`), scrollbar und ohne eigenen Hintergrund:

```yaml
type: custom:health-card
layout: carousel     # alle Kacheln horizontal durchscrollen
background: false    # ha-card-Hintergrund/-Schatten entfernen
flush: true          # Kacheln bis an den Rand
metrics: [...]
```

### Karten-Optionen

| Option     | Typ     | Default | Beschreibung                                    |
| ---------- | ------- | ------- | ----------------------------------------------- |
| `title`      | string  | –       | Überschrift                                                |
| `subtitle`   | string  | –       | Untertitel                                                 |
| `days`       | number  | `7`     | History-Zeitraum in Tagen (für alle Metriken)              |
| `columns`    | number  | `1`     | Kachel-Spalten (1–3)                                       |
| `layout`     | string  | `grid`  | `grid` oder `carousel` (horizontal scrollbar)              |
| `card_style` | string  | `withings` | `default` (HA-Look), `withings`, `glass` (Liquid Glass), `material` (Material You), `bubble` |
| `tiles`      | boolean | `true`  | Metriken als Kacheln (`false` = flache Zeilen)             |
| `background` | boolean | `true`  | `false`: Kartenhintergrund/-schatten entfernen (Container) |
| `flush`      | boolean | `false` | `true`: kein Außenabstand, Kacheln bis zum Rand            |
| `metrics`    | list    | –       | **Pflicht.** Liste der Metriken (siehe unten)              |

### Metrik-Optionen

| Option      | Typ    | Beschreibung                                                                  |
| ----------- | ------ | ----------------------------------------------------------------------------- |
| `type`      | string | Preset: `weight`, `heart_rate`, `blood_pressure`, `temperature`, `body_composition`, `steps`, `workout`, `calories`, `nutrition`, `water`, `sleep`, `custom` |
| `entity`    | string | Primäre Entität                                                               |
| `entity2`   | string | Zweite Entität (Blutdruck: diastolisch)                                       |
| `entities`  | list   | Mehrere Serien: Entity-IDs oder Objekte mit `entity`, `name`, `color`, `unit`, `goal` |
| `secondary` | list   | Zusatz-Entitäten als Infozeile („10,04 km • 621 kcal")                        |
| `name`      | string | Anzeigename (Default: lokalisierter Preset-Name)                              |
| `label`     | string | Text statt Wert als Headline (z. B. „Fettabbau")                              |
| `icon`      | string | MDI-Icon                                                                      |
| `color`     | string | Themefarbe (`red`, `teal`, `indigo`, …), Hex oder CSS-Variable                |
| `unit`      | string | Einheit (Default: von der Entität)                                            |
| `days`      | number | History-Zeitraum nur für diese Metrik                                         |
| `graph`     | string | `line`, `bar`, `progress`, `none`                                             |
| `goal`      | number/string | Zielwert **oder Sensor-Entität** → „Ziel: x %", Ziellinie, Fortschrittsbalken |
| `start`     | number/string | Startwert oder Sensor. Wenn gesetzt: Ziel-% = `(start − Wert) / (start − Ziel)` — der Fortschritt auf dem Weg zum Ziel (funktioniert für Ab- und Zunehmen) |
| `goal_type` | string | Nur ohne `start`: `atleast` (Default) oder `atmost` (Ziel erreicht bei ≤ Zielwert) |
| `tap_action`| string | `popup` (Default, eingebaute Detailansicht), `more-info` (HA-Dialog), `link`, `none` |
| `link`      | string | Dashboard-Pfad oder URL für `tap_action: link`                                |
| `max`       | number | Nur `score`: Maximalwert (Default 100)                                        |
| `phases`    | object | Nur `sleep`: `deep`/`light`/`rem`/`awake` Entitäten für die Phasen-Aufschlüsselung |
| `precision` | number | Nachkommastellen                                                              |
| `aggregate` | string | Tagesaggregation: `mean`, `min`, `max`, `sum`, `last`                         |
| `trend`     | string | `up_good`, `down_good`, `neutral`, `none`                                     |
| `duration`  | bool   | Wert als Dauer formatieren („7 h 32 min", Quelleinheit `min`/`h`/`s`)         |
| `attribute` | string | Attribut statt State auslesen                                                 |

### Preset-Defaults

| Typ                | Icon                 | Farbe        | Diagramm | Aggregation | Trend       |
| ------------------ | -------------------- | ------------ | -------- | ----------- | ----------- |
| `weight`           | `mdi:scale-bathroom` | indigo       | line     | mean        | down_good   |
| `heart_rate`       | `mdi:heart-pulse`    | red          | line     | mean        | neutral     |
| `blood_pressure`   | `mdi:heart-cog`      | pink         | line     | mean        | neutral     |
| `temperature`      | `mdi:thermometer`    | amber        | line     | mean        | neutral     |
| `body_composition` | `mdi:human`          | purple       | line     | mean        | neutral     |
| `steps`            | `mdi:walk`           | orange       | bar      | max         | up_good     |
| `workout`          | `mdi:run`            | deep-orange  | bar      | max         | up_good     |
| `calories`         | `mdi:fire`           | deep-orange  | progress | max         | neutral     |
| `nutrition`        | `mdi:food-apple`     | green        | progress | max         | neutral     |
| `water`            | `mdi:cup-water`      | light-blue   | progress | max         | up_good     |
| `sleep`            | `mdi:sleep`          | deep-purple  | bar      | max         | up_good     |
| `score`            | `mdi:heart-flash`    | amber        | Punktering | mean      | up_good     |
| `toothbrush`       | `mdi:toothbrush-electric` | cyan    | bar      | max         | up_good     |
| `custom`           | `mdi:chart-line`     | primary      | line     | mean        | neutral     |

`weight` hat zusätzlich `goal_type: atmost` als Default (Zielgewicht = abnehmen).

> **Hinweis zu `aggregate`:** Für Sensoren, die täglich auf 0 zurückspringen
> (Schritte, Wasser, Kalorien), ist `max` der richtige Tageswert — nicht `sum`.

## Theming

Die Karte verwendet ausschließlich Theme-Variablen. Benannte Farben (`red`,
`teal`, …) werden auf die HA-Farbvariablen (`--red-color`, `--teal-color`, …)
abgebildet und folgen damit deinem Theme. Zusätzlich anpassbar:

```yaml
# im Theme
health-card-beispiel:
  hc-tile-radius: 20px   # Eckenradius der Kacheln (--hc-tile-radius)
```

## Entwicklung

```bash
npm install
npm run build       # dist/health-card.js
npx vite            # Dev-Vorschau mit Mock-Daten (index.html + dev/demo.js)
```

## Lizenz

MIT
