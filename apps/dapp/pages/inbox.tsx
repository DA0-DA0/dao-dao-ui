// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  LinkWrapper,
  ProfileDisconnectedCard,
  ProfileHomeCard,
  ProposalLine,
  ProposalLineProps,
  SuspenseLoader,
  followedDaoDropdownInfosSelector,
} from '@dao-dao/stateful'
import {
  DaoWithProposals,
  Inbox,
  PageLoader,
  useAppLayoutContext,
} from '@dao-dao/stateless'
import { CHAIN_ID, SITE_URL } from '@dao-dao/utils'

const InnerInbox = () => {
  const { connected } = useWallet()
  const followedDaoDropdownInfos = useRecoilValue(
    followedDaoDropdownInfosSelector
  )

  const {
    inbox: { loading, refetching, refetch, daosWithOpenProposals },
  } = useAppLayoutContext()

  const daosWithProposals = daosWithOpenProposals
    .map(
      ({
        coreAddress,
        proposalModules,
        openProposals,
      }): DaoWithProposals<ProposalLineProps> | undefined => {
        const daoDropdownInfo = followedDaoDropdownInfos.find(
          (dao) => dao.coreAddress === coreAddress
        )
        if (!daoDropdownInfo || !openProposals) {
          return undefined
        }

        return {
          dao: daoDropdownInfo,
          proposals: openProposals.map(
            ({ proposalModule: { prefix }, proposalNumber }) => ({
              chainId: CHAIN_ID,
              coreAddress,
              proposalId: `${prefix}${proposalNumber}`,
              proposalModules,
              proposalViewUrl: `/dao/${coreAddress}/proposals/${prefix}${proposalNumber}`,
            })
          ),
        }
      }
    )
    .filter(Boolean) as DaoWithProposals<ProposalLineProps>[]

  return (
    <Inbox
      LinkWrapper={LinkWrapper}
      ProposalLine={ProposalLine}
      daosWithProposals={
        loading
          ? { loading: true }
          : {
              loading: false,
              data: daosWithProposals,
            }
      }
      onRefresh={refetch}
      refreshing={loading || refetching}
      rightSidebarContent={
        connected ? <ProfileHomeCard /> : <ProfileDisconnectedCard />
      }
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
