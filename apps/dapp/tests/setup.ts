// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

/**
 * Set up tests.
 */

import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    // Mark beta warning as approved so it doesn't appear and block the rest of
    // the page.
    window.localStorage.setItem('betaWarningAccepted', 'true')
  })
})
