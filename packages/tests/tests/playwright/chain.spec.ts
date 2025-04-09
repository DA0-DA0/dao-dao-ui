import { expect, test } from '@playwright/test'

import './setup'

test('chain home/proposals tab renders', async ({ page }) => {
  await page.goto('/dao/cosmos/proposals')

  // Expect title to exist.
  await expect(
    page.locator('.hero-text').filter({ hasText: 'Cosmos Hub' })
  ).toBeVisible()

  // Expect "New proposal" button to exist.
  await expect(page.getByText('New proposal', { exact: true })).toBeVisible()
})

test('chain treasury tab renders', async ({ page }) => {
  await page.goto('/dao/cosmos/treasury')

  // Expect title to exist.
  await expect(
    page.locator('.hero-text').filter({ hasText: 'Cosmos Hub' })
  ).toBeVisible()

  // Expect "Token" title to exist.
  await expect(page.getByText('Token', { exact: true })).toBeVisible()
})
