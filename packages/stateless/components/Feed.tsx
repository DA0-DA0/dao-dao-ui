import { Refresh } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { FeedState, LinkWrapperProps } from '@dao-dao/types'

import { Collapsible, IconButton } from '../components'
import { useDaoNavHelpers } from '../hooks'

export type FeedProps = {
  state: FeedState
  LinkWrapper: ComponentType<LinkWrapperProps>
}

export const Feed = ({
  state: { loading, refreshing, refresh, daosWithItems },
  LinkWrapper,
}: FeedProps) => {
  const { t } = useTranslation()
  const { getDaoPath } = useDaoNavHelpers()

  const [refreshSpinning, setRefreshSpinning] = useState(false)
  // Start spinning refresh icon if refreshing sets to true. Turn off once the
  // iteration completes (in `onAnimationIteration` below).
  useEffect(() => {
    if (loading || refreshing) {
      setRefreshSpinning(true)
    }
  }, [loading, refreshing])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-start justify-between gap-x-8">
        <div className="flex flex-col gap-1">
          <p className="title-text text-lg">{t('title.feed')}</p>
          <p className="caption-text">{t('info.feedDescription')}</p>
        </div>

        <IconButton
          Icon={Refresh}
          circular
          className={clsx(refreshSpinning && 'animate-spin-medium')}
          // If spinning but no longer refreshing, stop after iteration.
          onAnimationIteration={
            refreshSpinning && !loading && !refreshing
              ? () => setRefreshSpinning(false)
              : undefined
          }
          onClick={() => {
            // Perform one spin even if refresh completes immediately. It
            // will stop after 1 iteration if `refreshing` does not become
            // true.
            setRefreshSpinning(true)
            refresh()
          }}
          variant="ghost"
        />
      </div>

      {!loading && daosWithItems.length > 0 && (
        <div className="flex flex-col gap-4">
          {daosWithItems.map(({ dao, items }) => (
            <Collapsible
              key={dao.coreAddress}
              imageUrl={dao.imageUrl}
              label={dao.name}
              link={{
                href: getDaoPath(dao.coreAddress),
                LinkWrapper,
              }}
              noContentIndent
              noHeaderIndent
            >
              {items.length ? (
                <div className="flex flex-col gap-2 md:gap-1">
                  {items.map(({ Renderer, props }, index) => (
                    <Renderer key={index} {...props} />
                  ))}
                </div>
              ) : undefined}
            </Collapsible>
          ))}
        </div>
      )}
    </div>
  )
}
