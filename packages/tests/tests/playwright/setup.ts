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
