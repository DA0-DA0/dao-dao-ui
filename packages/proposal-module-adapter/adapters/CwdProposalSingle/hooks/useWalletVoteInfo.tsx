import { useWallet } from '@noahsaso/cosmodal'
import { constSelector, useRecoilValue } from 'recoil'

import { CwdCoreV2Selectors } from '@dao-dao/state'
import { WalletVoteInfo } from '@dao-dao/types'
import {
  Status,
  Vote,
} from '@dao-dao/types/contracts/CwdProposalSingle.common'

import { useProposalModuleAdapterOptions } from '../../../react'
import { getVoteSelector } from '../contracts/CwdProposalSingle.common.recoil'
import { useProposal } from './useProposal'

export const useWalletVoteInfo = (): WalletVoteInfo<Vote> => {
  const { coreAddress, proposalModule, proposalNumber } =
    useProposalModuleAdapterOptions()
  const { address: walletAddress = '' } = useWallet()

  const proposal = useProposal()

  const walletVote = useRecoilValue(
    walletAddress
      ? getVoteSelector({
          contractAddress: proposalModule.address,
          params: [{ proposalId: proposalNumber, voter: walletAddress }],
        })
      : constSelector(undefined)
  )?.vote?.vote

  const walletVotingPowerWhenProposalCreated = Number(
    useRecoilValue(
      walletAddress
        ? CwdCoreV2Selectors.votingPowerAtHeightSelector({
            contractAddress: coreAddress,
            params: [
              {
                address: walletAddress,
                height: proposal.start_height,
              },
            ],
          })
        : constSelector(undefined)
    )?.power ?? '0'
  )

  const totalVotingPowerWhenProposalCreated = Number(
    useRecoilValue(
      CwdCoreV2Selectors.totalPowerAtHeightSelector({
        contractAddress: coreAddress,
        params: [
          {
            height: proposal.start_height,
          },
        ],
      })
    ).power
  )

  return {
    vote: walletVote,
    // If wallet could vote when this was open.
    couldVote: walletVotingPowerWhenProposalCreated > 0,
    // Can vote if proposal is open, has not already voted or revoting is
    // allowed, and had voting power when proposal was created.
    canVote:
      proposal.status === Status.Open &&
      (proposal.allow_revoting || !walletVote) &&
      walletVotingPowerWhenProposalCreated > 0,
    votingPowerPercent:
      (totalVotingPowerWhenProposalCreated === 0
        ? 0
        : walletVotingPowerWhenProposalCreated /
          totalVotingPowerWhenProposalCreated) * 100,
  }
}
