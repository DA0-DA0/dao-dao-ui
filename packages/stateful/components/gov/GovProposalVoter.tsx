import { EncodeObject } from '@cosmjs/proto-signing'
import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import {
  Loader,
  ProposalVoter as StatelessProposalVoter,
  useGovProposalVoteOptions,
  useUpdatingRef,
} from '@dao-dao/stateless'
import { GovProposalWithMetadata, ProposalVoterProps } from '@dao-dao/types'
import {
  ProposalStatus,
  VoteOption,
} from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { MsgVote } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/tx'
import { CHAIN_GAS_MULTIPLIER, processError } from '@dao-dao/utils'

import {
  useLoadingGovProposal,
  useRefreshGovProposals,
  useWallet,
} from '../../hooks'
import { SuspenseLoader } from '../SuspenseLoader'

export type GovProposalVoterProps = {
  proposalId: string
  onVoteSuccess?: () => void
} & Pick<ProposalVoterProps, 'className'>

export const GovProposalVoter = (props: GovProposalVoterProps) => {
  const loadingProposal = useLoadingGovProposal(props.proposalId)

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        loadingProposal.loading || loadingProposal.data.walletVoteInfo.loading
      }
    >
      {!loadingProposal.loading &&
        !loadingProposal.data.walletVoteInfo.loading && (
          <InnerGovProposalVoter {...props} proposal={loadingProposal.data} />
        )}
    </SuspenseLoader>
  )
}

const InnerGovProposalVoter = ({
  proposalId,
  proposal: {
    proposal: { status },
    walletVoteInfo,
  },
  onVoteSuccess,
  ...props
}: GovProposalVoterProps & {
  proposal: GovProposalWithMetadata
}) => {
  const { t } = useTranslation()
  const {
    isWalletConnected,
    address: walletAddress = '',
    getSigningStargateClient,
  } = useWallet()

  const refreshProposal = useRefreshGovProposals()

  const onVoteSuccessRef = useUpdatingRef(onVoteSuccess)

  const [castingVote, setCastingVote] = useState(false)
  const castVote = useCallback(
    async (option: VoteOption) => {
      if (!isWalletConnected) {
        toast.error(t('error.logInToContinue'))
        return
      }

      setCastingVote(true)
      try {
        const client = await getSigningStargateClient()

        const encodeObject: EncodeObject = {
          typeUrl: MsgVote.typeUrl,
          value: {
            proposalId,
            voter: walletAddress,
            option,
          },
        }

        await client.signAndBroadcast(
          walletAddress,
          [encodeObject],
          CHAIN_GAS_MULTIPLIER
        )

        toast.success(t('success.voteCast'))

        onVoteSuccessRef.current?.()
      } catch (err) {
        console.error(err)
        toast.error(processError(err))
      } finally {
        refreshProposal()
        setCastingVote(false)
      }
    },
    [
      getSigningStargateClient,
      isWalletConnected,
      onVoteSuccessRef,
      proposalId,
      refreshProposal,
      t,
      walletAddress,
    ]
  )

  const voteOptions = useGovProposalVoteOptions()

  // Should never be shown if not in voting period.
  if (status !== ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD) {
    throw new Error('internal error: not in voting period')
  }

  return (
    <StatelessProposalVoter
      {...props}
      currentVote={
        walletVoteInfo.loading || walletVoteInfo.errored
          ? undefined
          : walletVoteInfo.data.vote?.[0].option
      }
      loading={castingVote}
      onCastVote={castVote}
      options={voteOptions}
      proposalOpen
    />
  )
}
