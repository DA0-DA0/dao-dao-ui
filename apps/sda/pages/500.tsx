import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Header, SuspenseLoader } from '@/components'

const Custom500: NextPage = () => {
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
        <div className="mx-auto mt-4 max-w-prose text-center break-words">
          <h1 className="text-3xl font-bold">500 - Internal Server Error</h1>
          <p className="mt-3">
            An internal server error occurred while trying to access{' '}
            <code>{router.asPath}</code>. Consider returning{' '}
            <Link href="/">
              <a className="underline link-text">home</a>
            </Link>
            .
          </p>
        </div>
      </SuspenseLoader>
    </>
  )
}

export default Custom500
