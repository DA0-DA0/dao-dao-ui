import {
  Loader,
  ProposalVoterLoading,
  ProposalVoter as StatelessProposalVoter,
} from '@dao-dao/stateless'
import {
  BaseProposalVoterProps,
  ProposalStatus,
  ProposalStatusEnum,
  ProposalVoteOption,
} from '@dao-dao/types'
import { MultipleChoiceVote } from '@dao-dao/types/contracts/DaoProposalMultiple'

import { SuspenseLoader } from '../../../../components'
import {
  useCastVote,
  useLoadingProposalStatus,
  useLoadingVoteOptions,
  useLoadingWalletVoteInfo,
} from '../hooks'

export const ProposalVoter = (props: BaseProposalVoterProps) => {
  const loadingProposalStatus = useLoadingProposalStatus()
  const loadingVoteOptions = useLoadingVoteOptions()

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        loadingProposalStatus.loading || loadingVoteOptions.loading
      }
    >
      {!loadingProposalStatus.loading && !loadingVoteOptions.loading && (
        <InnerProposalVoter
          {...props}
          status={loadingProposalStatus.data}
          voteOptions={loadingVoteOptions.data}
        />
      )}
    </SuspenseLoader>
  )
}

const InnerProposalVoter = ({
  status,
  voteOptions,
  onVoteSuccess,
  ...props
}: BaseProposalVoterProps & {
  status: ProposalStatus
  voteOptions: ProposalVoteOption<MultipleChoiceVote>[]
}) => {
  const loadingWalletVoteInfo = useLoadingWalletVoteInfo()
  const { castVote, castingVote } = useCastVote(onVoteSuccess)

  if (!loadingWalletVoteInfo) {
    return null
  }

  if (loadingWalletVoteInfo.loading) {
    return (
      <ProposalVoterLoading
        {...props}
        options={voteOptions}
        proposalOpen={status === ProposalStatusEnum.Open}
      />
    )
  }

  // Should not be shown if wallet cannot vote.
  if (!loadingWalletVoteInfo.data.canVote) {
    return null
  }

  return (
    <StatelessProposalVoter
      {...props}
      currentVote={loadingWalletVoteInfo.data.vote}
      loading={castingVote}
      onCastVote={castVote}
      options={voteOptions}
      proposalOpen={status === ProposalStatusEnum.Open}
    />
  )
}
