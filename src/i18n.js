import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Value: {{value}}": "Value: {{value}}",
      "Push": "Push",
      "Attraction": "Attraction",
      "Water damage": "Water damage",
      "Fire damage": "Fire damage",
      "Earth damage": "Earth damage",
      "Air damage": "Air damage",
      "Push damage": "Push damage",
      "Indirect push damage": "Indirect push damage",
      "Pushes back {{value}} cells_one": "Pushes back {{value}} cell",
      "Pushes back {{value}} cells": "Pushes back {{value}} cells",
      "Attracts {{value}} cells_one": "Attracts {{value}} cell",
      "Attracts {{value}} cells": "Attracts {{value}} cells",
      "{{value}} water damage": "{{value}} water damage",
      "{{value}} fire damage": "{{value}} fire damage",
      "{{value}} earth damage": "{{value}} earth damage",
      "{{value}} air damage": "{{value}} air damage",
      "{{value}} push damage": "{{value}} push damage",
      "{{value}} push damage (indirect)": "{{value}} push damage (indirect)",
      "{{value}} push damage (indirect)": "{{value}} push damage (indirect)",
      "Selected map": "Selected map",
      "Spell '{{value}}' casted as target": "Spell '{{value}}' casted as target",
      "Spell '{{value}}' casted as caster": "Spell '{{value}}' casted as caster",
      "Add state '{{value}}'": "Add state '{{value}}'",
      "Remove state '{{value}}'": "Remove state '{{value}}'",
      "Mass Trap": "Mass Trap",
    }
  },
  fr: {
    translation: {
      "Value: {{value}}": "Valeur: {{value}}",
      "Push": "Poussée",
      "Attraction": "Attirance",
      "Water damage": "Dommages eau",
      "Fire damage": "Dommages feu",
      "Earth damage": "Dommages terre",
      "Air damage": "Dommages air",
      "Push damage": "Dommages de poussée",
      "Indirect push damage": "Dommages de poussée indirecte",
      "Pushes back {{value}} cells_one": "Pousse de {{value}} case",
      "Pushes back {{value}} cells": "Pousse de {{value}} cases",
      "Attracts {{value}} cells_one": "Attire de {{value}} case",
      "Attracts {{value}} cells": "Attire de {{value}} cases",
      "{{value}} water damage_one": "{{value}} dommage eau",
      "{{value}} water damage": "{{value}} dommages eau",
      "{{value}} fire damage_one": "{{value}} dommage feu",
      "{{value}} fire damage": "{{value}} dommages feu",
      "{{value}} earth damage_one": "{{value}} dommage terre",
      "{{value}} earth damage": "{{value}} dommages terre",
      "{{value}} air damage_one": "{{value}} dommage air",
      "{{value}} air damage": "{{value}} dommages air",
      "{{value}} push damage_one": "{{value}} dommage de poussée",
      "{{value}} push damage": "{{value}} dommages de poussée",
      "{{value}} push damage_one (indirect)": "{{value}} dommage de poussée (indirecte)",
      "{{value}} push damage (indirect)": "{{value}} dommages de poussée (indirecte)",
      "Selected map": "Map sélectionnée",
      "Spell '{{value}}' casted as target": "Sort '{{value}}' lancé par la cible",
      "Spell '{{value}}' casted as caster": "Sort '{{value}}' lancé par le lanceur",
      "Add state '{{value}}'": "Ajoute l'état '{{value}}'",
      "Remove state '{{value}}'": "Retire l'état '{{value}}'",
      "Mass Trap": "Piège de Masse",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })
;

export default i18n;
