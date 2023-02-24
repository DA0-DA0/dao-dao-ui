import { Refresh, WhereToVoteOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentType, ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { InboxState, LinkWrapperProps } from '@dao-dao/types'

import {
  Collapsible,
  IconButton,
  Loader,
  NoContent,
  PageHeaderContent,
  RightSidebarContent,
} from '../components'
import { useNavHelpers } from '../hooks'

export interface InboxProps {
  state: InboxState
  rightSidebarContent: ReactNode
  LinkWrapper: ComponentType<LinkWrapperProps>
}

export const Inbox = ({
  state: { loading, refreshing, refresh, daosWithItems, itemCount },
  rightSidebarContent,
  LinkWrapper,
}: InboxProps) => {
  const { t } = useTranslation()
  const { getDaoPath } = useNavHelpers()

  const [refreshSpinning, setRefreshSpinning] = useState(false)
  // Start spinning refresh icon if refreshing sets to true. Turn off once the
  // iteration completes (in `onAnimationIteration` below).
  useEffect(() => {
    refreshing && setRefreshSpinning(true)
  }, [refreshing])

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeaderContent
        className="mx-auto max-w-5xl"
        rightNode={
          <IconButton
            Icon={Refresh}
            circular
            className={clsx(
              'transition-opacity',
              loading ? 'pointer-events-none opacity-0' : 'opacity-100',
              refreshSpinning && 'animate-spin-medium'
            )}
            // If spinning but no longer refreshing, stop after iteration.
            onAnimationIteration={
              refreshSpinning && !refreshing
                ? () => setRefreshSpinning(false)
                : undefined
            }
            onClick={() => {
              // Perform one spin even if refresh completes immediately. It will
              // stop after 1 iteration if `refreshing` does not become true.
              setRefreshSpinning(true)
              refresh()
            }}
            variant="ghost"
          />
        }
        title={t('title.inbox')}
      />

      <div className="mx-auto flex max-w-5xl flex-col items-stretch">
        {loading ? (
          <Loader fill={false} />
        ) : itemCount === 0 ? (
          <NoContent
            Icon={WhereToVoteOutlined}
            body={t('info.emptyInboxCaughtUp')}
          />
        ) : (
          <>
            <p className="title-text">
              {t('title.numItems', { count: itemCount })}
            </p>

            <div className="mt-6 grow space-y-4">
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
                >
                  {items.length ? (
                    <div className="flex flex-col gap-2 px-2 md:gap-1">
                      {items.map(({ Renderer, props }, index) => (
                        <Renderer key={index} {...props} />
                      ))}
                    </div>
                  ) : undefined}
                </Collapsible>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}
