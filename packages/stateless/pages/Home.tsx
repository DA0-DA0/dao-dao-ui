import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { DaoCardInfo } from '@dao-dao/types'
import { UNDO_PAGE_PADDING_HORIZONTAL_CLASSES } from '@dao-dao/utils'

import {
  Feed,
  FeedProps,
  FollowingDaos,
  FollowingDaosProps,
  HorizontalScroller,
  HorizontalScrollerProps,
} from '../components'

export type HomeProps = {
  featuredDaosProps: Pick<
    HorizontalScrollerProps<DaoCardInfo>,
    'Component' | 'items'
  >
  followingDaosProps: FollowingDaosProps
  feedProps: FeedProps
  connected: boolean
}

// Max width of 5xl = 64rem, container padding of 6 = 1.5rem
const widthOfSidePadding = 'w-[max((100%-64rem)/2,1.5rem)]'

export const Home = ({
  featuredDaosProps,
  followingDaosProps,
  feedProps,
  connected,
}: HomeProps) => {
  const { t } = useTranslation()

  return (
    <>
      {/* Feed and Following DAOs*/}
      {connected && (
        <>
          <div className="mb-8 w-full">
            <Feed {...feedProps} />
          </div>

          <FollowingDaos {...followingDaosProps} />

          {/* Divider */}
          <div className="my-10 h-[1px] w-full bg-border-secondary"></div>
        </>
      )}

      <div className="flex flex-col items-center gap-4">
        <p className="title-text self-start text-lg">
          {t('title.featuredDaos')}
        </p>

        {/* Featured DAOs container */}
        <HorizontalScroller
          {...featuredDaosProps}
          // Margin offsets container padding.
          containerClassName={clsx(
            'self-stretch px-[1px]',
            (featuredDaosProps.items.loading ||
              featuredDaosProps.items.data.length > 0) &&
              UNDO_PAGE_PADDING_HORIZONTAL_CLASSES
          )}
          itemClassName="w-64"
          shadowClassName={widthOfSidePadding}
        />
      </div>
    </>
  )
}
