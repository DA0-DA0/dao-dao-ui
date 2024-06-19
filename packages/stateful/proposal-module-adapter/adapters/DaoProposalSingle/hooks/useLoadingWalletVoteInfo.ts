import {
  DaoCoreV2Selectors,
  DaoProposalSingleCommonSelectors,
} from '@dao-dao/state'
import { useCachedLoadable, useLoadingPromise } from '@dao-dao/stateless'
import { LoadingData, WalletVoteInfo } from '@dao-dao/types'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'

import { useWalletWithSecretNetworkPermit } from '../../../../hooks'
import { useProposalModuleAdapterOptions } from '../../../react'
import { useLoadingProposal } from './useLoadingProposal'

export const useLoadingWalletVoteInfo = ():
  | undefined
  | LoadingData<WalletVoteInfo<Vote>> => {
  const {
    coreAddress,
    proposalModule,
    proposalNumber,
    chain: { chain_id: chainId },
    isPreProposeApprovalProposal,
  } = useProposalModuleAdapterOptions()
  const {
    isSecretNetwork,
    address: walletAddress,
    permit,
    dao,
  } = useWalletWithSecretNetworkPermit({
    dao: coreAddress,
  })

  const loadingProposal = useLoadingProposal()

  const walletVoteLoadable = useCachedLoadable(
    (isSecretNetwork ? permit : walletAddress)
      ? DaoProposalSingleCommonSelectors.getVoteSelector({
          chainId,
          contractAddress: proposalModule.address,
          params: [
            {
              proposalId: proposalNumber,
              ...(isSecretNetwork
                ? { auth: { permit } }
                : { voter: walletAddress }),
            },
          ],
        })
      : undefined
  )

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

  // Return undefined when no permit or when pre-propose proposal (which doesn't
  // have voting).
  if (!permit || isPreProposeApprovalProposal) {
    return undefined
  }

  if (
    loadingProposal.loading ||
    walletVoteLoadable.state !== 'hasValue' ||
    walletVotingPowerWhenProposalCreatedLoading.loading ||
    totalVotingPowerWhenProposalCreatedLoadable.state !== 'hasValue'
  ) {
    return {
      loading: true,
    }
  }

  const proposal = loadingProposal.data
  const walletVote = walletVoteLoadable.contents.vote?.vote ?? undefined
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
