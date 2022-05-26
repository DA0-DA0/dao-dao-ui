import clsx from 'clsx'
import { NextSeo } from 'next-seo'
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
            // react-hook-form requires a submit button to be pressed to
            // update the fields of the form in the onSubmit handler.
            // If these header links are used for navigation, the form will
            // not save any changes made to the fields. Thus, let's just
            // not make these links and force the user to use buttons.
            <p
              key={href}
              className={clsx({
                'text-disabled': href !== pathname,
              })}
            >
              {label}
            </p>
          ))}
        </div>
      </div>
    </>
  )
}
