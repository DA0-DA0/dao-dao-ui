import { useWallet } from '@noahsaso/cosmodal'

import { DaoCoreV2Selectors } from '@dao-dao/state'
import { useCachedLoadable } from '@dao-dao/stateless'
import { LoadingData, WalletVoteInfo } from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { useProposalModuleAdapterOptions } from '../../../react'
import { getVoteSelector } from '../contracts/DaoProposalMultiple.recoil'
import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingWalletVoteInfo = ():
  | undefined
  | LoadingData<WalletVoteInfo<MultipleChoiceVote>> => {
  const {
    coreAddress,
    proposalModule,
    proposalNumber,
    chain: { chain_id: chainId },
  } = useProposalModuleAdapterOptions()
  const { address: walletAddress } = useWallet()

  const loadingProposal = useLoadingProposal()

  const walletVoteLoadable = useCachedLoadable(
    walletAddress
      ? getVoteSelector({
          chainId,
          contractAddress: proposalModule.address,
          params: [{ proposalId: proposalNumber, voter: walletAddress }],
        })
      : undefined
  )

  const walletVotingPowerWhenProposalCreatedLoadable = useCachedLoadable(
    walletAddress && !loadingProposal.loading
      ? DaoCoreV2Selectors.votingPowerAtHeightSelector({
          chainId,
          contractAddress: coreAddress,
          params: [
            {
              address: walletAddress,
              height: loadingProposal.data.start_height,
            },
          ],
        })
      : undefined
  )

  const totalVotingPowerWhenProposalCreatedLoadable = useCachedLoadable(
    !loadingProposal.loading
      ? DaoCoreV2Selectors.totalPowerAtHeightSelector({
          chainId,
          contractAddress: coreAddress,
          params: [
            {
              height: loadingProposal.data.start_height,
            },
          ],
        })
      : undefined
  )

  // Return undefined when not connected.
  if (!walletAddress) {
    return undefined
  }

  if (
    loadingProposal.loading ||
    walletVoteLoadable.state !== 'hasValue' ||
    walletVotingPowerWhenProposalCreatedLoadable.state !== 'hasValue' ||
    totalVotingPowerWhenProposalCreatedLoadable.state !== 'hasValue'
  ) {
    return {
      loading: true,
    }
  }

  const proposal = loadingProposal.data
  const walletVote = walletVoteLoadable.contents.vote?.vote ?? undefined
  const walletVotingPowerWhenProposalCreated = Number(
    walletVotingPowerWhenProposalCreatedLoadable.contents.power
  )
  const couldVote = walletVotingPowerWhenProposalCreated > 0
  const totalVotingPowerWhenProposalCreated = Number(
    totalVotingPowerWhenProposalCreatedLoadable.contents.power
  )

  const canVote =
    couldVote && proposal.votingOpen && (!walletVote || proposal.allow_revoting)

  return {
    loading: false,
    data: {
      vote: walletVote,
      // If wallet could vote when this was open.
      couldVote,
      // If wallet can vote now.
      canVote,
      votingPowerPercent:
        (totalVotingPowerWhenProposalCreated === 0
          ? 0
          : walletVotingPowerWhenProposalCreated /
            totalVotingPowerWhenProposalCreated) * 100,
    },
  }
}
