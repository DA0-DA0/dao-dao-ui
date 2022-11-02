// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: [
    require.resolve('@dao-dao/config/eslint'),
    'plugin:storybook/recommended',
  ],
  ignorePatterns: ['node_modules'],
  root: true,
}

module.exports = eslintConfig
