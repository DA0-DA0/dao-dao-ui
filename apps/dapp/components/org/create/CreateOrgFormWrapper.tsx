import { NextSeo } from 'next-seo'
import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'

import { CreateOrgNav } from './CreateOrgNav'
import { OrgFormPage } from '@/hooks/useCreateOrgForm'

type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>

interface CreateOrgFormWrapperProps
  extends RequireKeys<ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  children: ReactNode
  Navigation: ReactNode
  containerClassName?: string
  currentPageIndex: number
  currentPage: OrgFormPage
}

export const CreateOrgFormWrapper: FC<CreateOrgFormWrapperProps> = ({
  children,
  Navigation,
  containerClassName,
  currentPageIndex,
  currentPage,
  ...props
}) => (
  <>
    <NextSeo
      openGraph={{
        title: 'Create an org',
        description: 'Create a new organization.',
      }}
      title="Create an org"
    />

    <form className="flex flex-row items-stretch" {...props}>
      <div className="overflow-y-auto flex-1 p-6 mx-auto w-full max-w-[800px] h-screen">
        <div className="mb-8">
          <h2 className="mb-4 header-text">Create an org</h2>

          <div className="mb-10 md:hidden">
            <CreateOrgNav currentPageIndex={currentPageIndex} />
          </div>

          <p className="primary-text">{currentPage.title}</p>
          {currentPage.subtitle && (
            <p className="mt-1 secondary-text">{currentPage.subtitle}</p>
          )}
        </div>

        <div className={containerClassName}>
          {children}

          {Navigation}
        </div>
      </div>

      <div className="hidden shrink-0 p-6 pr-20 border-l border-inactive md:block">
        <CreateOrgNav currentPageIndex={currentPageIndex} />
      </div>
    </form>
  </>
)
