// @ts-check

const fs = require('fs')
const path = require('path')

const tsConfig = fs.existsSync('tsconfig.json')
  ? path.resolve('tsconfig.json')
  : fs.existsSync('types/tsconfig.json')
  ? path.resolve('types/tsconfig.json')
  : undefined

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: [
    'next/core-web-vitals',
    require.resolve('./import'),
    'plugin:prettier/recommended',
  ],
  plugins: ['tailwindcss'],
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'no-unused-vars': ['off'],
    'react/jsx-sort-props': ['warn', { reservedFirst: ['key'] }],
    'tailwindcss/classnames-order': ['warn'],
  },
  overrides: [
    {
      files: ['**/*.d.ts', '**/*.ts', '**/*.tsx'],
      extends: ['plugin:prettier/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: tsConfig,
      },
      plugins: ['@typescript-eslint'],
      rules: {
        '@typescript-eslint/no-unused-vars': ['off'],
      },
    },
  ],
}

module.exports = eslintConfig
