import { useCallback, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import { discordNotifierSetupAtom, mountedInBrowserAtom } from '@dao-dao/state'
import { PageLoader, useNavHelpers } from '@dao-dao/stateless'
import { DaoPageMode, DaoTabId } from '@dao-dao/types'

export type DiscordRedirectProps = {
  // The discord page renders outside the context of any one DAO, but we still
  // to be able to use the nav helpers to redirect to the desired DAO page on
  // the SDA. Thus, the SDA must manually specify the mode to use.
  overrideMode?: DaoPageMode
}

export const DiscordRedirect = ({ overrideMode }: DiscordRedirectProps) => {
  const { t } = useTranslation()
  const { goToDao, router } = useNavHelpers(overrideMode)
  const [discordNotifierSetup, setDiscordNotificationSetup] = useRecoilState(
    discordNotifierSetupAtom
  )
  const mountedInBrowser = useRecoilValue(mountedInBrowserAtom)

  const redirect = useCallback(async () => {
    const { state, code } = router.query
    if (
      discordNotifierSetup &&
      typeof state === 'string' &&
      typeof code === 'string'
    ) {
      // If state doesn't match, clear setup state, error, and redirect to DAO.
      if (state !== discordNotifierSetup.state) {
        setDiscordNotificationSetup(null)
        toast.error(t('error.discordAuthFailed'))
        goToDao(discordNotifierSetup.coreAddress)
        return
      }

      // If state matches, redirect to DAO page with code parameter.
      goToDao(
        discordNotifierSetup.coreAddress,
        {
          discordNotifier: code,
        },
        DaoTabId.Proposals
      )
    } else {
      // If necessary data is not loaded, just redirect home. We are probably
      // not in a setup flow.
      router.push('/')
    }
  }, [discordNotifierSetup, goToDao, router, setDiscordNotificationSetup, t])

  const redirected = useRef(false)
  useEffect(() => {
    if (!mountedInBrowser || !router.isReady || redirected.current) {
      return
    }

    // Only redirect once.
    redirected.current = true
    redirect()
  }, [mountedInBrowser, redirect, router.isReady])

  return <PageLoader />
}
