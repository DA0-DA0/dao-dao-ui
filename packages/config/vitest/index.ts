import { ViteUserConfig, defaultExclude, defineConfig } from 'vitest/config'

export const vitestConfig: Required<
  Pick<
    Required<ViteUserConfig>['test'],
    | 'exclude'
    | 'setupFiles'
    | 'testTimeout'
    | 'hookTimeout'
    | 'server'
    | 'watch'
    | 'hideSkippedTests'
  >
> = {
  exclude: [...defaultExclude, '**/.next/**'],
  setupFiles: ['@dao-dao/config/vitest/setup.ts'],
  watch: false,
  hideSkippedTests: true,
  // 1 hour timeout for tests.
  testTimeout: 3_600_000,
  hookTimeout: 3_600_000,
  server: {
    deps: {
      inline: ['@cosmos-kit/web3auth'],
    },
  },
}

export default defineConfig({
  test: vitestConfig,
})
