// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

const config = require('@dao-dao/i18n/next-i18next.config')

module.exports = {
  ...config,
  i18n: {
    ...config.i18n,
    domains: [
      {
        domain: 'daodao.zone',
        defaultLocale: 'en',
      },
      {
        domain: 'badbad.zone',
        defaultLocale: 'bad',
      },
    ],
  },
}
