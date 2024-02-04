import { EncodeObject } from '@cosmjs/proto-signing'
import { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import {
  chainSupportsV1GovModuleSelector,
  refreshGovProposalsAtom,
} from '@dao-dao/state/recoil'
import {
  Loader,
  ProposalVoter as StatelessProposalVoter,
  useCachedLoading,
  useChain,
  useGovProposalVoteOptions,
} from '@dao-dao/stateless'
import { GovProposalWithMetadata, ProposalVoterProps } from '@dao-dao/types'
import { MsgVote as MsgVoteV1 } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1/tx'
import {
  ProposalStatus,
  VoteOption,
} from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { MsgVote as MsgVoteV1Beta1 } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/tx'
import { CHAIN_GAS_MULTIPLIER, processError } from '@dao-dao/utils'

import { useLoadingGovProposal, useWallet } from '../../hooks'
import { SuspenseLoader } from '../SuspenseLoader'

export type GovProposalVoterProps = {
  proposalId: string
  onVoteSuccess?: () => void
} & Pick<ProposalVoterProps, 'className'>

export const GovProposalVoter = (props: GovProposalVoterProps) => {
  const { chain_id: chainId } = useChain()

  const loadingProposal = useLoadingGovProposal(props.proposalId)
  const supportsV1 = useCachedLoading(
    chainSupportsV1GovModuleSelector({ chainId }),
    false
  )

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={
        loadingProposal.loading ||
        loadingProposal.data.walletVoteInfo.loading ||
        supportsV1.loading
      }
    >
      {!loadingProposal.loading &&
        !loadingProposal.data.walletVoteInfo.loading &&
        !supportsV1.loading && (
          <InnerGovProposalVoter
            {...props}
            proposal={loadingProposal.data}
            supportsV1={supportsV1.data}
          />
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
  supportsV1,
  ...props
}: GovProposalVoterProps & {
  proposal: GovProposalWithMetadata
  // Whether or not this chain supports the v1 gov module.
  supportsV1: boolean
}) => {
  const { t } = useTranslation()
  const { chain_id: chainId } = useChain()
  const {
    isWalletConnected,
    address: walletAddress = '',
    getSigningStargateClient,
  } = useWallet()

  const setRefreshProposal = useSetRecoilState(refreshGovProposalsAtom(chainId))
  const refreshProposal = useCallback(
    () => setRefreshProposal((id) => id + 1),
    [setRefreshProposal]
  )

  const onVoteSuccessRef = useRef(onVoteSuccess)
  onVoteSuccessRef.current = onVoteSuccess

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
          typeUrl: supportsV1 ? MsgVoteV1.typeUrl : MsgVoteV1Beta1.typeUrl,
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
      proposalId,
      refreshProposal,
      supportsV1,
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
        walletVoteInfo.loading
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
