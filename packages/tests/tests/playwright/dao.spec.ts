import { expect, test } from '@playwright/test'

import './setup'

test('DAO home tab renders', async ({ page }) => {
  await page.goto(
    '/dao/cosmos1cp28gxjul0eht3axzdd5npxq7zqzy07r9y36rnsdf3r4s2g6d8hszw5k3s'
  )

  // Expect description to exist.
  await expect(page.getByText('Worship the moon.')).toBeVisible()
})

test('DAO proposals tab renders', async ({ page }) => {
  await page.goto(
    '/dao/cosmos1cp28gxjul0eht3axzdd5npxq7zqzy07r9y36rnsdf3r4s2g6d8hszw5k3s/proposals'
  )

  // Expect description to exist.
  await expect(page.getByText('Worship the moon.')).toBeVisible()

  // Expect "New proposal" button to exist.
  await expect(page.getByText('New proposal', { exact: true })).toBeVisible()
})

test('DAO treasury tab renders', async ({ page }) => {
  await page.goto(
    '/dao/cosmos1cp28gxjul0eht3axzdd5npxq7zqzy07r9y36rnsdf3r4s2g6d8hszw5k3s/treasury'
  )

  // Expect no 404 error.
  await expect(page.getByText('404: Not Found')).not.toBeVisible({
    timeout: 1000,
  })

  // Expect description to exist.
  await expect(page.getByText('Worship the moon.')).toBeVisible()

  // Expect "Copy address" button to exist.
  await expect(page.getByText('Copy address', { exact: true })).toBeVisible()

  // Expect "Tokens" title to exist.
  await expect(page.getByText('Tokens', { exact: true })).toBeVisible()
})

test('DAO subDAOs tab renders', async ({ page }) => {
  await page.goto(
    '/dao/cosmos1cp28gxjul0eht3axzdd5npxq7zqzy07r9y36rnsdf3r4s2g6d8hszw5k3s/subdaos'
  )

  // Expect description to exist.
  await expect(page.getByText('Worship the moon.')).toBeVisible()

  // Expect "New SubDAO" button to exist.
  await expect(page.getByText('New SubDAO', { exact: true })).toBeVisible()
})

test('DAO members tab renders', async ({ page }) => {
  await page.goto(
    '/dao/cosmos1cp28gxjul0eht3axzdd5npxq7zqzy07r9y36rnsdf3r4s2g6d8hszw5k3s/members'
  )

  // Expect description to exist.
  await expect(page.getByText('Worship the moon.')).toBeVisible()

  // Expect member voting power title to exist.
  await expect(
    page.getByText('Voting power', { exact: true }).first()
  ).toBeVisible()
})

test('DAO apps tab renders', async ({ page }) => {
  await page.goto(
    '/dao/cosmos1cp28gxjul0eht3axzdd5npxq7zqzy07r9y36rnsdf3r4s2g6d8hszw5k3s/apps'
  )

  // Expect description to exist.
  await expect(page.getByText('Worship the moon.')).toBeVisible()

  // Expect open app button to exist.
  await expect(
    page.getByRole('button', { name: 'Open app' }).first()
  ).toBeVisible()
})
