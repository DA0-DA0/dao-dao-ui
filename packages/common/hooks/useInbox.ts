import { NetworkStatus } from '@apollo/client'
import { useWallet } from '@noahsaso/cosmodal'
import { useEffect, useMemo } from 'react'

import {
  GetOpenProposalsWithWalletVotesVariables,
  blockHeightSelector,
  useCachedLoadable,
  useGetOpenProposalsWithWalletVotesVariables,
} from '@dao-dao/state'

import { pinnedDaosWithProposalModulesSelector } from '../selectors'

export const useInbox = () => {
  const { address: walletAddress } = useWallet()

  const blockHeightLoadable = useCachedLoadable(blockHeightSelector({}))
  const blockHeight =
    blockHeightLoadable.state === 'hasValue'
      ? blockHeightLoadable.contents
      : undefined

  const pinnedDaosWithProposalModulesLoadable = useCachedLoadable(
    pinnedDaosWithProposalModulesSelector
  )

  const queryVariables: GetOpenProposalsWithWalletVotesVariables = useMemo(
    () => ({
      proposalModuleAddresses:
        pinnedDaosWithProposalModulesLoadable.state === 'hasValue'
          ? pinnedDaosWithProposalModulesLoadable.contents.flatMap(
              ({ proposalModules }) =>
                proposalModules.map(({ address }) => address)
            )
          : [],
      walletAddress,
      currentDate: new Date(),
      currentHeight: blockHeight ?? 0,
    }),
    [
      blockHeight,
      pinnedDaosWithProposalModulesLoadable.state,
      pinnedDaosWithProposalModulesLoadable.contents,
      walletAddress,
    ]
  )

  // Automatically refetches when the variables change. blockHeight updates
  // once per minute, so this query will also update once per minute.
  const query = useGetOpenProposalsWithWalletVotesVariables(queryVariables)
  const { error, previousData, refetch, networkStatus } = query
  const data = query.data || previousData

  //! Errors.
  useEffect(() => {
    if (blockHeightLoadable.state === 'hasError') {
      console.error(blockHeightLoadable.contents)
    }
    if (pinnedDaosWithProposalModulesLoadable.state === 'hasError') {
      console.error(pinnedDaosWithProposalModulesLoadable.contents)
    }
    if (error) {
      console.error(error)
    }
  }, [
    blockHeightLoadable.contents,
    blockHeightLoadable.state,
    pinnedDaosWithProposalModulesLoadable.contents,
    pinnedDaosWithProposalModulesLoadable.state,
    error,
  ])

  const daosWithOpenUnvotedProposals =
    pinnedDaosWithProposalModulesLoadable.state === 'hasValue'
      ? pinnedDaosWithProposalModulesLoadable.contents.map(
          ({ coreAddress, proposalModules }) => ({
            coreAddress,
            proposalModules,
            // Undefined if data not yet loaded.
            openUnvotedProposals:
              data &&
              proposalModules.flatMap(
                (proposalModule) =>
                  data.proposalModules.nodes
                    .find(({ id }) => id === proposalModule.address)
                    // Only select proposals not voted on by the current wallet.
                    // Wallet filter performed in the query. If no wallet connected,
                    // searches for empty walletAddress, which doesn't exist, so there
                    // will be no votes. Thus we display all open proposals.
                    ?.proposals.nodes.filter(
                      ({ votes }) => votes.nodes.length === 0
                    )
                    .map(({ num }) => ({
                      proposalModule,
                      proposalNumber: num,
                    })) ?? []
              ),
          })
        )
      : []

  const proposalCount = daosWithOpenUnvotedProposals.reduce(
    (acc, { openUnvotedProposals }) =>
      acc + (openUnvotedProposals?.length ?? 0),
    0
  )

  return {
    loading:
      blockHeightLoadable.state === 'loading' ||
      pinnedDaosWithProposalModulesLoadable.state === 'loading',
    refetching:
      (blockHeightLoadable.state === 'hasValue' &&
        blockHeightLoadable.updating) ||
      (pinnedDaosWithProposalModulesLoadable.state === 'hasValue' &&
        pinnedDaosWithProposalModulesLoadable.updating) ||
      networkStatus === NetworkStatus.refetch,
    error,
    daosWithOpenUnvotedProposals,
    proposalCount,
    // Force no arguments.
    refetch: () => refetch(),
  }
}
