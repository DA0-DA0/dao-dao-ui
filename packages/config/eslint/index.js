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
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended'],
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
      extends: ['plugin:react-i18n/recommended', 'plugin:i18next/recommended'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: tsConfig,
      },
      plugins: ['@typescript-eslint', 'import', 'unused-imports', 'regex'],
      rules: {
        '@typescript-eslint/no-unused-vars': ['off'],
        'i18next/no-literal-string': [
          'warn',
          {
            mode: 'jsx-only',
            'jsx-attributes': {
              include: [
                'label',
                'placeholder',
                'alt',
                'title',
                'aria-label',
                'aria-placeholder',
                'name',
                'description',
                'subtitle',
                'emoji',
              ],
            },
            words: {
              exclude: [
                // Defaults wrapped in whitespace.
                '\\s*[0-9!-/:-@[-`{-~]+\\s*',
                '\\s*[A-Z_-]+\\s*',
              ],
            },
          },
        ],
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal'],
            pathGroups: [
              {
                pattern: '@dao-dao/**',
                group: 'external',
                position: 'after',
              },
            ],
            pathGroupsExcludedImportTypes: ['@dao-dao/**'],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
              caseInsensitive: true,
            },
          },
        ],
        'import/no-duplicates': 'error',
        'sort-imports': [
          'error',
          {
            // Let eslint-plugin-import handle declaration groups above.
            ignoreDeclarationSort: true,
            // Sort within import statements.
            ignoreMemberSort: false,
          },
        ],
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
          'warn',
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],
        'regex/invalid': [
          'error',
          [
            {
              regex: '\\@\\/\\.\\.\\/\\.\\.\\/packages',
              replacement: '@dao-dao',
              files: {
                // Don't replace in this file since the pattern appears above.
                ignore: 'import\\.js',
              },
              message:
                'Import from @dao-dao/* instead of a relative path (i.e. replace "@/../../packages" with "@dao-dao").',
            },
            {
              regex: '\\@dao\\-dao\\/ui\\/(components|theme)[^\'"]*',
              replacement: '@dao-dao/ui',
              files: {
                // Don't replace in this file since the pattern appears above.
                ignore: 'import\\.js',
              },
              message:
                'Import from root @dao-dao/ui instead of a direct path. Ensure the export has been added to its sibling index.',
            },
            {
              regex: '\\@dao\\-dao\\/state\\/hooks\\/clients[^\'"]*',
              files: {
                // Don't replace in this file since the pattern appears above.
                ignore: 'import\\.js',
              },
              message:
                'Import from root @dao-dao/state using a grouped export, such as CwCoreHooks, instead of a direct path.',
            },
            {
              regex: '\\@dao\\-dao\\/state\\/recoil\\/selectors[^\'"]*',
              files: {
                // Don't replace in this file since the pattern appears above.
                ignore: 'import\\.js',
              },
              message:
                'Import from root @dao-dao/state instead of a direct path. If using contract client selectors, use a grouped export, such as CwCoreSelectors.',
            },
            {
              regex: '(?:\\.\\.\\/)+(atoms|components|hooks|util)',
              replacement: {
                function: '"@/" + $[1]',
              },
              files: {
                // Only in apps.
                inspect: 'apps\\/.+',
              },
              message:
                'Import from root using prefix @/ instead of a relative path.',
            },
            {
              regex:
                '(?:(?:\\.\\.\\/)+|\\@\\/)(atoms|components|hooks|util)/[^\'"]+',
              replacement: {
                function: '"@/" + $[1]',
              },
              files: {
                // Only in apps.
                inspect: 'apps\\/.+',
              },
              message:
                'Import from root @/ instead of a direct path. Ensure the export has been added to its sibling index.',
            },
            {
              regex: '(\\bt\\(\\s*\'[^\\.\']+\'|i18nKey="[^\\."]+")',
              message:
                'No top-level i18n keys allowed. Organize top-level keys into a nested object.',
            },
            {
              regex: 'animate-spin([^-])',
              replacement: {
                function: '"animate-spin-medium" + $[1]',
              },
              message:
                '`animate-spin` is too fast. Use `animate-spin-medium` for a chiller vibe.',
            },
          ],
        ],
      },
    },
  ],
}

module.exports = eslintConfig
