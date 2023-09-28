import { fromBase64, toBase64 } from '@cosmjs/encoding'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { temporaryClearedInboxApiItemsAtom } from '@dao-dao/state'
import { useServiceWorker } from '@dao-dao/stateless'
import {
  InboxApi,
  InboxApiConfig,
  InboxApiUpdateConfig,
  PushSubscriptionManager,
} from '@dao-dao/types'
import {
  INBOX_API_BASE,
  WEB_PUSH_PUBLIC_KEY,
  processError,
} from '@dao-dao/utils'

import { useCfWorkerAuthPostRequest } from './useCfWorkerAuthPostRequest'
import { useWallet } from './useWallet'

export const useInboxApi = (): InboxApi => {
  const { t } = useTranslation()
  const { address = '' } = useWallet()

  // Following API doesn't update right away, so this serves to keep track of
  // all successful updates for the current session. This will be reset on page
  // refresh.
  const setTemporary = useSetRecoilState(
    temporaryClearedInboxApiItemsAtom(address)
  )

  const [updating, setUpdating] = useState(false)
  const { ready, postRequest } = useCfWorkerAuthPostRequest(
    INBOX_API_BASE,
    'Inbox'
  )

  const [config, setConfig] = useState<InboxApiConfig>()

  const serviceWorker = useServiceWorker()
  const [pushSubscribed, setPushSubscribed] = useState(false)
  const [pushSubscription, setPushSubscription] = useState<PushSubscription>()
  const [pushUpdating, setPushUpdating] = useState(true)

  // Load push service worker registration and subscription.
  useEffect(() => {
    if (!serviceWorker.ready || !serviceWorker.registration) {
      return
    }

    ;(async () => {
      if (!serviceWorker.registration) {
        return
      }

      try {
        const subscription =
          await serviceWorker.registration.pushManager.getSubscription()
        if (
          subscription &&
          !(
            subscription.expirationTime !== null &&
            // If greater than 5 minutes until expiration, assume subscribed.
            Date.now() > subscription.expirationTime - 5 * 60 * 1000
          )
        ) {
          setPushSubscription(subscription)
          setPushSubscribed(true)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setPushUpdating(false)
      }
    })()
  }, [serviceWorker.ready, serviceWorker.registration])

  const clear = useCallback(
    async (idOrIds: string | string[]) => {
      if (!ready) {
        toast.error(t('error.logInToContinue'))
        return false
      }
      if (updating) {
        return false
      }

      setUpdating(true)

      try {
        const ids = [idOrIds].flat()
        await postRequest(
          '/clear',
          {
            ids,
          },
          'Clear Inbox Items'
        )

        setTemporary((prev) => [...prev, ...ids])

        return true
      } catch (err) {
        console.error(err)
        toast.error(processError(err))

        return false
      } finally {
        setUpdating(false)
      }
    },
    [postRequest, ready, setTemporary, t, updating]
  )

  const updateConfig = useCallback(
    async (data: InboxApiUpdateConfig, signatureType = 'Save Inbox Config') => {
      if (!ready) {
        toast.error(t('error.logInToContinue'))
        return false
      }
      if (updating || pushUpdating) {
        return false
      }

      setUpdating(true)

      try {
        const p256dhKey = pushSubscription?.getKey('p256dh')
        const p256dh = p256dhKey
          ? toBase64(new Uint8Array(p256dhKey))
          : undefined

        const config = await postRequest<InboxApiConfig>(
          '/config',
          {
            ...data,
            // If no push provided, just check if subscribed.
            push:
              data.push ||
              (p256dh
                ? {
                    type: 'check',
                    p256dh,
                  }
                : undefined),
          },
          signatureType
        )
        setConfig(config)

        return true
      } catch (err) {
        console.error(err)
        toast.error(processError(err))

        return false
      } finally {
        setUpdating(false)
      }
    },
    [postRequest, pushSubscription, pushUpdating, ready, t, updating]
  )

  const loadConfig = useCallback(
    () => updateConfig({}, 'Load Inbox Config'),
    [updateConfig]
  )

  const resendVerificationEmail = useCallback(
    () => updateConfig({ resend: true }, 'Resend Inbox Verification Email'),
    [updateConfig]
  )

  const verify = useCallback(
    (code: string) => updateConfig({ verify: code }, 'Verify Inbox Email'),
    [updateConfig]
  )

  const subscribe = useCallback(async () => {
    if (!WEB_PUSH_PUBLIC_KEY || pushUpdating || !serviceWorker.registration) {
      return
    }

    let subscription

    setPushUpdating(true)
    try {
      const notificationPermission = await Notification.requestPermission()
      if (notificationPermission === 'denied') {
        toast.error(t('error.notificationsNotAllowed'))
        return
      }

      subscription = await serviceWorker.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: fromBase64(WEB_PUSH_PUBLIC_KEY),
      })

      await updateConfig({
        push: {
          type: 'subscribe',
          subscription: JSON.parse(JSON.stringify(subscription)),
        },
      })

      setPushSubscription(subscription)
      setPushSubscribed(true)
    } catch (err) {
      // Attempt to unsubscribe if there was an error but the subscription was
      // already created.
      await subscription?.unsubscribe().catch(() => {})

      console.error(err)
      toast.error(processError(err))
    } finally {
      setPushUpdating(false)
    }
  }, [pushUpdating, serviceWorker.registration, t, updateConfig])

  const unsubscribe = useCallback(async () => {
    if (!pushSubscription || pushUpdating) {
      return
    }

    setPushUpdating(true)
    try {
      await pushSubscription.unsubscribe()

      const p256dhKey = pushSubscription.getKey('p256dh')
      const p256dh = p256dhKey ? toBase64(new Uint8Array(p256dhKey)) : undefined
      if (p256dh) {
        await updateConfig({
          push: {
            type: 'unsubscribe',
            p256dh,
          },
        })
      }

      setPushSubscription(undefined)
      setPushSubscribed(false)
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setPushUpdating(false)
    }
  }, [pushSubscription, pushUpdating, updateConfig])

  const push = useMemo(
    (): PushSubscriptionManager => ({
      ready: serviceWorker.ready,
      updating: pushUpdating,
      subscribed: pushSubscribed,
      subscribe,
      subscription: pushSubscription,
      unsubscribe,
    }),
    [
      serviceWorker.ready,
      pushUpdating,
      pushSubscribed,
      subscribe,
      pushSubscription,
      unsubscribe,
    ]
  )

  return {
    ready,
    updating,
    clear,
    loadConfig,
    updateConfig,
    resendVerificationEmail,
    verify,
    config,
    push,
  }
}
