// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { useWallet } from '@noahsaso/cosmodal'
import { GetStaticProps, NextPage } from 'next'
import { useEffect, useMemo } from 'react'
import { useRecoilValue, useRecoilValueLoadable } from 'recoil'

import { serverSideTranslations } from '@dao-dao/i18n/serverSideTranslations'
import {
  pinnedDaoCardInfoSelector,
  pinnedDaosWithProposalModulesSelector,
  useOpenProposalsWithWalletVotesQuery,
  usePinnedDaos,
} from '@dao-dao/state'
import { DaoCardInfo, ProposalModule } from '@dao-dao/tstypes'
import {
  DaoWithProposals,
  Home,
  Inbox,
  ProfileDisconnectedCard,
} from '@dao-dao/ui'

import { ProfileHomeCard } from '@/components'
import {
  ProposalLine,
  ProposalLineProps,
} from '@dao-dao/common'

const InboxPage: NextPage = () => {
  const { connected, address: walletAddress = '' } = useWallet()
  const pinnedDaosWithProposalModules = useRecoilValue(
    pinnedDaosWithProposalModulesSelector
  )

  const proposalModuleAddresses = pinnedDaosWithProposalModules.flatMap(
    ({ proposalModules }) => proposalModules.map(({ address }) => address)
  )

  console.log(pinnedDaosWithProposalModules, proposalModuleAddresses)

  const {
    loading,
    error,
    data: openUnvotedProposals,
  } = useOpenProposalsWithWalletVotesQuery(proposalModuleAddresses, walletAddress)

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
          ({ dao, proposalModules }): DaoWithProposals<ProposalLineProps> | undefined => {
            // Get open unvoted proposal numbers for all proposal module.
            const proposalModulesWithNumbers =
              (openUnvotedProposals?.proposalModules
                .map(({ id, proposals }) => {
                  // Check if any proposal modules match.
                  const proposalModule = proposalModules.find(
                    ({ address }) => id === address
                  )
                  if (!proposalModule) {
                    return
                  }

                  const proposalNumbers = proposals
                    .filter(
                      // Only select proposals not voted on by the current
                      // wallet. Wallet filter performed in the query.
                      ({ votes }) => votes.length === 0
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
                        proposalViewUrl: `/dao/${dao.coreAddress}/proposal/${prefix}${proposalNumber}`,
                      }))
                  ),
                }
              : undefined
          }
        )
        .filter(Boolean) as DaoWithProposals<ProposalLineProps>[],
    []
  )

  return (
    <Inbox
      rightSidebarContent={
        connected ? <ProfileHomeCard /> : <ProfileDisconnectedCard />
      }
      daosWithProposals={
        loading || !openUnvotedProposals
          ? { loading: true }
          : {
              loading: false,
              data: daosWithProposals,
            }
      }
      ProposalLine={ProposalLine}
    />
  )
}

export default InboxPage

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['translation'])),
  },
})
