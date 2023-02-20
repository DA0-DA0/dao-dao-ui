// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'react-i18next'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  LinkWrapper,
  ProfileDisconnectedCard,
  ProfileHomeCard,
  SuspenseLoader,
} from '@dao-dao/stateful'
import { Inbox, PageLoader, useAppContext } from '@dao-dao/stateless'
import { SITE_URL } from '@dao-dao/utils'

const InnerInbox = () => {
  const { t } = useTranslation()
  const { connected } = useWallet()

  const { inbox } = useAppContext()
  // Type-check, should always be loaded for dapp.
  if (!inbox) {
    throw new Error(t('error.loadingData'))
  }

  return (
    <Inbox
      LinkWrapper={LinkWrapper}
      rightSidebarContent={
        connected ? <ProfileHomeCard /> : <ProfileDisconnectedCard />
      }
      state={inbox}
    />
  )
}

export const InboxPage: NextPage = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        description={t('info.inboxDescription')}
        openGraph={{
          url: SITE_URL + '/inbox',
          title: t('title.inbox'),
          description: t('info.inboxDescription'),
        }}
        title={t('title.inbox')}
      />

      <SuspenseLoader fallback={<PageLoader />}>
        <InnerInbox />
      </SuspenseLoader>
    </>
  )
}

export default InboxPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
