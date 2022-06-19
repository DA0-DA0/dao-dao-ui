// @ts-check

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  plugins: ['import', 'unused-imports', 'regex'],
  rules: {
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
          regex: "from 'react-i18next'",
          replacement: "from '@dao-dao/i18n'",
          files: {
            // Not in this package or the i18n package.
            ignore: 'packages\\/(config|i18n)\\/.+',
          },
          message: 'Import from `@dao-dao/i18n` instead.',
        },
        {
          regex: 'i18n\\.t',
          replacement: 't',
          message:
            'Use `t` from the `useTranslation` hook if inside a component, or the named import `t` directly from `@dao-dao/i18n` instead.',
        },
      ],
    ],
  },
}

module.exports = eslintConfig
