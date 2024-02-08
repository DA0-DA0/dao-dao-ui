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
    domains: [
      {
        domain: 'daodao.zone',
        defaultLocale: 'en',
      },
      {
        domain: 'dao.daodao.zone',
        defaultLocale: 'en',
      },
      {
        domain: 'badbad.zone',
        defaultLocale: 'bad',
      },
      {
        domain: 'bad.badbad.zone',
        defaultLocale: 'bad',
      },
    ],
  },
  lowerCaseLng: true,
  localePath: path.resolve(__dirname, '../../packages/i18n/locales'),
  defaultNS: 'translation',
  ns: ['translation'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}

module.exports = config
