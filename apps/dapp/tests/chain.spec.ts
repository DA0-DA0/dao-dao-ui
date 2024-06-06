// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { expect, test } from '@playwright/test'

import './setup'

test('chain home/proposals tab renders', async ({ page }) => {
  await page.goto('/dao/juno/proposals')

  // Expect no 404 error.
  await expect(page.getByText('404: Not Found')).not.toBeVisible({
    timeout: 1000,
  })

  // Expect description to exist.
  await expect(
    page.getByText('Native chain governance for Juno Testnet.')
  ).toBeVisible()

  // Expect "New proposal" button to exist.
  await expect(page.getByText('New proposal', { exact: true })).toBeVisible()
})

test('chain treasury tab renders', async ({ page }) => {
  await page.goto('/dao/juno/treasury')

  // Expect no 404 error.
  await expect(page.getByText('404: Not Found')).not.toBeVisible({
    timeout: 1000,
  })

  // Expect description to exist.
  await expect(
    page.getByText('Native chain governance for Juno Testnet.')
  ).toBeVisible()

  // Expect "Token" title to exist.
  await expect(page.getByText('Token', { exact: true })).toBeVisible()
})
