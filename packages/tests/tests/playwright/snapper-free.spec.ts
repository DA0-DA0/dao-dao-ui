import { existsSync, readFileSync } from 'fs'
import path from 'path'

import { expect, test } from '@playwright/test'

const dao = 'juno10h0hc64jv006rr8qy0zhlu4jsxct8qwa0vtaleayh0ujz0zynf2s2r7v8q'

test('read-only home and treasury never attempt legacy providers or broadcasts', async ({
  page,
  context,
}, testInfo) => {
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
      await route.abort()
    } else if (
      /broadcast_tx|BroadcastTx/.test(request.url()) ||
      (/\/cosmos\/tx\/v1beta1\/txs/.test(request.url()) &&
        request.method() === 'POST') ||
      /"method"\s*:\s*"broadcast_tx/.test(request.postData() || '')
    ) {
      broadcasts.push(request.url())
      await route.abort()
    } else await route.continue()
  })
  await page.addInitScript(() =>
    localStorage.setItem('betaWarningAccepted', 'true')
  )
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
  expect(pageErrors).toEqual([])
  expect(legacyRequests).toEqual([])
  expect(broadcasts).toEqual([])
  const serverLog = path.join(
    process.env.SMOKE_ARTIFACT_DIR ||
      path.resolve(__dirname, '../../../../test-results/snapper-free'),
    `${testInfo.project.name}-legacy.log`
  )
  expect(existsSync(serverLog) ? readFileSync(serverLog, 'utf8') : '').toBe('')
})
