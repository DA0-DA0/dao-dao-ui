import {
  Loader,
  ProposalVoter as StatelessProposalVoter,
} from '@dao-dao/stateless'
import {
  BaseProposalVoterProps,
  ProposalStatus,
  ProposalStatusEnum,
  ProposalVoteOption,
  WalletVoteInfo,
} from '@dao-dao/types'
import { Vote } from '@dao-dao/types/contracts/DaoProposalSingle.common'

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
  const loadingWalletVoteInfo = useLoadingWalletVoteInfo()

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        loadingProposalStatus.loading ||
        loadingVoteOptions.loading ||
        loadingWalletVoteInfo?.loading
      }
    >
      {!loadingProposalStatus.loading &&
        !loadingVoteOptions.loading &&
        loadingWalletVoteInfo &&
        !loadingWalletVoteInfo.loading && (
          <InnerProposalVoter
            {...props}
            status={loadingProposalStatus.data}
            voteOptions={loadingVoteOptions.data}
            walletVoteInfo={loadingWalletVoteInfo.data}
          />
        )}
    </SuspenseLoader>
  )
}

const InnerProposalVoter = ({
  status,
  voteOptions,
  walletVoteInfo,
  onVoteSuccess,
  ...props
}: BaseProposalVoterProps & {
  status: ProposalStatus
  voteOptions: ProposalVoteOption<Vote>[]
  walletVoteInfo: WalletVoteInfo<Vote>
}) => {
  const { castVote, castingVote } = useCastVote(onVoteSuccess)

  // Should never be shown if canVote is false.
  if (!walletVoteInfo.canVote) {
    throw new Error('internal error: cannot vote')
  }

  return (
    <StatelessProposalVoter
      {...props}
      currentVote={walletVoteInfo.vote}
      loading={castingVote}
      onCastVote={castVote}
      options={voteOptions}
      proposalOpen={status === ProposalStatusEnum.Open}
    />
  )
}
