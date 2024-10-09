import { useQueryClient } from '@tanstack/react-query'

import { chainQueries } from '@dao-dao/state'
import { useConfiguredChainContext } from '@dao-dao/stateless'
import { GovProposalWalletVoteInfo, LoadingDataWithError } from '@dao-dao/types'

import { useQueryLoadingDataWithError } from './query'
import { useWallet } from './useWallet'

export const useLoadingGovProposalWalletVoteInfo = (
  proposalId: number | string
): LoadingDataWithError<GovProposalWalletVoteInfo> => {
  const {
    chain: { chainId },
  } = useConfiguredChainContext()
  const { address: voter } = useWallet()
  const queryClient = useQueryClient()

  return useQueryLoadingDataWithError(
    voter
      ? chainQueries.govProposalVote(queryClient, {
          chainId,
          proposalId: Number(proposalId),
          voter,
        })
      : undefined,
    (data): GovProposalWalletVoteInfo => ({
      // If no votes, return null to indicate no vote.
      vote:
        data.length === 0
          ? null
          : data.sort((a, b) => Number(b.weight) - Number(a.weight)),
    })
  )
}
