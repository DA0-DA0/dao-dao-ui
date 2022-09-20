import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import {
  FeaturedDaos,
  FeaturedDaosProps,
  PageHeader,
  PinnedDaos,
  PinnedDaosProps,
  useAppLayoutContext,
} from '../components'

export type HomeProps = {
  featuredDaosProps: FeaturedDaosProps
  rightSidebarContent: ReactNode
} & (
  | {
      connected: false
    }
  | ({
      connected: true
    } & PinnedDaosProps)
)

const maxWidth = 'mx-auto w-full max-w-5xl'
// Max width of 5xl = 64rem, container padding of 6 = 1.5rem
const widthOfSidePadding = 'w-[max((100%-64rem)/2,1.5rem)]'

export const Home = ({
  featuredDaosProps,
  rightSidebarContent,
  ...props
}: HomeProps) => {
  const { t } = useTranslation()
  const { RightSidebarContent } = useAppLayoutContext()

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>

      <div className="flex flex-col gap-8 items-center px-6">
        <PageHeader className={maxWidth} title={t('title.home')} />

        <p className={clsx('title-text', maxWidth)}>
          {t('title.featuredDaos')}
        </p>

        {/* Featured DAOs container */}
        {/* Margin offsets container padding. */}
        <div className="relative self-stretch px-[1px] -mx-6">
          {/* Left shadow */}
          <div
            className={clsx(
              'absolute top-0 bottom-0 left-0 z-10',
              widthOfSidePadding
            )}
            style={{
              background:
                'linear-gradient(to left, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
            }}
          ></div>

          <FeaturedDaos {...featuredDaosProps} />

          {/* Right shadow */}
          <div
            className={clsx(
              'absolute top-0 right-0 bottom-0 z-10',
              widthOfSidePadding
            )}
            style={{
              background:
                'linear-gradient(to right, rgba(var(--color-background-base), 0), rgba(var(--color-background-base), 1) 100%)',
            }}
          ></div>
        </div>

        {/* Pinned DAOs */}
        {props.connected && (
          <div className={clsx('flex flex-col gap-8', maxWidth)}>
            {/* Divider */}
            <div className="h-[1px] bg-border-secondary"></div>

            <PinnedDaos
              {...{
                ...props,
                connected: undefined,
              }}
            />
          </div>
        )}
      </div>
    </>
  )
}
