// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { expect, test } from '@playwright/test'

import './setup'

test('status page renders', async ({ page }) => {
  await page.goto('/status')

  // Expect "Status" header to exist.
  await expect(
    page.locator('p.header-text').filter({ hasText: 'Status' })
  ).toBeVisible()
})
