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
    'sort-imports': [
      'error',
      {
        // Let eslint-plugin-import handle declaration groups above.
        ignoreDeclarationSort: true,
        // Sort within import statements.
        ignoreMemberSort: false,
      },
    ],
    'no-duplicate-imports': 'error',
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
            'Import from @dao-dao/* instead of using a relative path (i.e. replace "@/../../packages" with "@dao-dao").',
        },
        {
          regex: '\\@dao\\-dao\\/ui\\/(components|theme)[^\'"]*',
          replacement: '@dao-dao/ui',
          files: {
            // Don't replace in this file since the pattern appears above.
            ignore: 'import\\.js',
          },
          message:
            'Import from root @dao-dao/ui instead of the direct path. Ensure the export has been added to its sibling index.',
        },
        {
          regex: '\\@dao\\-dao\\/state\\/hooks\\/clients[^\'"]*',
          files: {
            // Don't replace in this file since the pattern appears above.
            ignore: 'import\\.js',
          },
          message:
            'Import from root @dao-dao/state using a grouped export, such as CwCoreHooks, instead of the direct path.',
        },
        {
          regex: '\\@dao\\-dao\\/state\\/recoil\\/selectors[^\'"]*',
          files: {
            // Don't replace in this file since the pattern appears above.
            ignore: 'import\\.js',
          },
          message:
            'Import from root @dao-dao/state instead of the direct path. If using contract client selectors, use a grouped export, such as CwCoreSelectors.',
        },
      ],
    ],
  },
}

module.exports = eslintConfig
