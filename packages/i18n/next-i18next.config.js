const path = require('path')

/** @type {import("next-i18next").UserConfig} */
const config = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  localePath: path.resolve('../../packages/i18n/locales'),
  defaultNS: 'translation',
  ns: ['translation'],
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}

module.exports = config
