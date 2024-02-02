import { DoneAll } from '@mui/icons-material'
import { useRouter } from 'next/router'
import { ComponentType, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  InboxApi,
  InboxMainItemRendererProps,
  InboxPageSlug,
  InboxState,
} from '@dao-dao/types'

import { InboxSettingsModal, NoContent, PageLoader } from '../components'

export interface InboxProps {
  state: InboxState
  api: InboxApi
  verify: () => void
  connected: boolean
  checked: Record<string, boolean>
  onCheck: (id: string) => void
  InboxMainItemRenderer: ComponentType<InboxMainItemRendererProps>
}

export const Inbox = ({
  state: { loading, items },
  api,
  verify,
  connected,
  checked,
  onCheck,
  InboxMainItemRenderer,
}: InboxProps) => {
  const { t } = useTranslation()
  const {
    query: { slug: _slug },
    isReady,
    replace,
  } = useRouter()

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
      <div className="relative -mx-6 -mt-10 flex min-h-full flex-col items-stretch gap-4">
        {loading ? (
          <PageLoader className="mt-10" />
        ) : items.length === 0 ? (
          <NoContent
            Icon={DoneAll}
            body={t('info.emptyInboxCaughtUp')}
            noBorder
          />
        ) : (
          <div className="flex grow flex-col">
            {items.map((item) => (
              <div
                key={item.id}
                className="animate-fade-in border-b border-border-secondary"
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
        )}
      </div>

      <InboxSettingsModal
        api={api}
        onClose={() => replace('/notifications', undefined, { shallow: true })}
        verify={slug === InboxPageSlug.Verify ? verify : undefined}
        visible={settingsModalVisible && connected && ready}
      />
    </>
  )
}
