/* eslint-disable i18next/no-literal-string */

// This is intended to be used as the Next.js `_error.tsx` file. It captures
// errors with Sentry and renders a custom error page.
//
// `_error` cannot load `getServerSideProps`, so we cannot load translations.
// See https://nextjs.org/docs/advanced-features/custom-error-page#caveats

import * as Sentry from '@sentry/nextjs'
import { NextPageContext } from 'next'
import NextErrorComponent from 'next/error'
import { useEffect } from 'react'

import { processError } from '@dao-dao/utils'

import { ButtonLink } from '../buttons/ButtonLink'
import { ErrorPage } from './ErrorPage'

interface NextSentryErrorPageProps {
  statusCode?: number
  error?: string
}

export const NextSentryErrorPage = ({
  statusCode,
  error,
}: NextSentryErrorPageProps) => {
  useEffect(() => {
    error && console.error(error)
  }, [error])

  return (
    <ErrorPage
      title={`${statusCode ?? 'Unknown status'}: ${
        (statusCode && statusCodes[statusCode]) || 'Unknown error'
      }`}
    >
      {/* Cannot access translations on this page. */}
      <p className="title-text">An error occured on this page.</p>

      <ButtonLink href="/" variant="secondary">
        Return home
      </ButtonLink>

      {error && (
        <pre className="whitespace-pre-wrap text-xs text-text-interactive-error">
          {error}
        </pre>
      )}
    </ErrorPage>
  )
}

NextSentryErrorPage.getInitialProps = async (
  context: NextPageContext
): Promise<NextSentryErrorPageProps> => {
  // In case this is running in a serverless function, await this in order to
  // give Sentry time to send the error before the lambda exits.
  await Sentry.captureUnderscoreErrorException({
    res: context.res,
    err: context.err,
  })

  // This will contain the status code of the response.
  return {
    ...(await NextErrorComponent.getInitialProps(context)),
    // If error present, process with error recognizer without sending to
    // Sentry, since we already capture it above.
    ...(context.err && {
      error: processError(context.err, { forceCapture: false }),
    }),
  }
}

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'Not Found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
}
