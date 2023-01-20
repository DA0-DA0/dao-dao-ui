import {
  NotificationsActiveRounded,
  NotificationsNoneRounded,
} from '@mui/icons-material'
import { useWallet } from '@noahsaso/cosmodal'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  discordNotifierRegistrationsSelector,
  discordNotifierSetupAtom,
  refreshDiscordNotifierRegistrationsAtom,
} from '@dao-dao/state/recoil'
import {
  IconButton,
  DiscordNotifierConfigureModal as StatelessDiscordNotifierConfigureModal,
  Tooltip,
  useCachedLoadable,
  useDaoInfoContext,
} from '@dao-dao/stateless'
import {
  DISCORD_NOTIFIER_API_BASE,
  DISCORD_NOTIFIER_CLIENT_ID,
  DISCORD_NOTIFIER_REDIRECT_URI,
  DISCORD_NOTIFIER_SIGNATURE_TYPE,
  processError,
} from '@dao-dao/utils'

import { useCfWorkerAuthPostRequest } from '../../hooks/useCfWorkerAuthPostRequest'

export const DiscordNotifierConfigureModal = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { chainId, coreAddress } = useDaoInfoContext()
  const { publicKey } = useWallet(chainId)

  const [visible, setVisible] = useState(false)

  // Handle discord notifier code redirect.
  const { ready: postRequestReady, postRequest } = useCfWorkerAuthPostRequest(
    DISCORD_NOTIFIER_API_BASE,
    DISCORD_NOTIFIER_SIGNATURE_TYPE,
    chainId
  )

  const setDiscordNotificationSetup = useSetRecoilState(
    discordNotifierSetupAtom
  )

  const setRefreshRegistrations = useSetRecoilState(
    refreshDiscordNotifierRegistrationsAtom({
      chainId,
      coreAddress,
      walletPublicKey: publicKey?.hex ?? '',
    })
  )

  // Refresh in a loop for 60 seconds.
  const [refreshRegistrationsLoop, setRefreshRegistrationsLoop] =
    useState(false)
  const refreshRegistrationLoopNum = useRef(0)
  useEffect(() => {
    if (refreshRegistrationsLoop && refreshRegistrationLoopNum.current === 0) {
      refreshRegistrationLoopNum.current = 20
      setRefreshRegistrationsLoop(false)

      const interval = setInterval(() => {
        setRefreshRegistrations((prev) => prev + 1)

        refreshRegistrationLoopNum.current -= 1
        if (refreshRegistrationLoopNum.current === 0) {
          clearInterval(interval)
        }
      }, 3000)
    }
  }, [refreshRegistrationsLoop, setRefreshRegistrations])

  const registrationsLoadable = useCachedLoadable(
    publicKey
      ? discordNotifierRegistrationsSelector({
          chainId,
          coreAddress,
          walletPublicKey: publicKey.hex,
        })
      : undefined
  )
  const registrations =
    registrationsLoadable.state === 'hasValue'
      ? registrationsLoadable.contents
      : []

  const setup = () => {
    // Nonce to prevent CSRF attacks.
    const state =
      Date.now().toString(36) + Math.random().toString(36).substring(2)

    // Store setup state in atom, which saves to localStorage to be loaded on
    // Discord redirect URI page.
    setDiscordNotificationSetup({
      state,
      coreAddress,
    })

    // Permissions = 1024 is read messages/view channels.
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_NOTIFIER_CLIENT_ID}&redirect_uri=${encodeURIComponent(
      DISCORD_NOTIFIER_REDIRECT_URI
    )}&response_type=code&permissions=1024&scope=webhook.incoming%20bot&state=${encodeURIComponent(
      state
    )}`
  }

  const [loading, setLoading] = useState(false)
  const register = useCallback(async () => {
    const { discordNotifier } = router.query
    if (discordNotifier) {
      setLoading(true)
      try {
        await postRequest(`/${coreAddress}/register`, {
          code: discordNotifier,
          redirectUri: DISCORD_NOTIFIER_REDIRECT_URI,
        })

        toast.success(t('success.discordNotifierEnabled'))
        setRefreshRegistrationsLoop(true)
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        setLoading(false)
        // Remove query params.
        router.replace(router.asPath.split('?')[0], undefined, {
          shallow: true,
        })
      }
    }
  }, [coreAddress, postRequest, router, t])

  const redirected = useRef(false)
  useEffect(() => {
    if (
      !router.isReady ||
      redirected.current ||
      !router.query.discordNotifier ||
      // Don't attempt to auto-register until ready.
      !postRequestReady
    ) {
      return
    }

    // Open this modal since we're completing registration.
    setVisible(true)

    // Only register once.
    redirected.current = true
    register()
  }, [router, register, postRequestReady])

  const unregister = useCallback(
    async (id: string) => {
      setLoading(true)
      try {
        await postRequest(`/${coreAddress}/unregister`, {
          id,
        })

        toast.success(t('success.discordNotifierRemoved'))
        setRefreshRegistrationsLoop(true)
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        setLoading(false)
      }
    },
    [coreAddress, postRequest, t]
  )

  return (
    <>
      <Tooltip title={t('info.setUpDiscordNotificationsTooltip')}>
        <IconButton
          Icon={
            registrations.length > 0
              ? NotificationsActiveRounded
              : NotificationsNoneRounded
          }
          iconClassName="!w-5 !h-5"
          onClick={() => setVisible(true)}
          variant="secondary"
        />
      </Tooltip>

      <StatelessDiscordNotifierConfigureModal
        loading={loading}
        onClose={() => setVisible(false)}
        onDelete={unregister}
        registrations={registrations}
        setup={setup}
        visible={visible}
      />
    </>
  )
}
