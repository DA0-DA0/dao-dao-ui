import { useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { chainQueries, indexerQueries } from '@dao-dao/state/query'
import { refreshGovProposalsAtom } from '@dao-dao/state/recoil'
import { useChain } from '@dao-dao/stateless'

export const useRefreshGovProposals = () => {
  const { chainId } = useChain()

  const queryClient = useQueryClient()
  const setRefreshProposal = useSetRecoilState(refreshGovProposalsAtom(chainId))

  const refreshProposal = useCallback(() => {
    // Search/List
    queryClient.invalidateQueries({
      queryKey: chainQueries.searchGovProposals({
        chainId,
      }).queryKey,
    })
    queryClient.invalidateQueries({
      queryKey: chainQueries.searchAndDecodeGovProposals(queryClient, {
        chainId,
      }).queryKey,
    })
    queryClient.invalidateQueries({
      queryKey: chainQueries.govProposals(queryClient, {
        chainId,
      }).queryKey,
    })

    // Proposal
    queryClient.invalidateQueries({
      queryKey: indexerQueries.queryGeneric(queryClient, {
        chainId,
        formula: 'gov/proposal',
      }).queryKey,
    })
    queryClient.invalidateQueries({
      queryKey: ['chain', 'govProposal', { chainId }],
    })
    queryClient.invalidateQueries({
      queryKey: ['chain', 'govProposalTally', { chainId }],
    })
    queryClient.invalidateQueries({
      queryKey: ['chain', 'govProposalVote', { chainId }],
    })
    queryClient.invalidateQueries({
      queryKey: ['chain', 'govProposalVotes', { chainId }],
    })

    // Recoil
    setRefreshProposal((id) => id + 1)
  }, [setRefreshProposal, queryClient, chainId])

  return refreshProposal
}
