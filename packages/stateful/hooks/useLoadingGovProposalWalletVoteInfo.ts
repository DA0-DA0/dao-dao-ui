import { govProposalVoteSelector } from '@dao-dao/state'
import { useCachedLoading, useConfiguredChainContext } from '@dao-dao/stateless'
import { GovProposalWalletVoteInfo, LoadingData } from '@dao-dao/types'

import { useWallet } from './useWallet'

export const useLoadingGovProposalWalletVoteInfo = (
  proposalId: number | string
): LoadingData<GovProposalWalletVoteInfo> => {
  const {
    chain: { chain_id: chainId },
  } = useConfiguredChainContext()
  const { address: voter } = useWallet()

  const loadingWalletVote = useCachedLoading(
    voter
      ? govProposalVoteSelector({
          chainId,
          proposalId: Number(proposalId),
          voter,
        })
      : undefined,
    undefined
  )

  const walletVoteInfo: LoadingData<GovProposalWalletVoteInfo> =
    loadingWalletVote.loading || !loadingWalletVote.data
      ? {
          loading: true,
        }
      : {
          loading: false,
          data: {
            vote:
              // If no votes, return undefined to indicate has not voted.
              loadingWalletVote.data.length === 0
                ? undefined
                : loadingWalletVote.data.sort(
                    (a, b) => Number(b.weight) - Number(a.weight)
                  ),
          },
        }

  return walletVoteInfo
}
