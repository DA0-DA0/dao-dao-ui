// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

// _error cannot load `getServerSideProps`, so we cannot load translations for a
// 500 internal server error. See
// https://nextjs.org/docs/advanced-features/custom-error-page#caveats
/* eslint-disable i18next/no-literal-string */

/**
 * This page is loaded by Nextjs:
 *  - on the server, when data-fetching methods throw or reject
 *  - on the client, when `getInitialProps` throws or rejects
 *  - on the client, when a React lifecycle method throws or rejects, and it's
 *    caught by the built-in Nextjs error boundary
 *
 * See:
 *  - https://nextjs.org/docs/basic-features/data-fetching/overview
 *  - https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
 *  - https://reactjs.org/docs/error-boundaries.html
 */

import * as Sentry from '@sentry/nextjs'
import { NextPageContext } from 'next'
import NextErrorComponent from 'next/error'
import Link from 'next/link'
import { useEffect } from 'react'

import { ErrorPage } from '@dao-dao/ui'
import { processError } from '@dao-dao/utils'

interface CustomErrorComponentProps {
  statusCode?: number
  error?: string
}

const CustomErrorComponent = ({
  statusCode,
  error,
}: CustomErrorComponentProps) => {
  useEffect(() => {
    error && console.error(error)
  }, [error])

  return (
    <ErrorPage
      title={`${statusCode ?? 'Unknown status'}: ${
        (statusCode && statusCodes[statusCode]) || 'Unknown error'
      }`}
    >
      <p>
        An error occured on this page.{' '}
        <Link href="/home">
          <a className="underline hover:no-underline">
            Consider returning home.
          </a>
        </Link>
      </p>

      {error && (
        <pre className="mt-6 text-xs text-error whitespace-pre-wrap">
          {error}
        </pre>
      )}
    </ErrorPage>
  )
}

CustomErrorComponent.getInitialProps = async (
  context: NextPageContext
): Promise<CustomErrorComponentProps> => {
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

export default CustomErrorComponent

const statusCodes: { [code: number]: string } = {
  400: 'Bad Request',
  404: 'Not Found',
  405: 'Method Not Allowed',
  500: 'Internal Server Error',
}
