// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: [require.resolve('@dao-dao/config/eslint')],
  ignorePatterns: ['node_modules'],
  root: true,
  overrides: [
    {
      files: ['locales/**/*.json'],
      plugins: ['i18n-json'],
      rules: {
        'i18n-json/sorted-keys': 'error',
        'i18n-json/valid-json': 'error',
      },
    },
  ],
}

module.exports = eslintConfig
