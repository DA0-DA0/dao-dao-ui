// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  ProposalLine,
  ProposalLineProps,
  SuspenseLoader,
} from '@dao-dao/common'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import { pinnedDaoDropdownInfosSelector } from '@dao-dao/state'
import {
  DaoWithProposals,
  Inbox,
  PageLoader,
  ProfileDisconnectedCard,
} from '@dao-dao/ui'
import { SITE_URL } from '@dao-dao/utils'
import { NoContent } from '@dao-dao/ui'
import { WhereToVoteOutlined } from '@mui/icons-material'

import { ProfileHomeCard, useDAppContext } from '@/components'

const InnerInbox = () => {
  const { connected } = useWallet()
  const { t } = useTranslation()
  const pinnedDaoDropdownInfos = useRecoilValue(pinnedDaoDropdownInfosSelector)

  const {
    inbox: { loading, refetching, refetch, daosWithOpenUnvotedProposals },
  } = useDAppContext()

  const daosWithProposals = daosWithOpenUnvotedProposals
    .map(
      ({
        coreAddress,
        proposalModules,
        openUnvotedProposals,
      }): DaoWithProposals<ProposalLineProps> | undefined => {
        const daoDropdownInfo = pinnedDaoDropdownInfos.find(
          (dao) => dao.coreAddress === coreAddress
        )
        if (!daoDropdownInfo || !openUnvotedProposals) {
          return undefined
        }

        return {
          dao: daoDropdownInfo,
          proposals: openUnvotedProposals.map(
            ({ proposalModule: { prefix }, proposalNumber }) => ({
              proposalId: `${prefix}${proposalNumber}`,
              proposalModules,
              coreAddress,
              proposalViewUrl: `/dao/${coreAddress}/proposals/${prefix}${proposalNumber}`,
            })
          ),
        }
      }
    )
    .filter(Boolean) as DaoWithProposals<ProposalLineProps>[]

  return (
    <>
      <Inbox
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
      {
        daosWithProposals.length === 0 && <NoContent
          Icon={WhereToVoteOutlined}
          body={t('info.noProposalsYet')}
        />
      }
    </>
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
