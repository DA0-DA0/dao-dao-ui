// elsehow 13331
import i18n from 'i18next'
// import { LanguageDetector } from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from './locales/en/translation'

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: en,
  },
}

// TODO LangaugeDetector ?
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    interpolation: {
      // TODO this flag has something to do with preventing XSS, which react
      // purportedly already does. investigate this further.
      escapeValue: false,
    },
  })

export default i18n
