import { useCallback } from 'react'
import { useRecoilValue, constSelector, useSetRecoilState } from 'recoil'

import {
  proposalExecutionTXHashSelector,
  refreshProposalIdAtom,
  refreshProposalsIdAtom,
  useWallet,
} from '@dao-dao/state'
import { votingPowerAtHeightSelector } from '@dao-dao/state/recoil/selectors/clients/cw-core'
import {
  proposalSelector,
  getVoteSelector,
} from '@dao-dao/state/recoil/selectors/clients/cw-proposal-single'

import { useGovernanceModule } from '.'
import { DAO_ADDRESS } from '@/util'

export const useProposalInfo = (proposalId: number | undefined) => {
  const { address: walletAddress } = useWallet()

  const { governanceModuleAddress } = useGovernanceModule()

  const proposalResponse = useRecoilValue(
    governanceModuleAddress && proposalId !== undefined
      ? proposalSelector({
          contractAddress: governanceModuleAddress,
          params: [{ proposalId }],
        })
      : constSelector(undefined)
  )

  const voteResponse = useRecoilValue(
    governanceModuleAddress && proposalId !== undefined && walletAddress
      ? getVoteSelector({
          contractAddress: governanceModuleAddress,
          params: [{ proposalId, voter: walletAddress }],
        })
      : constSelector(undefined)
  )

  const votingPowerAtHeight = useRecoilValue(
    walletAddress && proposalResponse
      ? votingPowerAtHeightSelector({
          contractAddress: DAO_ADDRESS,
          params: [
            {
              address: walletAddress,
              height: proposalResponse.proposal.start_height,
            },
          ],
        })
      : constSelector(undefined)
  )

  const txHash = useRecoilValue(
    governanceModuleAddress && proposalId !== undefined
      ? proposalExecutionTXHashSelector({
          contractAddress: governanceModuleAddress,
          proposalId,
        })
      : constSelector(undefined)
  )

  const setRefreshProposalsId = useSetRecoilState(refreshProposalsIdAtom)
  const setRefreshProposalId = useSetRecoilState(
    refreshProposalIdAtom(proposalId ?? -1)
  )
  const refreshProposal = useCallback(() => {
    setRefreshProposalId((id) => id + 1)
  }, [setRefreshProposalId])
  const refreshProposalAndAll = useCallback(() => {
    setRefreshProposalsId((id) => id + 1)
    refreshProposal()
  }, [setRefreshProposalsId, refreshProposal])

  return {
    proposalResponse,
    voteResponse,
    votingPowerAtHeight,
    txHash,
    refreshProposal,
    refreshProposalAndAll,
  }
}
