// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  overrides: [
    {
      files: ['**/*.js', '**/*.cjs', '**/*.mjs', '**/*.jsx'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  ],
}

module.exports = eslintConfig
