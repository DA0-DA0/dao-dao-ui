// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilState, useRecoilValue } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { discordNotifierSetupAtom, mountedInBrowserAtom } from '@dao-dao/state'
import { PageLoader } from '@dao-dao/stateless'

const DiscordPage: NextPage = () => {
  const { t } = useTranslation()
  const router = useRouter()
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
        router.push(`/dao/${discordNotifierSetup.coreAddress}`)
        return
      }

      // If state matches, redirect to DAO page with code parameter.
      router.push(
        `/dao/${
          discordNotifierSetup.coreAddress
        }?discordNotifier=${encodeURIComponent(code)}`
      )
    } else {
      // If necessary data is not loaded, just redirect home. We are probably
      // not in a setup flow.
      router.push('/home')
    }
  }, [discordNotifierSetup, router, setDiscordNotificationSetup, t])

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

export default DiscordPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
