import { useWallet } from '@noahsaso/cosmodal'
import { NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { InboxVerify as StatelessInboxVerify } from '@dao-dao/stateless'
import { SITE_URL } from '@dao-dao/utils'

import { useInboxApi } from '../../hooks'
import { ConnectWallet } from '../ConnectWallet'
import { ProfileDisconnectedCard, ProfileHomeCard } from '../profile'

export const InboxVerify: NextPage = () => {
  const { t } = useTranslation()
  const { ready, verify: doVerify, updating } = useInboxApi()
  const {
    query: { code },
    isReady,
    push,
  } = useRouter()
  const { connected, status } = useWallet()

  const [promptedVerify, setPromptedVerify] = useState(false)
  const verify = useCallback(async () => {
    if (ready && isReady && !promptedVerify) {
      if (typeof code === 'string') {
        setPromptedVerify(true)
        if (await doVerify(code)) {
          toast.success(t('info.emailVerified'))
        }
      } else {
        toast.error(t('error.invalidCode'))
      }

      push('/inbox')
    }
  }, [code, isReady, promptedVerify, push, ready, t, doVerify])

  return (
    <>
      <NextSeo
        description={t('info.inboxDescription')}
        openGraph={{
          url: SITE_URL + '/inbox/verify',
          title: t('title.inbox'),
          description: t('info.inboxDescription'),
        }}
        title={t('title.inbox')}
      />

      <StatelessInboxVerify
        connectWalletButton={<ConnectWallet />}
        rightSidebarContent={
          connected ? <ProfileHomeCard /> : <ProfileDisconnectedCard />
        }
        status={status}
        verify={verify}
        verifying={updating}
      />
    </>
  )
}
