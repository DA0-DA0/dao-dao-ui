import { NetworkStatus, gql, useQuery } from '@apollo/client'
import { useWallet } from '@noahsaso/cosmodal'
import { useEffect, useMemo } from 'react'

import { useCachedLoadable } from '../hooks/useCachedLoadable'
import { blockHeightSelector } from '../recoil/selectors/chain'
import { pinnedDaosWithProposalModulesSelector } from '../recoil/selectors/pinned'

// A proposal is open if all of the following cases are true:
//   - `open` is true
//   - `expiresAtDate` is empty OR after the current date
//   - `expiresAtHeight` is empty OR after the current height

// The `open` field gets updated upon proposal execution, close, or a deciding
// vote being cast. When no deciding vote is cast (i.e. revoting is allowed and
// the proposal waits to expire, or a proposal fails by expiring before it could
// pass), and the proposal is not executed or closed after voting ends, there is
// no event to trigger a state change, so the indexer does not know it has
// closed. Thus, a proposal may be open but still expired, so we have to check
// the expiration condition.
const GET_OPEN_PROPOSALS_WITH_WALLET_VOTES = gql`
  query GetOpenProposalsWithWalletVotes(
    $proposalModuleAddresses: [String!]
    $walletAddress: String = ""
    $currentDate: Datetime!
    $currentHeight: Int!
  ) @api(name: proposals) {
    proposalModules(filter: { id: { in: $proposalModuleAddresses } }) {
      nodes {
        id
        proposals(
          filter: {
            and: [
              { open: { equalTo: true } }
              {
                or: [
                  { expiresAtDate: { isNull: true } }
                  { expiresAtDate: { greaterThan: $currentDate } }
                ]
              }
              {
                or: [
                  { expiresAtHeight: { isNull: true } }
                  { expiresAtHeight: { greaterThan: $currentHeight } }
                ]
              }
            ]
          }
        ) {
          nodes {
            id
            num
            open
            expiresAtDate
            expiresAtHeight
            votes(filter: { walletId: { equalTo: $walletAddress } }) {
              nodes {
                id
              }
            }
          }
        }
      }
    }
  }
`

interface GetOpenProposalsWithWalletVotes {
  proposalModules: {
    nodes: {
      id: string
      proposals: {
        nodes: {
          id: string
          num: number
          votes: {
            nodes: {
              id: string
            }[]
          }
        }[]
      }
    }[]
  }
}

interface GetOpenProposalsWithWalletVotesVariables {
  proposalModuleAddresses: string[]
  walletAddress?: string
  currentDate: Date
  currentHeight: number
}

export const useInbox = () => {
  const { address: walletAddress } = useWallet()

  const blockHeightLoadable = useCachedLoadable(blockHeightSelector)
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

  const query = useQuery<
    GetOpenProposalsWithWalletVotes,
    GetOpenProposalsWithWalletVotesVariables
  >(GET_OPEN_PROPOSALS_WITH_WALLET_VOTES, {
    // Automatically refetches when the variables change. blockHeight updates
    // once per minute, so this query will also update once per minute.
    variables: queryVariables,
  })
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
