import { DaoCoreV2Selectors } from '@dao-dao/state'
import { useCachedLoadable, useLoadingPromise } from '@dao-dao/stateless'
import { LoadingData, WalletVoteInfo } from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { useWalletWithSecretNetworkPermit } from '../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../react'
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
  const {
    address: walletAddress,
    permit,
    dao,
  } = useWalletWithSecretNetworkPermit({
    dao: coreAddress,
  })

  const loadingProposal = useLoadingProposal()

  const walletVoteLoading = useLoadingPromise({
    // Loading state if wallet not connected.
    promise: walletAddress
      ? () =>
          // TODO(dao-client): Load proposal module in adapter prob
          dao.proposalModules
            .find((m) => m.info.address === proposalModule.address)
            ?.getVote(proposalNumber, walletAddress) || Promise.resolve(null)
      : undefined,
    // Refresh when permit, DAO, proposal module, or wallet changes.
    deps: [permit, dao, proposalModule.address, walletAddress],
  })

  const walletVotingPowerWhenProposalCreatedLoading = useLoadingPromise({
    // Loading state if proposal not loaded or wallet not connected.
    promise:
      !loadingProposal.loading && walletAddress
        ? () =>
            dao.getVotingPower(walletAddress, loadingProposal.data.start_height)
        : undefined,
    // Refresh when permit, DAO, or wallet changes.
    deps: [permit, dao, walletAddress],
  })

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

  // Return undefined when no permit.
  if (!permit) {
    return undefined
  }

  if (
    loadingProposal.loading ||
    walletVoteLoading.loading ||
    walletVotingPowerWhenProposalCreatedLoading.loading ||
    totalVotingPowerWhenProposalCreatedLoadable.state !== 'hasValue'
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
      : Number(walletVotingPowerWhenProposalCreatedLoading.data)
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
