import { Refresh, Settings, WhereToVoteOutlined } from '@mui/icons-material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ComponentType, ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  InboxApi,
  InboxPageSlug,
  InboxState,
  LinkWrapperProps,
} from '@dao-dao/types'

import {
  Collapsible,
  IconButton,
  InboxSettingsModal,
  Loader,
  NoContent,
  PageHeaderContent,
  RightSidebarContent,
} from '../components'
import { useDaoNavHelpers } from '../hooks'

export interface InboxProps {
  state: InboxState
  rightSidebarContent: ReactNode
  LinkWrapper: ComponentType<LinkWrapperProps>
  api: InboxApi
  verify: () => void
  connected: boolean
}

export const Inbox = ({
  state: { loading, refreshing, refresh, daosWithItems, pendingItemCount },
  rightSidebarContent,
  LinkWrapper,
  api,
  verify,
  connected,
}: InboxProps) => {
  const { t } = useTranslation()
  const { getDaoPath } = useDaoNavHelpers()
  const {
    query: { slug: _slug },
    isReady,
    push,
  } = useRouter()

  const [refreshSpinning, setRefreshSpinning] = useState(false)
  // Start spinning refresh icon if refreshing sets to true. Turn off once the
  // iteration completes (in `onAnimationIteration` below).
  useEffect(() => {
    refreshing && setRefreshSpinning(true)
  }, [refreshing])

  const slug = _slug && Array.isArray(_slug) ? _slug[0] : undefined
  const settingsModalVisible =
    isReady &&
    (slug === InboxPageSlug.Settings || slug === InboxPageSlug.Verify)

  // 1 second delay until settings modal can show, so wallet has time to load.
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const timeout = setTimeout(() => {
      setReady(true)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeaderContent
        className="mx-auto max-w-5xl"
        rightNode={
          <div className="flex flex-row items-center gap-2 transition-opacity">
            <IconButton
              Icon={Settings}
              circular
              disabled={!api.ready}
              loading={settingsModalVisible && api.updating}
              onClick={() =>
                push('/inbox/settings', undefined, { shallow: true })
              }
              variant="ghost"
            />

            <IconButton
              Icon={Refresh}
              circular
              className={clsx(refreshSpinning && 'animate-spin-medium')}
              // If spinning but no longer refreshing, stop after iteration.
              onAnimationIteration={
                refreshSpinning && !refreshing
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
        }
        title={t('title.inbox')}
      />

      <div className="mx-auto flex max-w-5xl flex-col items-stretch">
        {loading ? (
          <Loader fill={false} />
        ) : daosWithItems.length === 0 ? (
          <NoContent
            Icon={WhereToVoteOutlined}
            body={t('info.emptyInboxCaughtUp')}
          />
        ) : (
          <>
            <p className="title-text">
              {t('title.numPendingItems', { count: pendingItemCount })}
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
                    <div className="flex flex-col gap-2 pr-2 pl-5 md:gap-1">
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

      <InboxSettingsModal
        api={api}
        onClose={() => push('/inbox', undefined, { shallow: true })}
        verify={slug === InboxPageSlug.Verify ? verify : undefined}
        visible={settingsModalVisible && connected && ready}
      />
    </>
  )
}
