// @ts-check

const fs = require('fs')
const path = require('path')

const tsConfig = fs.existsSync('tsconfig.json')
  ? path.resolve('tsconfig.json')
  : fs.existsSync('types/tsconfig.json')
  ? path.resolve('types/tsconfig.json')
  : undefined

/** @type {import("eslint").Linter.RuleEntry} */
const noUnusedVarsConfig = [
  'warn',
  {
    args: 'after-used',
    argsIgnorePattern: '^_',
    ignoreRestSiblings: false,
    vars: 'all',
    varsIgnorePattern: '^_',
  },
]

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
    'no-unused-vars': noUnusedVarsConfig,
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
        'no-unused-vars': ['off'],
        '@typescript-eslint/no-unused-vars': noUnusedVarsConfig,
      },
    },
  ],
}

module.exports = eslintConfig
