// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: [require.resolve('./eslint')],
  ignorePatterns: ['node_modules'],
  root: true,
}

module.exports = eslintConfig
