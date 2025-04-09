import { expect, test } from '@playwright/test'

import './setup'

test('create DAO page renders', async ({ page }) => {
  await page.goto('/dao/create')

  // Expect "New DAO" header to exist.
  await expect(
    page.locator('div.header-text').filter({ hasText: 'New DAO' }).first()
  ).toBeVisible()

  // Expect "Log in" button to exist.
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()

  // Expect "Continue" button to exist.
  await expect(page.getByRole('button', { name: 'Continue' })).toBeVisible()
})
