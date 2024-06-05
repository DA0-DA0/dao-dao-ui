// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

/** @type {import('ts-jest/dist/types').JestConfigWithTsJest} */
module.exports = {
  moduleDirectories: ['node_modules', '<rootDir>'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    // playwright e2e tests, not jest. jest unit tests are spread throughout
    '<rootDir>/apps/dapp/tests/'
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
}
