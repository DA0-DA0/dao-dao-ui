import { useTranslation } from 'react-i18next'
import TimeAgo from 'react-timeago'

import {
  chainStakingPoolSelector,
  govParamsSelector,
  govProposalSelector,
  govProposalTallySelector,
  govProposalVoteSelector,
} from '@dao-dao/state'
import {
  useCachedLoading,
  useConfiguredChainContext,
  useTranslatedTimeDeltaFormatter,
} from '@dao-dao/stateless'
import {
  GovProposalVotesInfo,
  GovProposalWalletVoteInfo,
  GovProposalWithMetadata,
  LoadingData,
  ProcessedTQType,
  ProposalTimestampInfo,
} from '@dao-dao/types'
import {
  formatDate,
  formatDateTimeTz,
  formatPercentOf100,
} from '@dao-dao/utils'
import { ProposalStatus } from '@dao-dao/utils/protobuf/codegen/cosmos/gov/v1beta1/gov'

import { useWallet } from './useWallet'

// Returns a proposal wrapped in a LoadingData object to allow the UI to respond
// to its loading state.
export const useLoadingGovProposal = (
  proposalId: string | number
): LoadingData<GovProposalWithMetadata> => {
  const { t } = useTranslation()
  const { chain } = useConfiguredChainContext()
  const { address: voter } = useWallet()

  const loadingProposal = useCachedLoading(
    govProposalSelector({
      chainId: chain.chain_id,
      proposalId: Number(proposalId),
    }),
    undefined,
    // If proposal undefined (due to a selector error), an error will be thrown.
    () => {
      throw new Error(t('error.loadingData'))
    }
  )

  const loadingProposalTally = useCachedLoading(
    govProposalTallySelector({
      chainId: chain.chain_id,
      proposalId: Number(proposalId),
    }),
    undefined,
    // If proposal undefined (due to a selector error), an error will be thrown.
    () => {
      throw new Error(t('error.loadingData'))
    }
  )

  const loadingWalletVote = useCachedLoading(
    voter
      ? govProposalVoteSelector({
          chainId: chain.chain_id,
          proposalId: Number(proposalId),
          voter,
        })
      : undefined,
    undefined
  )

  const loadingGovParams = useCachedLoading(
    govParamsSelector({
      chainId: chain.chain_id,
    }),
    undefined,
    // If undefined (due to a selector error), an error will be thrown.
    () => {
      throw new Error(t('error.loadingData'))
    }
  )

  const loadingChainStakingPool = useCachedLoading(
    chainStakingPoolSelector({
      chainId: chain.chain_id,
    }),
    undefined,
    // If undefined (due to a selector error), an error will be thrown.
    () => {
      throw new Error(t('error.loadingData'))
    }
  )

  const timeAgoFormatter = useTranslatedTimeDeltaFormatter({ words: false })

  // Since an error will be thrown on a selector error, this .data check is just
  // a typecheck. It will not return loading forever if the selector fails.
  if (
    loadingProposal.loading ||
    !loadingProposal.data ||
    loadingProposalTally.loading ||
    !loadingProposalTally.data ||
    loadingGovParams.loading ||
    !loadingGovParams.data ||
    loadingChainStakingPool.loading ||
    !loadingChainStakingPool.data
  ) {
    return { loading: true }
  }

  const { proposal } = loadingProposal.data
  const depositOrVotingEndDate =
    (proposal.status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD
      ? proposal.depositEndTime
      : proposal.votingEndTime) || new Date(0)
  const dateDisplay: ProposalTimestampInfo['display'] | undefined =
    proposal.status === ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD ||
    proposal.status === ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD
      ? {
          label: t('title.timeLeft'),
          tooltip: formatDateTimeTz(depositOrVotingEndDate),
          content: (
            <TimeAgo
              date={depositOrVotingEndDate}
              formatter={timeAgoFormatter}
            />
          ),
        }
      : proposal.status === ProposalStatus.PROPOSAL_STATUS_PASSED ||
        proposal.status === ProposalStatus.PROPOSAL_STATUS_REJECTED
      ? {
          label:
            proposal.status === ProposalStatus.PROPOSAL_STATUS_PASSED
              ? t('proposalStatusTitle.passed')
              : t('proposalStatusTitle.rejected'),
          tooltip: formatDateTimeTz(proposal.votingEndTime || new Date(0)),
          content: formatDate(proposal.votingEndTime || new Date(0)),
        }
      : undefined

  const timestampInfo: ProposalTimestampInfo = {
    display: dateDisplay,
    expirationDate: depositOrVotingEndDate,
  }

  const yesVotes = Number(loadingProposalTally.data.yes)
  const noVotes = Number(loadingProposalTally.data.no)
  const abstainVotes = Number(loadingProposalTally.data.abstain)
  const noWithVetoVotes = Number(loadingProposalTally.data.noWithVeto)
  const totalVotingPower = Number(loadingChainStakingPool.data.bondedTokens)
  const turnoutTotal = yesVotes + noVotes + abstainVotes + noWithVetoVotes
  const turnoutPercent = turnoutTotal
    ? (turnoutTotal / totalVotingPower) * 100
    : 0
  const turnoutNoWithVetoPercent = turnoutTotal
    ? (noWithVetoVotes / turnoutTotal) * 100
    : 0

  const votesInfo: GovProposalVotesInfo = {
    threshold: {
      type: ProcessedTQType.Percent,
      value: loadingGovParams.data.threshold * 100,
      display: formatPercentOf100(loadingGovParams.data.threshold * 100),
    },
    quorum: {
      type: ProcessedTQType.Percent,
      value: loadingGovParams.data.quorum * 100,
      display: formatPercentOf100(loadingGovParams.data.quorum * 100),
    },
    vetoThreshold: {
      type: ProcessedTQType.Percent,
      value: loadingGovParams.data.vetoThreshold * 100,
      display: formatPercentOf100(loadingGovParams.data.vetoThreshold * 100),
    },
    yesVotes,
    noVotes,
    abstainVotes,
    noWithVetoVotes,
    totalVotingPower,
    turnoutTotal,
    turnoutPercent,
    turnoutYesPercent: turnoutTotal ? (yesVotes / turnoutTotal) * 100 : 0,
    turnoutNoPercent: turnoutTotal ? (noVotes / turnoutTotal) * 100 : 0,
    turnoutAbstainPercent: turnoutTotal
      ? (abstainVotes / turnoutTotal) * 100
      : 0,
    turnoutNoWithVetoPercent,
    totalYesPercent: totalVotingPower ? (yesVotes / totalVotingPower) * 100 : 0,
    totalNoPercent: totalVotingPower ? (noVotes / totalVotingPower) * 100 : 0,
    totalAbstainPercent: totalVotingPower
      ? (abstainVotes / totalVotingPower) * 100
      : 0,
    totalNoWithVetoPercent: totalVotingPower
      ? (noWithVetoVotes / totalVotingPower) * 100
      : 0,
    thresholdReached:
      yesVotes > 0 &&
      yesVotes >=
        (turnoutTotal - abstainVotes) * loadingGovParams.data.threshold,
    quorumReached: turnoutPercent >= loadingGovParams.data.quorum * 100,
    vetoReached:
      turnoutNoWithVetoPercent >= loadingGovParams.data.vetoThreshold * 100,
  }

  const walletVoteInfo: LoadingData<GovProposalWalletVoteInfo> =
    loadingWalletVote.loading || !loadingWalletVote.data
      ? {
          loading: true,
        }
      : {
          loading: false,
          data: {
            vote:
              // If no votes, return undefined to indicate has not voted.
              loadingWalletVote.data.length === 0
                ? undefined
                : loadingWalletVote.data.sort(
                    (a, b) => Number(b.weight) - Number(a.weight)
                  ),
          },
        }

  return {
    loading: false,
    updating: loadingProposal.updating,
    data: {
      ...loadingProposal.data,
      timestampInfo,
      votesInfo,
      walletVoteInfo,
      minDeposit: loadingGovParams.data.minDeposit,
    },
  }
}
