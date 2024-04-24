import { fromBase64, toBase64 } from '@cosmjs/encoding'
import { useCallback, useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { temporaryClearedInboxItemsAtom } from '@dao-dao/state'
import { useServiceWorker } from '@dao-dao/stateless'
import {
  InboxApi,
  InboxConfig,
  InboxUpdateConfig,
  PushSubscriptionManager,
} from '@dao-dao/types'
import {
  INBOX_API_BASE,
  WEB_PUSH_PUBLIC_KEY,
  processError,
  toBech32Hash,
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
    temporaryClearedInboxItemsAtom(toBech32Hash(address))
  )

  const [updating, setUpdating] = useState(false)
  const { ready, postRequest } = useCfWorkerAuthPostRequest(
    INBOX_API_BASE,
    'Inbox'
  )

  const [config, setConfig] = useState<InboxConfig>()

  const serviceWorker = useServiceWorker()
  const [pushSubscribed, setPushSubscribed] = useState(false)
  const [pushSubscription, setPushSubscription] = useState<PushSubscription>()
  const [pushUpdating, setPushUpdating] = useState(true)

  // Load push service worker registration and subscription.
  useEffect(() => {
    if (!serviceWorker.ready) {
      return
    }

    ;(async () => {
      try {
        if (!serviceWorker.registration) {
          return
        }

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
    async (
      items: {
        chainId: string
        id: string
      }[]
    ) => {
      if (!ready) {
        toast.error(t('error.logInToContinue'))
        return false
      }
      if (updating) {
        return false
      }

      setUpdating(true)

      try {
        // Group by chain ID.
        const idsToClear = items.reduce(
          (acc, { chainId, id }) => ({
            ...acc,
            [chainId]: [...(acc[chainId] ?? []), ...[id].flat()],
          }),
          {} as Record<string, string[]>
        )

        for (const [chainId, ids] of Object.entries(idsToClear)) {
          await postRequest(
            '/clear',
            {
              ids,
            },
            'Clear Inbox Items',
            chainId
          )
        }

        setTemporary((prev) => [...prev, ...items.flatMap(({ id }) => id)])

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
    async (
      data: InboxUpdateConfig,
      signatureType = 'Save Notification Settings'
    ) => {
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

        const push =
          data.push ||
          (p256dh
            ? // If no push provided, just check if subscribed.
              {
                type: 'check',
                p256dh,
              }
            : undefined)

        const config = await postRequest<InboxConfig>(
          '/config',
          {
            ...data,
            ...(push && { push }),
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
    () => updateConfig({}, 'Load Notification Settings'),
    [updateConfig]
  )

  const resendVerificationEmail = useCallback(
    () => updateConfig({ resend: true }, 'Resend Verification Email'),
    [updateConfig]
  )

  const verify = useCallback(
    (code: string) => updateConfig({ verify: code }, 'Verify Email'),
    [updateConfig]
  )

  const subscribe = useCallback(async () => {
    if (!WEB_PUSH_PUBLIC_KEY || pushUpdating || !serviceWorker.registration) {
      return
    }

    setPushUpdating(true)
    try {
      const notificationPermission = await Notification.requestPermission()
      if (notificationPermission === 'denied') {
        toast.error(t('error.notificationsNotAllowed'))
        return
      }

      const subscription =
        await serviceWorker.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: fromBase64(WEB_PUSH_PUBLIC_KEY),
        })

      const saved = await updateConfig({
        push: {
          type: 'subscribe',
          subscription: JSON.parse(JSON.stringify(subscription)),
        },
      })

      if (saved) {
        setPushSubscription(subscription)
        setPushSubscribed(true)
      } else {
        // Unsubscribe if there was an error after the subscription was created.
        await subscription.unsubscribe().catch(() => {})
      }
    } catch (err) {
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
      let saved = true
      // Key should always be found, but just in case.
      const p256dhKey = pushSubscription.getKey('p256dh')
      const p256dh = p256dhKey ? toBase64(new Uint8Array(p256dhKey)) : undefined
      if (p256dh) {
        saved = await updateConfig({
          push: {
            type: 'unsubscribe',
            p256dh,
          },
        })
      }

      // Unsubscribe locally once removed from server successfully. If key could
      // not be found for some reason, just unsubscribe locally.
      if (saved) {
        await pushSubscription.unsubscribe()

        setPushSubscription(undefined)
        setPushSubscribed(false)
      }
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setPushUpdating(false)
    }
  }, [pushSubscription, pushUpdating, updateConfig])

  const unsubscribeAll = useCallback(async () => {
    if (pushUpdating) {
      return
    }

    setPushUpdating(true)
    try {
      const saved = await updateConfig({
        push: {
          type: 'unsubscribe_all',
        },
      })

      if (saved) {
        // Unsubscribe the current one if it exists.
        await pushSubscription?.unsubscribe()

        setPushSubscription(undefined)
        setPushSubscribed(false)
      }
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
      supported: serviceWorker.ready && !!serviceWorker.registration,
      updating: pushUpdating,
      subscribed: pushSubscribed,
      subscribe,
      subscription: pushSubscription,
      unsubscribe,
      unsubscribeAll,
    }),
    [
      serviceWorker.ready,
      serviceWorker.registration,
      pushUpdating,
      pushSubscribed,
      subscribe,
      pushSubscription,
      unsubscribe,
      unsubscribeAll,
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
