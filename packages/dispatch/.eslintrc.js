// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: [require.resolve('@dao-dao/config/eslint')],
  ignorePatterns: ['node_modules'],
  root: true,
  rules: {
    'i18next/no-literal-string': 'off',
  },
}

module.exports = eslintConfig
