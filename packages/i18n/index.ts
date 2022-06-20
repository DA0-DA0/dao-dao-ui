// elsehow 13331
import i18n, { t } from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import {
  Trans,
  initReactI18next,
  useTranslation,
  withTranslation,
} from 'react-i18next'

import enSplash from './locales/en/splash.json'
import enTranslation from './locales/en/translation.json'

// TODO: Lazy load with backend
// resourcesToBackend((language, namespace, callback) =>
//   // Lazy load translations in memory.
//   import(`./locales/${language}/${namespace}.json`)
//     .then((resources) => callback(null, resources))
//     .catch((error) => callback(error, null))
// )
const resources = {
  en: {
    translation: enTranslation,
    splash: enSplash,
  },
}

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    ns: ['translation', 'splash'],
  })

export default i18n
export { Trans, useTranslation, t, withTranslation }
