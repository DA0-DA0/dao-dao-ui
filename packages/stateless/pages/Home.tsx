import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import {
  DaoCardInfo,
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

export const HOME_MAX_WIDTH = 'mx-auto w-full max-w-5xl'
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
          <div className={clsx('mb-8', HOME_MAX_WIDTH)}>
            <Feed {...feedProps} />
          </div>

          <div className={HOME_MAX_WIDTH}>
            <FollowingDaos {...followingDaosProps} />
          </div>

          {/* Divider */}
          <div
            className={clsx(
              'my-10 h-[1px] bg-border-secondary',
              HOME_MAX_WIDTH
            )}
          ></div>
        </>
      )}

      <div className="flex flex-col items-center gap-8">
        <p className={clsx('title-text', HOME_MAX_WIDTH)}>
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
              ? HOME_MAX_WIDTH
              : '-mx-6'
          )}
          itemClassName="w-64"
          shadowClassName={widthOfSidePadding}
        />
      </div>
    </>
  )
}
