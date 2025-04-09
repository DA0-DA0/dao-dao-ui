import { expect, test } from '@playwright/test'

import './setup'

test('status page renders', async ({ page }) => {
  await page.goto('/status')

  // Expect "Status" header to exist.
  await expect(
    page.locator('p.header-text').filter({ hasText: 'Status' })
  ).toBeVisible()
})
