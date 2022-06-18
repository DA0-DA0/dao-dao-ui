// elsehow 13331
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import resourcesToBackend from 'i18next-resources-to-backend'
import { Trans, initReactI18next } from 'react-i18next'

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend((language, namespace, callback) =>
      // Lazy load translations in memory.
      import(`./locales/${language}/${namespace}.json`)
        .then((resources) => callback(null, resources))
        .catch((error) => callback(error, null))
    )
  )
  .init({
    fallbackLng: 'en',
  })

export default i18n
export { Trans }
