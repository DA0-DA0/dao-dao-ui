import { defineConfig } from 'vitest/config'

import { vitestConfig } from './packages/config/vitest'

export default defineConfig({
  test: {
    workspace: [
      'packages/*',
      // Integration tests in packages/tests depend on running a local chain and
      // should not be run in CI.
      '!packages/tests'
    ],
    ...vitestConfig,
  },
})
