import {
  ClearAll,
  Delete,
  DoneAll,
  Refresh,
  Settings,
} from '@mui/icons-material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import {
  ComponentType,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  InboxApi,
  InboxMainItemRendererProps,
  InboxPageSlug,
  InboxState,
} from '@dao-dao/types'
import { processError } from '@dao-dao/utils'

import {
  IconButton,
  InboxSettingsModal,
  NoContent,
  PageHeaderContent,
  PageLoader,
  RightSidebarContent,
  Tooltip,
} from '../components'

export interface InboxProps {
  state: InboxState
  rightSidebarContent: ReactNode
  api: InboxApi
  verify: () => void
  connected: boolean
  InboxMainItemRenderer: ComponentType<InboxMainItemRendererProps>
}

export const Inbox = ({
  state: { loading, refreshing: refreshing, refresh, items },
  rightSidebarContent,
  api,
  verify,
  connected,
  InboxMainItemRenderer,
}: InboxProps) => {
  const { t } = useTranslation()
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

  const [checked, setChecked] = useState({} as Record<string, boolean>)
  const onCheck = useCallback(
    (id: string) =>
      setChecked((prev) => ({
        ...prev,
        [id]: !prev[id],
      })),
    []
  )
  const countChecked = Object.values(checked).filter(Boolean).length
  const [checking, setChecking] = useState(false)
  const clearChecked = useCallback(async () => {
    setChecking(true)
    try {
      // If none checked, clear all.
      const toClear = !countChecked
        ? items.map(({ id }) => id)
        : Object.entries(checked).flatMap(([id, checked]) =>
            checked ? [id] : []
          )

      if (toClear.length && (await api.clear(toClear))) {
        setChecked({})
      }
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setChecking(false)
    }
  }, [api, checked, countChecked, items])

  return (
    <>
      <RightSidebarContent>{rightSidebarContent}</RightSidebarContent>
      <PageHeaderContent
        className="mx-auto max-w-5xl"
        expandBorderToEdge
        rightNode={
          <div className="flex grow flex-row items-center">
            <Tooltip title={t('button.settings')}>
              <div className="shrink-0 self-stretch border-l border-border-secondary">
                <IconButton
                  Icon={Settings}
                  className="!h-full !w-10"
                  disabled={!api.ready}
                  iconClassName="!h-5 !w-5"
                  loading={settingsModalVisible && api.updating}
                  noRounding
                  onClick={() =>
                    push('/inbox/settings', undefined, { shallow: true })
                  }
                  size="custom"
                  variant="ghost"
                />
              </div>
            </Tooltip>

            <Tooltip title={t('button.refresh')}>
              <div className="shrink-0 self-stretch border-l border-border-secondary">
                <IconButton
                  Icon={Refresh}
                  className="!h-full !w-10"
                  iconClassName={clsx(
                    '!h-5 !w-5',
                    refreshSpinning && 'animate-spin-medium'
                  )}
                  noRounding
                  // If spinning but no longer refreshing, stop after iteration.
                  onAnimationIteration={
                    refreshSpinning && !refreshing
                      ? () => setRefreshSpinning(false)
                      : undefined
                  }
                  onClick={() => {
                    // Perform one spin even if refresh completes immediately.
                    // It will stop after 1 iteration if `refreshing` does not
                    // become true.
                    setRefreshSpinning(true)
                    refresh()
                  }}
                  size="custom"
                  variant="ghost"
                />
              </div>
            </Tooltip>

            {/* Matches clear button in InboxMainItemRenderer */}
            <Tooltip
              title={
                countChecked
                  ? t('button.clearSelected', {
                      count: countChecked,
                    })
                  : t('button.clearAll')
              }
            >
              <div className="shrink-0 self-stretch border-l border-border-secondary">
                <IconButton
                  Icon={countChecked ? Delete : ClearAll}
                  className="!h-full !w-10"
                  disabled={!api.ready || api.updating}
                  iconClassName="!h-5 !w-5"
                  loading={checking}
                  noRounding
                  onClick={clearChecked}
                  size="custom"
                  variant={countChecked ? 'secondary' : 'ghost'}
                />
              </div>
            </Tooltip>
          </div>
        }
        title={t('title.inbox')}
      />

      <div className="-mx-7 -mt-10 min-h-full">
        <div className="relative mx-auto flex min-h-full max-w-5xl flex-col items-stretch">
          {loading ? (
            <PageLoader className="mt-10" />
          ) : items.length === 0 ? (
            <NoContent
              Icon={DoneAll}
              body={t('info.emptyInboxCaughtUp')}
              noBorder
            />
          ) : (
            <>
              <div className="flex grow flex-col">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={clsx(
                      'animate-fade-in',
                      index < items.length - 1 &&
                        'border-b border-border-secondary'
                    )}
                  >
                    <InboxMainItemRenderer
                      key={item.id}
                      checked={!!checked[item.id]}
                      item={item}
                      onCheck={onCheck}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
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
