// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: [require.resolve('@dao-dao/config/eslint')],
  ignorePatterns: ['node_modules'],
  root: true,
  overrides: [
    {
      files: ['locales/**/*.json'],
      rules: {
        'jsonc/sort-keys': ['error'],
      },
    },
  ],
}

module.exports = eslintConfig
