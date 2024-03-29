// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

Sentry.init({
  dsn:
    SENTRY_DSN ||
    'https://95aedffa073842498f56b78b87162326@o1329776.ingest.sentry.io/4504573184966656',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0,

  // Only send errors to Sentry if production environment.
  enabled: process.env.NODE_ENV === 'production',
})
