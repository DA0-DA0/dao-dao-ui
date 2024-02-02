import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { InboxApi, InboxPageSlug } from '@dao-dao/types'

import {
  InboxSettingsModal,
  Notifications,
  NotificationsProps,
} from '../components'

export type InboxProps = {
  api: InboxApi
  verify: () => void
  connected: boolean
} & Omit<NotificationsProps, 'className'>

export const Inbox = ({ api, verify, connected, ...props }: InboxProps) => {
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
      <Notifications {...props} className="-mx-6 -mt-10 min-h-full" />

      <InboxSettingsModal
        api={api}
        onClose={() => replace('/notifications', undefined, { shallow: true })}
        verify={slug === InboxPageSlug.Verify ? verify : undefined}
        visible={settingsModalVisible && connected && ready}
      />
    </>
  )
}
