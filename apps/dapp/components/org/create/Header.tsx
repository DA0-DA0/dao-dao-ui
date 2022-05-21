import clsx from 'clsx'
import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { createOrgFormPages } from '@/hooks/useCreateOrgForm'

export const CreateOrgHeader: FC = () => {
  const { pathname } = useRouter()

  return (
    <>
      <NextSeo
        openGraph={{
          title: 'Create Org',
          description: 'Create a new organization.',
        }}
        title="Create Org"
      />

      <div className="p-6">
        <h2 className="mb-4 header-text">Creation</h2>

        <div className="flex flex-col gap-2 justify-between items-start max-w-xl sm:flex-row sm:items-center">
          {createOrgFormPages.map(({ href, label }) => (
            <Link key={href} href={href}>
              <a
                className={clsx({
                  'text-disabled': href !== pathname,
                })}
              >
                {label}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
