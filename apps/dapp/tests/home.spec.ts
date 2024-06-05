// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { expect, test } from '@playwright/test'

import './setup'

test('home page renders', async ({ page }) => {
  await page.goto('/')

  // Expect "Log in" button to exist.
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()

  // Expect "Chain governance" title to exist.
  await expect(
    page.getByText('Chain governance', { exact: true })
  ).toBeVisible()

  // Expect "Featured DAOs" title to exist.
  await expect(page.getByText('Featured DAOs', { exact: true })).toBeVisible()
})

test('chain-specific home page renders', async ({ page }) => {
  await page.goto('/juno')

  // Expect "Log in" button to exist.
  await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible()

  // Expect "Chain governance" title to exist.
  await expect(
    page.getByText('Chain governance', { exact: true })
  ).toBeVisible()

  // Expect "Featured DAOs" title to exist.
  await expect(page.getByText('Featured DAOs', { exact: true })).toBeVisible()
})
