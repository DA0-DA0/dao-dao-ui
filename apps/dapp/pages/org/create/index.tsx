import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { FC } from 'react'

import { SmallScreenNav } from '@/components/SmallScreenNav'

export const OrgCreatePage: FC = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          title: 'Create Org',
          description: 'Create a new organization.',
        }}
        title="Create Org"
      />

      <SmallScreenNav />

      <div className="p-6">
        <h2 className="mb-4 header-text">Creation</h2>

        <div className="flex flex-col gap-2 justify-between items-start max-w-xl sm:flex-row sm:items-center">
          <Link href="/create">
            <a className="">1. Describe your org</a>
          </Link>
          <Link href="/create/voting">
            <a className="text-disabled">2. Configure voting</a>
          </Link>
          <Link href="/create/review">
            <a className="text-disabled">3. Review and submit</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default OrgCreatePage
