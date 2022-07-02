// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: [require.resolve('@dao-dao/config/eslint')],
  ignorePatterns: ['.next', '.turbo', 'node_modules', 'out'],
  root: true,
}

module.exports = eslintConfig
