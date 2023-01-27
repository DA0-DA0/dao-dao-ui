const path = require('path')

/** @type {import("next-i18next").UserConfig} */
const config = {
  i18n: {
    // Add your language ISO 639-1 code here.
    locales: ['dog', 'en', 'es', 'fr', 'it', 'ko', 'pl', 'uk', 'zh', 'zh-tw'],
    defaultLocale: 'en',
    lowerCaseLng: true,
    // Don't automatically navigate to language subpath.
    localeDetection: false,
  },
  localePath: path.resolve(__dirname, '../../packages/i18n/locales'),
  defaultNS: 'translation',
  ns: ['translation'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}

module.exports = config
