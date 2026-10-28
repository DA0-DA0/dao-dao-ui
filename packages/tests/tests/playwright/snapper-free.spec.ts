import { existsSync, readFileSync } from 'fs'
import path from 'path'

import { test as base, expect } from '@playwright/test'

import {
  PriceScenario,
  pricingFixtureResponse,
} from '../../helpers/snapperFreePricing'

// These scenarios run the real app page and providers, substituting only public
// read responses. The fixture is not an alternative app or a signing wallet.
const test = base.extend<{
  priceScenario: PriceScenario | null
  safeNetwork: void
}>({
  priceScenario: [null, { option: true }],
  safeNetwork: [
    async ({ page, context, priceScenario }, use, testInfo) => {
      const legacyRequests: string[] = []
      const broadcasts: string[] = []
      const pageErrors: string[] = []
      page.on('pageerror', (error) => pageErrors.push(error.message))
      await context.route('**/*', async (route) => {
        const request = route.request()
        const url = new URL(request.url())
        if (
          url.hostname === 'snapper.indexer.zone' ||
          url.hostname === 'coingecko.com' ||
          url.hostname.endsWith('.coingecko.com')
        ) {
          legacyRequests.push(request.url())
          return route.abort()
        }
        if (
          /broadcast_tx|BroadcastTx/.test(request.url()) ||
          (/\/cosmos\/tx\/v1beta1\/txs/.test(request.url()) &&
            request.method() === 'POST') ||
          /"method"\s*:\s*"broadcast_tx/.test(request.postData() || '')
        ) {
          broadcasts.push(request.url())
          return route.abort()
        }
        let body: unknown
        try {
          body = request.postDataJSON()
        } catch {
          /* Not JSON. */
        }
        const fixture =
          priceScenario && pricingFixtureResponse(url, body, priceScenario)
        if (fixture)
          return route.fulfill({
            status: fixture.status,
            contentType: 'application/json',
            headers: { 'access-control-allow-origin': '*' },
            body: JSON.stringify(fixture.body),
          })
        return route.continue()
      })
      await page.addInitScript(() =>
        localStorage.setItem('betaWarningAccepted', 'true')
      )
      await use()
      expect(pageErrors).toEqual([])
      expect(legacyRequests).toEqual([])
      expect(broadcasts).toEqual([])
      const serverLog = path.join(
        process.env.SMOKE_ARTIFACT_DIR ||
          path.resolve(__dirname, '../../../../test-results/snapper-free'),
        `${testInfo.project.name}-legacy.log`
      )
      expect(existsSync(serverLog) ? readFileSync(serverLog, 'utf8') : '').toBe(
        ''
      )
    },
    { auto: true },
  ],
})

const dao = 'juno10h0hc64jv006rr8qy0zhlu4jsxct8qwa0vtaleayh0ujz0zynf2s2r7v8q'
test('read-only home and treasury never attempt legacy providers or broadcasts', async ({
  page,
}, testInfo) => {
  const prefix = testInfo.project.name === 'sda' ? '' : '/dao'
  if (testInfo.project.name === 'dapp') {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.getByText('Featured DAOs', { exact: true })).toBeVisible()
    await expect(page.getByText('N/A', { exact: true }).first()).toBeVisible()
  }
  await page.goto(`${prefix}/${dao}/treasury`, {
    waitUntil: 'domcontentloaded',
  })
  await expect(
    page.getByText('Treasury', { exact: true }).first()
  ).toBeVisible()
  await expect(page.locator('body')).not.toContainText('Internal Server Error')
})

for (const scenario of ['fresh', 'stale', 'outage'] as const)
  test.describe(`governance pool prices: ${scenario}`, () => {
    test.use({ priceScenario: scenario })
    test('native and IBC balances survive missing or expired USD prices', async ({
      page,
    }, testInfo) => {
      const prefix = testInfo.project.name === 'sda' ? '' : '/dao'
      await page.goto(`${prefix}/cosmos/treasury`, {
        waitUntil: 'domcontentloaded',
      })
      await expect(
        page.locator('.hero-text').filter({ hasText: 'Cosmos Hub' })
      ).toBeVisible()
      for (const [symbol, amount, usd] of [
        ['ATOM', '1', '$2.00'],
        ['OSMO', '2', '$0.50'],
        ['UNPRICED', '3', null],
      ] as const) {
        const row = page
          .locator('.box-content.grid')
          .filter({ has: page.getByText(symbol, { exact: true }) })
        await expect(row).toBeVisible()
        await expect(row.locator('.body-text')).toHaveText(amount)
        if (scenario === 'fresh' && usd) await expect(row).toContainText(usd)
        else {
          await expect(row).toContainText('USD estimate unavailable')
          await expect(row).not.toContainText('$')
        }
      }
    })
  })
