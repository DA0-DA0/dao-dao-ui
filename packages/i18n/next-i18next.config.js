const path = require('path')

/** @type {import("next-i18next").UserConfig} */
const config = {
  i18n: {
    // Add your language ISO 639-1 code here.
    locales: ['en', 'it', 'pl', 'uk', 'zh', 'zh-tw', 'ko', 'fr'],
    defaultLocale: 'en',
    lowerCaseLng: true,
  },
  localePath: path.resolve(__dirname, '../../packages/i18n/locales'),
  defaultNS: 'translation',
  ns: ['translation'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}

module.exports = config
