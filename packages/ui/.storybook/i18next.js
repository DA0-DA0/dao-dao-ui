import { initReactI18next } from 'react-i18next'
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import config from '@dao-dao/i18n/next-i18next.config'

const resources = config.ns.reduce((acc, n) => {
  config.i18n.locales.forEach((lng) => {
    if (!acc[lng]) acc[lng] = {}
    acc[lng] = {
      ...acc[lng],
      [n]: require(`@dao-dao/i18n/locales/${lng}/${n}.json`),
    }
  })
  return acc
}, {})

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    //debug: true,
    lng: config.i18n.defaultLocale,
    fallbackLng: config.i18n.defaultLocale,
    defaultNS: config.defaultNS,
    ns: config.ns,
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    supportedLngs: config.i18n.locales,
    resources,
  })

export default i18n
