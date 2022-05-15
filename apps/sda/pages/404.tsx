import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ErrorPage } from '@dao-dao/ui'

import { Header, SuspenseLoader } from '@/components'

const Custom404: NextPage = () => {
  const router = useRouter()

  return (
    <>
      <Header />

      {/* Only render page once mounted in browser (via SuspenseLoader) to
       * prevent hydration error. Server renders router.asPath as `/404`
       * but client renders router.asPath as the redirected/invalid
       * route.
       */}
      <SuspenseLoader fallback={null}>
        <ErrorPage title="404 - Page Not Found">
          <p>
            We couldn{"'"}t find <code>{router.asPath}</code>. Consider
            returning{' '}
            <Link href="/">
              <a className="underline link-text">home</a>
            </Link>
            .
          </p>
        </ErrorPage>
      </SuspenseLoader>
    </>
  )
}

export default Custom404
