import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Custom404: NextPage = () => {
  const router = useRouter()

  return (
    <div className="p-6 max-w-prose break-words">
      <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
      <p className="mt-3">
        We couldn{"'"}t find <code>{router.asPath}</code>. Consider returning{' '}
        <Link href="/">
          <a className="link">home</a>
        </Link>
      </p>
    </div>
  )
}

export default Custom404
