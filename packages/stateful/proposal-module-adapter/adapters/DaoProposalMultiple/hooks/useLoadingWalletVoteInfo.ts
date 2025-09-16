import { HugeDecimal } from '@dao-dao/math'
import { MultipleChoiceProposalModule } from '@dao-dao/state/clients'
import { LoadingData, WalletVoteInfo } from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'

import {
  useDaoWithWalletSecretNetworkPermit,
  useQueryLoadingDataWithError,
} from '../../../../hooks'
import { useProposalModuleAdapterContext } from '../../../react'
import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingWalletVoteInfo = ():
  | undefined
  | LoadingData<WalletVoteInfo<MultipleChoiceVote>> => {
  const {
    proposalModule: _proposalModule,
    options: { proposalNumber },
  } = useProposalModuleAdapterContext()

  const proposalModule =
    _proposalModule as unknown as MultipleChoiceProposalModule

  // Re-renders when permit is updated.
  const {
    address: walletAddress,
    permit,
    isSecretNetwork,
  } = useDaoWithWalletSecretNetworkPermit({
    dao: proposalModule.dao,
  })

  const loadingProposal = useLoadingProposal()

  // Refreshes when Secret Network permit is updated since the wallet hook
  // above re-renders.
  const walletVoteLoading = useQueryLoadingDataWithError(
    proposalModule.getVoteQuery({
      proposalId: proposalNumber,
      voter: walletAddress,
    })
  )

  // Refreshes when Secret Network permit is updated since the wallet hook
  // above re-renders.
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

  const unvotedDelegatedVotingPowerLoading = useQueryLoadingDataWithError(
    loadingProposal.loading || !walletAddress
      ? // loading state if proposal not yet loaded
        undefined
      : proposalModule.getUnvotedDelegatedVotingPowerQuery({
          delegate: walletAddress,
          proposalId: proposalNumber,
        })
  )

  const delegateRegistrationLoading = useQueryLoadingDataWithError(
    loadingProposal.loading || !walletAddress
      ? // loading state if proposal not yet loaded
        undefined
      : proposalModule.getDelegateRegistrationQuery({
          delegate: walletAddress,
          height: loadingProposal.data.start_height,
        })
  )

  // Return undefined when no permit on Secret Network.
  if (isSecretNetwork && !permit) {
    return undefined
  }

  if (
    loadingProposal.loading ||
    walletVotingPowerWhenProposalCreatedLoading.loading ||
    totalVotingPowerWhenProposalCreatedLoading.loading ||
    unvotedDelegatedVotingPowerLoading.loading ||
    delegateRegistrationLoading.loading
  ) {
    return {
      loading: true,
    }
  }

  const proposal = loadingProposal.data
  const walletVote =
    (!walletVoteLoading.loading &&
      !walletVoteLoading.errored &&
      walletVoteLoading.data?.vote?.vote) ||
    undefined
  const individualVotingPower =
    walletVotingPowerWhenProposalCreatedLoading.errored
      ? HugeDecimal.zero
      : HugeDecimal.from(walletVotingPowerWhenProposalCreatedLoading.data.power)
  const unvotedDelegatedVotingPower = unvotedDelegatedVotingPowerLoading.errored
    ? HugeDecimal.zero
    : unvotedDelegatedVotingPowerLoading.data.effective
  const couldVote = individualVotingPower.isPositive()
  const totalVotingPowerWhenProposalCreated =
    totalVotingPowerWhenProposalCreatedLoading.errored
      ? HugeDecimal.zero
      : HugeDecimal.from(totalVotingPowerWhenProposalCreatedLoading.data.power)

  const canVote =
    couldVote &&
    proposal.votingOpen &&
    ((!walletVoteLoading.loading &&
      !walletVoteLoading.errored &&
      !walletVote) ||
      proposal.allow_revoting)

  const votingPower = individualVotingPower.plus(unvotedDelegatedVotingPower)

  const isDelegate =
    !delegateRegistrationLoading.errored &&
    !!delegateRegistrationLoading.data?.registered

  return {
    loading: false,
    updating: walletVoteLoading.loading || walletVoteLoading.updating,
    data: {
      vote: walletVote,
      // If wallet could vote when this was open.
      couldVote,
      // If wallet can vote now.
      canVote,
      isDelegate,
      votingPowerPercent: totalVotingPowerWhenProposalCreated.isZero()
        ? 0
        : votingPower
            .div(totalVotingPowerWhenProposalCreated)
            .times(100)
            .toNumber(),
      individualVotingPowerPercent: totalVotingPowerWhenProposalCreated.isZero()
        ? 0
        : individualVotingPower
            .div(totalVotingPowerWhenProposalCreated)
            .times(100)
            .toNumber(),
      unvotedDelegatedVotingPowerPercent:
        totalVotingPowerWhenProposalCreated.isZero()
          ? 0
          : unvotedDelegatedVotingPower
              .div(totalVotingPowerWhenProposalCreated)
              .times(100)
              .toNumber(),
    },
  }
}
