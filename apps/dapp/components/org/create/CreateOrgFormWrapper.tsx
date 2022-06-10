import { NextSeo } from 'next-seo'
import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { useRecoilValue } from 'recoil'

import i18n from '@dao-dao/i18n'
import { mountedInBrowserAtom } from '@dao-dao/state'
import { SubmitButton } from '@dao-dao/ui'

import { CreateOrgNav } from './CreateOrgNav'
import {
  createOrgFormPages,
  CreateOrgSubmitLabel,
  OrgFormPage,
} from '@/hooks/useCreateOrgForm'

type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>

interface CreateOrgFormWrapperProps
  extends RequireKeys<ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  children: ReactNode
  containerClassName?: string
  currentPageIndex: number
  currentPage: OrgFormPage
  creating: boolean
}

export const CreateOrgFormWrapper: FC<CreateOrgFormWrapperProps> = ({
  children,
  containerClassName,
  currentPageIndex,
  currentPage,
  creating,
  ...props
}) => {
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)

  const showBack = currentPageIndex > 0

  return (
    <div>
      <NextSeo
        openGraph={{
          title: i18n.t('Create a DAO'),
          description: i18n.t('Create a DAO'),
        }}
        title={i18n.t('Create a DAO')}
      />

      <form className="flex flex-row items-stretch" {...props}>
        {/* Ghost submit button for enter key press. */}
        <SubmitButton
          className="!p-0"
          disabled={!mountedInBrowser || creating}
          label=""
        />

        <div className="overflow-y-auto flex-1 p-6 w-full max-w-screen-lg">
          <div className="mb-8">
            <h2 className="mb-4 header-text">{i18n.t('Create a DAO')}</h2>

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

            <div
              className="flex flex-row items-center mt-8"
              // justify-end doesn't work in tailwind for some reason
              style={{
                justifyContent: showBack ? 'space-between' : 'flex-end',
              }}
            >
              {showBack && (
                <SubmitButton
                  disabled={creating}
                  label={CreateOrgSubmitLabel.Back}
                  variant="secondary"
                />
              )}
              <SubmitButton
                disabled={!mountedInBrowser || creating}
                label={
                  currentPageIndex < createOrgFormPages.length - 2
                    ? CreateOrgSubmitLabel.Continue
                    : // Second to last links to the Review page.
                    currentPageIndex === createOrgFormPages.length - 2
                    ? CreateOrgSubmitLabel.Review
                    : // Last page creates the org.
                      CreateOrgSubmitLabel.CreateOrg
                }
              />
            </div>
          </div>
        </div>

        <div className="hidden shrink-0 p-6 pr-20 border-l border-inactive md:block">
          <CreateOrgNav currentPageIndex={currentPageIndex} />
        </div>
      </form>
    </div>
  )
}
