import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import {
  constSelector,
  useRecoilValueLoadable,
  useSetRecoilState,
} from 'recoil'

import {
  discordNotifierRegistrationsSelector,
  discordNotifierSetupAtom,
  refreshDiscordNotifierRegistrationsAtom,
} from '@dao-dao/state/recoil'
import {
  DiscordNotifierConfigureModal as StatelessDiscordNotifierConfigureModal,
  DiscordNotifierConfigureModalProps as StatelessDiscordNotifierConfigureModalProps,
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

type DiscordNotifierConfigureModalProps = Pick<
  StatelessDiscordNotifierConfigureModalProps,
  'onClose' | 'visible'
> & {
  open: () => void
}

export const DiscordNotifierConfigureModal = ({
  open,
  ...props
}: DiscordNotifierConfigureModalProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { chainId, coreAddress } = useDaoInfoContext()

  // Handle discord notifier code redirect.
  const postRequest = useCfWorkerAuthPostRequest(
    DISCORD_NOTIFIER_API_BASE,
    DISCORD_NOTIFIER_SIGNATURE_TYPE,
    chainId
  )
  const { publicKey, status } = useWallet(chainId)

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
  const registrationsLoadable = useRecoilValueLoadable(
    publicKey
      ? discordNotifierRegistrationsSelector({
          chainId,
          coreAddress,
          walletPublicKey: publicKey.hex,
        })
      : constSelector([])
  )

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
        setRefreshRegistrations((id) => id + 1)
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
  }, [coreAddress, postRequest, router, setRefreshRegistrations, t])

  const redirected = useRef(false)
  useEffect(() => {
    if (
      !router.isReady ||
      redirected.current ||
      !router.query.discordNotifier ||
      // Don't try to register until connected.
      status !== WalletConnectionStatus.Connected
    ) {
      return
    }

    // Open this modal since we're completing registration.
    open()

    // Only register once.
    redirected.current = true
    register()
  }, [router.isReady, register, router.query.discordNotifier, open, status])

  const unregister = useCallback(
    async (id: string) => {
      setLoading(true)
      try {
        await postRequest(`/${coreAddress}/unregister`, {
          id,
        })
        toast.success(t('success.discordNotifierRemoved'))
        setRefreshRegistrations((id) => id + 1)
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        setLoading(false)
      }
    },
    [coreAddress, postRequest, setRefreshRegistrations, t]
  )

  return (
    <StatelessDiscordNotifierConfigureModal
      {...props}
      loading={loading}
      onDelete={unregister}
      registrations={
        registrationsLoadable.state === 'hasValue'
          ? registrationsLoadable.contents
          : []
      }
      setup={setup}
    />
  )
}
