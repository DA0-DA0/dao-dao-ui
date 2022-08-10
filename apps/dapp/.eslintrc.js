// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: [require.resolve('@dao-dao/config/eslint')],
  ignorePatterns: ['.next', '.turbo', 'node_modules', 'out'],
  root: true,
  plugins: ['header'],
  rules: {
    'header/header': [
      'error',
      'line',
      ' GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.\n See the "LICENSE" file in the root directory of this package for more copyright information.',
      1,
    ],
  },
}

module.exports = eslintConfig
