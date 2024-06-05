// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { expect, test } from '@playwright/test'

import './setup'

test('DAO home tab renders', async ({ page }) => {
  await page.goto(
    '/dao/juno1vh0xndu9pj8g0lat6k3500mxusfduh804sf9hj7jpt4kgj0gmreq3jmqj4'
  )

  // Expect no 404 error.
  await expect(page.getByText('404: Not Found')).not.toBeVisible({
    timeout: 5000,
  })

  // Expect description to exist.
  await expect(page.getByText('Worship the moon.')).toBeVisible()
})

test('DAO proposals tab renders', async ({ page }) => {
  await page.goto(
    '/dao/juno1vh0xndu9pj8g0lat6k3500mxusfduh804sf9hj7jpt4kgj0gmreq3jmqj4/proposals'
  )

  // Expect no 404 error.
  await expect(page.getByText('404: Not Found')).not.toBeVisible({
    timeout: 5000,
  })

  // Expect description to exist.
  await expect(page.getByText('Worship the moon.')).toBeVisible()

  // Expect "New proposal" button to exist.
  await expect(page.getByText('New proposal', { exact: true })).toBeVisible()
})

test('DAO treasury tab renders', async ({ page }) => {
  await page.goto(
    '/dao/juno1vh0xndu9pj8g0lat6k3500mxusfduh804sf9hj7jpt4kgj0gmreq3jmqj4/treasury'
  )

  // Expect no 404 error.
  await expect(page.getByText('404: Not Found')).not.toBeVisible({
    timeout: 5000,
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
    '/dao/juno1vh0xndu9pj8g0lat6k3500mxusfduh804sf9hj7jpt4kgj0gmreq3jmqj4/subdaos'
  )

  // Expect no 404 error.
  await expect(page.getByText('404: Not Found')).not.toBeVisible({
    timeout: 5000,
  })

  // Expect description to exist.
  await expect(page.getByText('Worship the moon.')).toBeVisible()

  // Expect "New SubDAO" button to exist.
  await expect(page.getByText('New SubDAO', { exact: true })).toBeVisible()
})

test('DAO members tab renders', async ({ page }) => {
  await page.goto(
    '/dao/juno1vh0xndu9pj8g0lat6k3500mxusfduh804sf9hj7jpt4kgj0gmreq3jmqj4/members'
  )

  // Expect no 404 error.
  await expect(page.getByText('404: Not Found')).not.toBeVisible({
    timeout: 5000,
  })

  // Expect description to exist.
  await expect(page.getByText('Worship the moon.')).toBeVisible()

  // Expect member voting power title to exist.
  await expect(
    page.getByText('Voting power', { exact: true }).first()
  ).toBeVisible()
})

test('DAO apps tab renders', async ({ page }) => {
  await page.goto(
    '/dao/juno1vh0xndu9pj8g0lat6k3500mxusfduh804sf9hj7jpt4kgj0gmreq3jmqj4/apps'
  )

  // Expect no 404 error.
  await expect(page.getByText('404: Not Found')).not.toBeVisible({
    timeout: 5000,
  })

  // Expect description to exist.
  await expect(page.getByText('Worship the moon.')).toBeVisible()

  // Expect member voting power title to exist.
  await expect(page.getByRole('button', { name: 'Go' }).first()).toBeVisible()
})
