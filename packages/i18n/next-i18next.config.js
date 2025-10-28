const path = require('path')

/** @type {import("next-i18next").UserConfig} */
const config = {
  i18n: {
    // Add your language ISO 639-1 code here.
    locales: [
      'bad',
      'dog',
      'en',
      'es',
      'fr',
      'it',
      'ko',
      'pl',
      'uk',
      'zh',
      'zh-tw',
    ],
    defaultLocale: 'en',
    localeDetection: false,
  },
  lowerCaseLng: true,
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/public/locales',
  defaultNS: 'translation',
  ns: ['translation'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}

module.exports = config
