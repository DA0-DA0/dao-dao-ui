module.exports = {
  extends: [
    'next/core-web-vitals',
    // configures both eslint-plugin-prettier and eslint-config-prettier
    'plugin:prettier/recommended'
  ],
  plugins: ['import', 'unused-imports'],

  settings: {
    next: {
      rootDir: ['apps/*/', 'packages/*/'],
    },
  },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'prettier/prettier': 'error',
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal'],
        pathGroups: [
          {
            pattern: 'recoil',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '{next,next/**}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
            patternOptions: { nocomment: false },
          },
          {
            pattern: '@components',
            group: 'external',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', '{next,next/**}', 'recoil'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}
