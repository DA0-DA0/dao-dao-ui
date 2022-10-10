import { useWallet } from '@noahsaso/cosmodal'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValue } from 'recoil'

import { CwCoreV0_2_0Selectors, useVotingModule } from '@dao-dao/state'
import { WalletVoteInfo } from '@dao-dao/tstypes'
import {
  Status,
  Vote,
} from '@dao-dao/tstypes/contracts/CwProposalSingle.common'

import { useProposalModuleAdapterOptions } from '../../../react'
import { getVoteSelector } from '../contracts/CwProposalSingle.common.recoil'
import { useProposal } from './useProposal'

export const useWalletVoteInfo = (): WalletVoteInfo<Vote> => {
  const { t } = useTranslation()
  const { coreAddress, proposalModule, proposalNumber } =
    useProposalModuleAdapterOptions()
  const { address: walletAddress = '' } = useWallet()

  const { totalVotingWeight } = useVotingModule(coreAddress, {
    fetchMembership: true,
  })
  if (totalVotingWeight === undefined) {
    throw new Error(t('error.loadingData'))
  }

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
        ? CwCoreV0_2_0Selectors.votingPowerAtHeightSelector({
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
      (walletVotingPowerWhenProposalCreated / totalVotingWeight) * 100,
  }
}
