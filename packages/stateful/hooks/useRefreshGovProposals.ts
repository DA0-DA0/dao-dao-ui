import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'

import { chainQueries } from '@dao-dao/state/query'
import { refreshGovProposalsAtom } from '@dao-dao/state/recoil'
import { useChain, useDependencyTrackedQueryClient } from '@dao-dao/stateless'

export const useRefreshGovProposals = () => {
  const { chainId } = useChain()

  const queryClient = useDependencyTrackedQueryClient()
  const setRefreshProposal = useSetRecoilState(refreshGovProposalsAtom(chainId))

  const refreshProposal = useCallback(() => {
    // Search/List
    queryClient.invalidate(
      chainQueries.govProposals({
        chainId,
      })
    )

    // Proposal
    queryClient.invalidate(['chain', 'govProposal', { chainId }])
    queryClient.invalidate(['chain', 'govProposalTally', { chainId }])
    queryClient.invalidate(['chain', 'govProposalVote', { chainId }])
    queryClient.invalidate(['chain', 'govProposalVotes', { chainId }])

    // Recoil
    setRefreshProposal((id) => id + 1)
  }, [setRefreshProposal, queryClient, chainId])

  return refreshProposal
}
