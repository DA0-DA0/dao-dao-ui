import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ErrorPage, SuspenseLoader } from '@dao-dao/ui'

const Custom500: NextPage = () => {
  const router = useRouter()

  /* Only render page once mounted in browser (via SuspenseLoader) to
   * prevent hydration error. Server renders router.asPath as `/404`
   * but client renders router.asPath as the redirected/invalid
   * route.
   */
  return (
    <SuspenseLoader fallback={null}>
      <ErrorPage title="500 - Internal Server Error">
        <p>
          An internal server error occured while trying to access{' '}
          <code>{router.asPath}</code>. Consider returning{' '}
          <Link href="/">
            <a className="link">home</a>
          </Link>
        </p>
      </ErrorPage>
    </SuspenseLoader>
  )
}

export default Custom500
