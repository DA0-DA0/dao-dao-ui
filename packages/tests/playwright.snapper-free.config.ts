import { readFileSync } from 'fs'
import path from 'path'

import { defineConfig, devices } from '@playwright/test'
import { parse } from 'dotenv'

// One app per invocation to bound compiler memory; run once with each value.
const app = process.env.SNAPPER_FREE_APP === 'sda' ? 'sda' : 'dapp'
const root = path.resolve(__dirname, '../..')
const port = app === 'sda' ? 3001 : 3000
const artifacts =
  process.env.SMOKE_ARTIFACT_DIR || path.join(root, 'test-results/snapper-free')

export default defineConfig({
  testDir: './tests/playwright',
  testMatch: 'snapper-free.spec.ts',
  outputDir: artifacts,
  reporter: 'list',
  workers: 1,
  timeout: Number(process.env.SNAPPER_FREE_TIMEOUT_MS) || 120_000,
  expect: { timeout: 30_000 },
  use: {
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
    baseURL: `http://127.0.0.1:${port}`,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: app, use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `pnpm ${app} exec next dev --hostname 0.0.0.0 --port ${port}`,
    cwd: root,
    url: `http://127.0.0.1:${port}/favicon.ico`,
    timeout: 120_000,
    reuseExistingServer: false,
    stdout: 'pipe',
    stderr: 'pipe',
    env: {
      ...parse(readFileSync(path.join(root, `apps/${app}/.env.mainnet`))),
      NODE_OPTIONS: `--max-old-space-size=4096 --require=${root}/packages/tests/helpers/denyLegacyProviders.cjs`,
      LEGACY_PROVIDER_LOG: path.join(artifacts, `${app}-legacy.log`),
    },
  },
})
