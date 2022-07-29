// @ts-check
const path = require('path')

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  overrides: [
    {
      files: ['locales/**/*.json'],
      plugins: ['i18n-json'],
      rules: {
        'i18n-json/identical-keys': [
          'warn',
          {
            filePath: path.resolve('./locales/en/translation.json'),
          },
        ],
      },
    },
  ],
}

module.exports = eslintConfig
