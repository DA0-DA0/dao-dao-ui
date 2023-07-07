import { WalletConnectionStatus, useWallet } from '@noahsaso/cosmodal'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  LogInRequiredPage,
  Inbox as StatelessInbox,
  useAppContext,
} from '@dao-dao/stateless'
import { SITE_URL } from '@dao-dao/utils'

import { useInboxApi } from '../../hooks'
import { ConnectWallet } from '../ConnectWallet'
import { LinkWrapper } from '../LinkWrapper'
import { ProfileDisconnectedCard, ProfileHomeCard } from '../profile'

export const Inbox: NextPage = () => {
  const { t } = useTranslation()
  const api = useInboxApi()
  const {
    asPath,
    query: { code },
    isReady,
    push,
  } = useRouter()
  const { connected, status } = useWallet()

  const { inbox } = useAppContext()
  // Type-check, should always be loaded for dapp.
  if (!inbox) {
    throw new Error(t('error.loadingData'))
  }

  const { ready, verify: doVerify } = api

  const verify = useCallback(async () => {
    if (ready && isReady) {
      if (typeof code === 'string') {
        if (await doVerify(code)) {
          toast.success(t('info.emailVerified'))
        }
      } else {
        toast.error(t('error.invalidCode'))
      }

      push('/inbox/settings', undefined, { shallow: true })
    }
  }, [code, isReady, push, ready, t, doVerify])

  return (
    <>
      <NextSeo
        description={t('info.inboxDescription')}
        openGraph={{
          url: SITE_URL + asPath,
          title: t('title.inbox'),
          description: t('info.inboxDescription'),
        }}
        title={t('title.inbox')}
      />

      {connected ? (
        <StatelessInbox
          LinkWrapper={LinkWrapper}
          api={api}
          rightSidebarContent={<ProfileHomeCard />}
          state={inbox}
          verify={verify}
        />
      ) : (
        <LogInRequiredPage
          connectWalletButton={<ConnectWallet />}
          connecting={
            status === WalletConnectionStatus.Initializing ||
            status === WalletConnectionStatus.AttemptingAutoConnection ||
            status === WalletConnectionStatus.Connecting
          }
          rightSidebarContent={<ProfileDisconnectedCard />}
          title={t('title.inbox')}
        />
      )}
    </>
  )
}