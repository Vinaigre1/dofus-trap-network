import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
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
      "Indirect push damage": "Indirect push damage"
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
      "Indirect push damage": "Dommages de poussée indirecte"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fr", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;