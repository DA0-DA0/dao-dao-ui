// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'
import { NextSeo } from 'next-seo'
import { useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import {
  ProposalLine,
  ProposalLineProps,
  SuspenseLoader,
} from '@dao-dao/common'
import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  pinnedDaosWithProposalModulesSelector,
  useOpenProposalsWithWalletVotesQuery,
} from '@dao-dao/state'
import { ProposalModule } from '@dao-dao/tstypes'
import {
  DaoWithProposals,
  Inbox,
  PageLoader,
  ProfileDisconnectedCard,
} from '@dao-dao/ui'
import { SITE_URL } from '@dao-dao/utils'

import { ProfileHomeCard } from '@/components'

const InnerInbox = () => {
  const { connected, address: walletAddress = '' } = useWallet()
  const pinnedDaosWithProposalModules = useRecoilValue(
    pinnedDaosWithProposalModulesSelector
  )

  const proposalModuleAddresses = pinnedDaosWithProposalModules.flatMap(
    ({ proposalModules }) => proposalModules.map(({ address }) => address)
  )

  const {
    loading,
    error,
    data: openUnvotedProposals,
  } = useOpenProposalsWithWalletVotesQuery(
    proposalModuleAddresses,
    walletAddress
  )

  //! Loading errors.
  useEffect(() => {
    if (error) {
      console.error(error)
    }
  }, [error])

  const daosWithProposals = useMemo(
    () =>
      pinnedDaosWithProposalModules
        .map(
          ({
            dao,
            proposalModules,
          }): DaoWithProposals<ProposalLineProps> | undefined => {
            // Get open unvoted proposal numbers for all proposal module.
            const proposalModulesWithNumbers =
              (openUnvotedProposals?.proposalModules.nodes
                .map(({ id, proposals }) => {
                  // Check if any proposal modules match.
                  const proposalModule = proposalModules.find(
                    ({ address }) => id === address
                  )
                  if (!proposalModule) {
                    return
                  }

                  const proposalNumbers = proposals.nodes
                    .filter(
                      // Only select proposals not voted on by the current
                      // wallet. Wallet filter performed in the query.
                      ({ votes }) => votes.nodes.length === 0
                    )
                    .map(({ num }) => num)

                  return {
                    proposalModule,
                    proposalNumbers,
                  }
                })
                .filter(Boolean) ?? []) as {
                proposalModule: ProposalModule
                proposalNumbers: number[]
              }[]

            return proposalModulesWithNumbers.length
              ? {
                  dao,
                  proposals: proposalModulesWithNumbers.flatMap(
                    ({ proposalModule: { prefix }, proposalNumbers }) =>
                      proposalNumbers.map((proposalNumber) => ({
                        proposalId: `${prefix}${proposalNumber}`,
                        proposalModules,
                        coreAddress: dao.coreAddress,
                        proposalViewUrl: `/dao/${dao.coreAddress}/proposals/${prefix}${proposalNumber}`,
                      }))
                  ),
                }
              : undefined
          }
        )
        .filter(Boolean) as DaoWithProposals<ProposalLineProps>[],
    [openUnvotedProposals?.proposalModules, pinnedDaosWithProposalModules]
  )

  return (
    <Inbox
      ProposalLine={ProposalLine}
      daosWithProposals={
        loading || !openUnvotedProposals
          ? { loading: true }
          : {
              loading: false,
              data: daosWithProposals,
            }
      }
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
