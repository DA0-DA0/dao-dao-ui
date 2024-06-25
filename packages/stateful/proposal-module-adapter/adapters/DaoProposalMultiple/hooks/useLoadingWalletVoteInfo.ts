import { LoadingData, WalletVoteInfo } from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'

import {
  useQueryLoadingDataWithError,
  useWalletWithSecretNetworkPermit,
} from '../../../../hooks'
import { useProposalModuleAdapterContext } from '../../../react'
import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingWalletVoteInfo = ():
  | undefined
  | LoadingData<WalletVoteInfo<MultipleChoiceVote>> => {
  const {
    proposalModule,
    options: { proposalNumber },
  } = useProposalModuleAdapterContext()
  const {
    address: walletAddress,
    permit,
    isSecretNetwork,
  } = useWalletWithSecretNetworkPermit({
    dao: proposalModule.dao.coreAddress,
  })

  const loadingProposal = useLoadingProposal()

  // TODO(dao-client secret): make sure these refresh when the permit updates
  const walletVoteLoading = useQueryLoadingDataWithError(
    proposalModule.getVoteQuery({
      proposalId: proposalNumber,
      voter: walletAddress,
    })
  )

  const walletVotingPowerWhenProposalCreatedLoading =
    useQueryLoadingDataWithError(
      loadingProposal.loading
        ? // loading state if proposal not yet loaded
          undefined
        : proposalModule.dao.getVotingPowerQuery(
            walletAddress,
            loadingProposal.data.start_height
          )
    )

  const totalVotingPowerWhenProposalCreatedLoading =
    useQueryLoadingDataWithError(
      loadingProposal.loading
        ? // loading state if proposal not yet loaded
          undefined
        : proposalModule.dao.getTotalVotingPowerQuery(
            loadingProposal.data.start_height
          )
    )

  // Return undefined when no permit on Secret Network.
  if (isSecretNetwork && !permit) {
    return undefined
  }

  if (
    loadingProposal.loading ||
    walletVoteLoading.loading ||
    walletVotingPowerWhenProposalCreatedLoading.loading ||
    totalVotingPowerWhenProposalCreatedLoading.loading
  ) {
    return {
      loading: true,
    }
  }

  const proposal = loadingProposal.data
  const walletVote =
    (!walletVoteLoading.errored && walletVoteLoading.data?.vote) || undefined
  const walletVotingPowerWhenProposalCreated =
    walletVotingPowerWhenProposalCreatedLoading.errored
      ? 0
      : Number(walletVotingPowerWhenProposalCreatedLoading.data.power)
  const couldVote = walletVotingPowerWhenProposalCreated > 0
  const totalVotingPowerWhenProposalCreated =
    totalVotingPowerWhenProposalCreatedLoading.errored
      ? 0
      : Number(totalVotingPowerWhenProposalCreatedLoading.data.power)

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
