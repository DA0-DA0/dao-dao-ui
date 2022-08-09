/* eslint-disable i18next/no-literal-string */
import type { NextPage } from 'next'
import Link from 'next/link'

import { ErrorPage, SuspenseLoader } from '@dao-dao/ui'

// _error cannot load `getServerSideProps`, so we cannot load translations for a
// 500 internal server error.
// See https://nextjs.org/docs/advanced-features/custom-error-page#caveats

const Custom500: NextPage = () => (
  <SuspenseLoader fallback={null}>
    <ErrorPage title="500 - Internal Server Error">
      <p>
        An internal server error occured on this page.{' '}
        <Link href="/home">
          <a className="underline hover:no-underline">
            Consider returning home.
          </a>
        </Link>
      </p>
    </ErrorPage>
  </SuspenseLoader>
)

export default Custom500
