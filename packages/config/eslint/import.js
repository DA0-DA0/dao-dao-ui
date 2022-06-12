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
          regex: '@/../../packages',
          replacement: '@dao-dao',
          // Don't replace in this file since the pattern appears above.
          files: {
            ignore: 'import.js',
          },
          message:
            'Import from @dao-dao/* instead of using a relative path (i.e. replace "@/../../packages" with "@dao-dao").',
        },
      ],
    ],
  },
}

module.exports = eslintConfig
