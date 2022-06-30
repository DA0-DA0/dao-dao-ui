import { NextSeo } from 'next-seo'
import { ComponentPropsWithoutRef, FC, ReactNode } from 'react'
import { useRecoilValue } from 'recoil'

import { useTranslation } from '@dao-dao/i18n'
import { mountedInBrowserAtom } from '@dao-dao/state'
import { Button, SubmitButton } from '@dao-dao/ui'

import {
  CreateDAOSubmitLabel,
  DAOFormPage,
  useCreateDAOFormPages,
} from '@/hooks'

import { CreateDAONav } from './CreateDAONav'

type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>

interface CreateDAOFormWrapperProps
  extends RequireKeys<ComponentPropsWithoutRef<'form'>, 'onSubmit'> {
  children: ReactNode
  containerClassName?: string
  currentPageIndex: number
  currentPage: DAOFormPage
  creating: boolean
}

export const CreateDAOFormWrapper: FC<CreateDAOFormWrapperProps> = ({
  children,
  containerClassName,
  currentPageIndex,
  currentPage,
  creating,
  ...props
}) => {
  const { t } = useTranslation()
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)
  const createDAOFormPages = useCreateDAOFormPages()

  const showBack = currentPageIndex > 0

  const submitValue =
    currentPageIndex < createDAOFormPages.length - 2
      ? t(CreateDAOSubmitLabel.Continue)
      : // Second to last links to the Review page.
      currentPageIndex === createDAOFormPages.length - 2
      ? t(CreateDAOSubmitLabel.Review)
      : // Last page creates the DAO.
        t(CreateDAOSubmitLabel.CreateDAO)

  return (
    <div>
      <NextSeo
        openGraph={{
          title: t('title.createADAO'),
          // TODO: different description?
          description: t('title.createADAO'),
        }}
        title={t('title.createADAO')}
      />

      <form
        // SmallScreenNav is 4rem tall, so account for it on <lg screens.
        className="flex h-[calc(100vh-4rem)] flex-row items-stretch lg:h-screen"
        {...props}
      >
        {/* Ghost submit button for enter key press. */}
        <SubmitButton
          className="!p-0"
          disabled={!mountedInBrowser || creating}
          label=""
        />

        <div className="h-full w-full max-w-screen-lg flex-1 overflow-y-auto p-6">
          <div className="mb-8">
            <h2 className="header-text mb-4">{t('title.createADAO')}</h2>

            <div className="mb-10 md:hidden">
              <CreateDAONav currentPageIndex={currentPageIndex} />
            </div>

            <p className="primary-text">{currentPage.title}</p>
            {currentPage.subtitle && (
              <p className="secondary-text mt-1">{currentPage.subtitle}</p>
            )}
          </div>

          <div className={containerClassName}>
            {children}

            <div
              className="mt-8 flex flex-row items-center"
              // justify-end doesn't work in tailwind for some reason
              style={{
                justifyContent: showBack ? 'space-between' : 'flex-end',
              }}
            >
              {showBack && (
                <SubmitButton
                  disabled={creating}
                  label={t(CreateDAOSubmitLabel.Back)}
                  variant="secondary"
                />
              )}
              {/* SubmitButton (input tags) can't have children, so can't
               * display the loading spinner. */}
              <Button
                disabled={!mountedInBrowser}
                loading={creating}
                type="submit"
                value={submitValue}
              >
                {submitValue}
              </Button>
            </div>
          </div>
        </div>

        <div className="hidden shrink-0 border-l border-inactive p-6 pr-20 md:block">
          <CreateDAONav currentPageIndex={currentPageIndex} />
        </div>
      </form>
    </div>
  )
}
