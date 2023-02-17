import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoCardInfo,
  FollowingDaos,
  FollowingDaosProps,
  HorizontalScroller,
  HorizontalScrollerProps,
  useAppContext,
} from '../components'

export type HomeProps = {
  featuredDaosProps: Pick<
    HorizontalScrollerProps<DaoCardInfo>,
    'Component' | 'items'
  >
  followingDaosProps: FollowingDaosProps
  rightSidebarContent: ReactNode
  connected: boolean
}

const maxWidth = 'mx-auto w-full max-w-5xl'
// Max width of 5xl = 64rem, container padding of 6 = 1.5rem
const widthOfSidePadding = 'w-[max((100%-64rem)/2,1.5rem)]'

export const Home = ({
  featuredDaosProps,
  rightSidebarContent,
  followingDaosProps,
  connected,
}: HomeProps) => {
  const { t } = useTranslation()
  const { RightSidebarContent, PageHeader } = useAppContext()

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeader className={maxWidth} title={t('title.home')} />

      <div className="flex flex-col items-center gap-8">
        <p className={clsx('title-text', maxWidth)}>
          {t('title.featuredDaos')}
        </p>

        {/* Featured DAOs container */}
        <HorizontalScroller
          {...featuredDaosProps}
          // Margin offsets container padding.
          containerClassName="-mx-6 self-stretch px-[1px]"
          itemClassName="w-64"
          shadowClassName={widthOfSidePadding}
        />

        {/* Following DAOs */}
        {connected && (
          <>
            {/* Divider */}
            <div
              className={clsx('h-[1px] bg-border-secondary', maxWidth)}
            ></div>

            <div className={clsx('flex flex-col gap-8', maxWidth)}>
              <FollowingDaos {...followingDaosProps} />
            </div>
          </>
        )}
      </div>
    </>
  )
}
