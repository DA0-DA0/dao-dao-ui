import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { InboxPageSlug, NotificationsProps } from '@dao-dao/types'

import { InboxSettingsModal, Notifications } from '../components'

export type InboxProps = {
  connected: boolean
} & Omit<NotificationsProps, 'className'>

export const Inbox = ({ connected, ...props }: InboxProps) => {
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
      <Notifications {...props} className="-mx-6 md:-mt-10 md:min-h-full" />

      <InboxSettingsModal
        api={props.inbox.api}
        onClose={() => replace('/notifications', undefined, { shallow: true })}
        verify={slug === InboxPageSlug.Verify ? props.inbox.verify : undefined}
        visible={settingsModalVisible && connected && ready}
      />
    </>
  )
}
