import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useSetRecoilState } from 'recoil'

import {
  discordNotifierRegistrationsSelector,
  discordNotifierSetupAtom,
  refreshDiscordNotifierRegistrationsAtom,
} from '@dao-dao/state/recoil'
import {
  DiscordNoCircleIcon,
  DiscordNotifierRegistrationForm,
  IconButton,
  DiscordNotifierConfigureModal as StatelessDiscordNotifierConfigureModal,
  Tooltip,
  useCachedLoadable,
  useChain,
  useDao,
  useDaoNavHelpers,
} from '@dao-dao/stateless'
import { DaoTabId } from '@dao-dao/types'
import {
  DISCORD_NOTIFIER_API_BASE,
  DISCORD_NOTIFIER_SIGNATURE_TYPE,
  SITE_URL,
  objectMatchesStructure,
  processError,
} from '@dao-dao/utils'

import { useCfWorkerAuthPostRequest } from '../../hooks/useCfWorkerAuthPostRequest'
import { useWallet } from '../../hooks/useWallet'
import { ConnectWallet } from '../ConnectWallet'

export const DiscordNotifierConfigureModal = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { chain_id: chainId } = useChain()
  const { getDaoPath } = useDaoNavHelpers()
  const { coreAddress } = useDao()
  const { isWalletConnected, hexPublicKey } = useWallet({
    loadAccount: true,
  })

  const [visible, setVisible] = useState(false)

  // Handle discord notifier code redirect.
  const { ready: postRequestReady, postRequest } = useCfWorkerAuthPostRequest(
    DISCORD_NOTIFIER_API_BASE,
    DISCORD_NOTIFIER_SIGNATURE_TYPE
  )

  const [discordNotifierSetup, setDiscordNotifierSetup] = useRecoilState(
    discordNotifierSetupAtom(coreAddress)
  )

  const setRefreshRegistrations = useSetRecoilState(
    refreshDiscordNotifierRegistrationsAtom({
      chainId,
      coreAddress,
      walletPublicKey: hexPublicKey.loading ? '' : hexPublicKey.data,
    })
  )

  const registrationsLoadable = useCachedLoadable(
    !hexPublicKey.loading
      ? discordNotifierRegistrationsSelector({
          chainId,
          coreAddress,
          walletPublicKey: hexPublicKey.data,
        })
      : undefined
  )
  const registrations =
    registrationsLoadable.state === 'hasValue'
      ? registrationsLoadable.contents
      : []

  // Refresh in a loop for 60 seconds.
  const [refreshing, setRefreshing] = useState(false)
  const refreshRegistrationLoopNum = useRef(0)
  useEffect(() => {
    if (refreshing && refreshRegistrationLoopNum.current === 0) {
      refreshRegistrationLoopNum.current = 20

      const interval = setInterval(() => {
        setRefreshRegistrations((prev) => prev + 1)

        refreshRegistrationLoopNum.current -= 1
        if (refreshRegistrationLoopNum.current === 0) {
          clearInterval(interval)
          setRefreshing(false)
        }
      }, 3000)
    }
  }, [refreshing, setRefreshRegistrations])

  // Stop refreshing if registration length updates.
  const numRegistrations = registrations.length
  useEffect(() => {
    setRefreshing(false)
  }, [numRegistrations])

  const redirectUri =
    SITE_URL +
    getDaoPath(coreAddress, DaoTabId.Proposals, {
      discord: 1,
    })

  const setup = ({
    clientId,
    clientSecret,
    botToken,
  }: DiscordNotifierRegistrationForm) => {
    // Nonce to prevent CSRF attacks.
    const state =
      Date.now().toString(36) + Math.random().toString(36).substring(2)

    // Store setup state in atom, which saves to localStorage to be loaded on
    // Discord redirect URI.
    setDiscordNotifierSetup({
      state,
      clientId,
      clientSecret,
      botToken,
      redirectUri,
    })

    // Permissions = 1024 is read messages/view channels.
    window.location.href = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&permissions=1024&scope=webhook.incoming%20bot&state=${encodeURIComponent(
      state
    )}`
  }

  const [finishingRegistration, setFinishingRegistration] = useState(false)
  const [loadingRegistration, setLoadingRegistration] = useState(false)

  const register = useCallback(async () => {
    // These should already have been checked. Type-check.
    if (!discordNotifierSetup || !router.query.code) {
      setDiscordNotifierSetup(undefined)
      toast.error(t('error.discordAuthFailed'))
      return
    }

    setLoadingRegistration(true)
    try {
      await postRequest(`/${coreAddress}/register`, {
        code: router.query.code,
        clientId: discordNotifierSetup.clientId,
        clientSecret: discordNotifierSetup.clientSecret,
        botToken: discordNotifierSetup.botToken,
        redirectUri: discordNotifierSetup.redirectUri,
      })

      toast.success(t('success.discordNotifierEnabled'))

      setFinishingRegistration(false)
      setRefreshing(true)
      setDiscordNotifierSetup(undefined)

      // Clear URL query params from redirect.
      router.replace(getDaoPath(coreAddress, DaoTabId.Proposals), undefined, {
        shallow: true,
      })
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setLoadingRegistration(false)
    }
  }, [
    discordNotifierSetup,
    router,
    setDiscordNotifierSetup,
    t,
    postRequest,
    coreAddress,
    getDaoPath,
  ])

  const registered = useRef(false)
  useEffect(() => {
    if (
      registered.current ||
      !router.isReady ||
      !discordNotifierSetup ||
      !objectMatchesStructure(router.query, {
        discord: {},
        code: {},
        state: {},
      })
    ) {
      return
    }

    // Open this modal since we're completing registration.
    setFinishingRegistration(true)
    setVisible(true)

    // If state doesn't match, clear setup state and error.
    if (router.query.state !== discordNotifierSetup.state) {
      setDiscordNotifierSetup(undefined)
      toast.error(t('error.discordAuthFailed'))
      return
    }

    setLoadingRegistration(true)

    // Don't attempt to auto-register until wallet ready. Still show the modal
    // above since the wallet may be connecting.
    if (postRequestReady) {
      registered.current = true
      register()
    }
  }, [
    router,
    postRequestReady,
    discordNotifierSetup,
    setDiscordNotifierSetup,
    t,
    finishingRegistration,
    register,
  ])

  const unregister = useCallback(
    async (id: string) => {
      setLoadingRegistration(true)
      try {
        await postRequest(`/${coreAddress}/unregister`, {
          id,
        })

        toast.success(t('success.discordNotifierRemoved'))
        setRefreshing(true)
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        setLoadingRegistration(false)
      }
    },
    [coreAddress, postRequest, t]
  )

  return (
    <>
      <Tooltip title={t('info.setUpDiscordNotificationsTooltip')}>
        <IconButton
          Icon={DiscordNoCircleIcon}
          className="animate-fade-in"
          iconClassName="!w-[18px] !h-[18px]"
          onClick={() => setVisible(true)}
          variant="secondary"
        />
      </Tooltip>

      <StatelessDiscordNotifierConfigureModal
        ConnectWallet={() => <ConnectWallet center />}
        connected={isWalletConnected}
        doRegister={register}
        finishingRegistration={finishingRegistration}
        formDefaults={discordNotifierSetup}
        loadingRegistration={loadingRegistration}
        onClose={() => {
          setVisible(false)
          setFinishingRegistration(false)
        }}
        onDelete={unregister}
        redirectUri={redirectUri}
        refreshing={refreshing}
        registrations={registrations}
        setup={setup}
        visible={visible}
      />
    </>
  )
}
