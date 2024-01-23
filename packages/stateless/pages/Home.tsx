import { Search } from '@mui/icons-material'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import {
  DaoCardInfo,
  Feed,
  FeedProps,
  FollowingDaos,
  FollowingDaosProps,
  HorizontalScroller,
  HorizontalScrollerProps,
  IconButton,
  PageHeaderContent,
  RightSidebarContent,
  Tooltip,
} from '../components'

export type HomeProps = {
  featuredDaosProps: Pick<
    HorizontalScrollerProps<DaoCardInfo>,
    'Component' | 'items'
  >
  followingDaosProps: FollowingDaosProps
  rightSidebarContent: ReactNode
  feedProps: FeedProps
  connected: boolean
  openSearch: () => void
}

const maxWidth = 'mx-auto w-full max-w-5xl'
// Max width of 5xl = 64rem, container padding of 6 = 1.5rem
const widthOfSidePadding = 'w-[max((100%-64rem)/2,1.5rem)]'

export const Home = ({
  featuredDaosProps,
  rightSidebarContent,
  followingDaosProps,
  feedProps,
  connected,
  openSearch,
}: HomeProps) => {
  const { t } = useTranslation()

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeaderContent
        className={maxWidth}
        rightNode={
          <Tooltip title={t('title.search')}>
            <IconButton Icon={Search} onClick={openSearch} variant="none" />
          </Tooltip>
        }
        title={t('title.home')}
      />

      {/* Feed and Following DAOs*/}
      {connected && (
        <>
          <div className={clsx('mb-8', maxWidth)}>
            <Feed {...feedProps} />
          </div>

          <div className={maxWidth}>
            <FollowingDaos {...followingDaosProps} />
          </div>

          {/* Divider */}
          <div
            className={clsx('my-10 h-[1px] bg-border-secondary', maxWidth)}
          ></div>
        </>
      )}

      <div className="flex flex-col items-center gap-8">
        <p className={clsx('title-text', maxWidth)}>
          {t('title.featuredDaos')}
        </p>

        {/* Featured DAOs container */}
        <HorizontalScroller
          {...featuredDaosProps}
          // Margin offsets container padding.
          containerClassName={clsx(
            'self-stretch px-[1px]',
            !featuredDaosProps.items.loading &&
              featuredDaosProps.items.data.length === 0
              ? maxWidth
              : '-mx-6'
          )}
          itemClassName="w-64"
          shadowClassName={widthOfSidePadding}
        />
      </div>
    </>
  )
}
