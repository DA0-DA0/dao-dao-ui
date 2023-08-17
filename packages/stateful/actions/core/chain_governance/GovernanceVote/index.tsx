import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue, useRecoilValueLoadable } from 'recoil'

import {
  ProposalStatus,
  VoteOption,
} from '@dao-dao/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { MsgVote } from '@dao-dao/protobuf/codegen/cosmos/gov/v1beta1/tx'
import {
  govProposalSelector,
  govProposalVoteSelector,
  govProposalsSelector,
} from '@dao-dao/state'
import { BallotDepositEmoji, Loader } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  cwVoteOptionToGovVoteOption,
  govVoteOptionToCwVoteOption,
  isDecodedStargateMsg,
  loadableToLoadingData,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { GovProposalActionDisplay } from '../../../../components'
import { SuspenseLoader } from '../../../../components/SuspenseLoader'
import { TokenAmountDisplay } from '../../../../components/TokenAmountDisplay'
import { GovActionsProvider, useActionOptions } from '../../../react'
import {
  GovernanceVoteData,
  GovernanceVoteComponent as StatelessGovernanceVoteComponent,
} from './Component'

const useDefaults: UseDefaults<GovernanceVoteData> = () => ({
  proposalId: '',
  vote: VoteOption.VOTE_OPTION_ABSTAIN,
})

const Component: ActionComponent<undefined, GovernanceVoteData> = (props) => (
  <SuspenseLoader fallback={<Loader />}>
    <GovActionsProvider>
      <InnerComponent {...props} />
    </GovActionsProvider>
  </SuspenseLoader>
)

const InnerComponent: ActionComponent<undefined, GovernanceVoteData> = (
  props
) => {
  const { isCreating, fieldNamePrefix } = props
  const {
    address,
    chain: { chain_id: chainId },
  } = useActionOptions()
  const { watch, setValue, setError, clearErrors } =
    useFormContext<GovernanceVoteData>()

  const proposalId = watch(
    (props.fieldNamePrefix + 'proposalId') as 'proposalId'
  )

  const openProposals = useRecoilValue(
    isCreating
      ? govProposalsSelector({
          status: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
          chainId,
        })
      : constSelector(undefined)
  )

  // Prevent action from being submitted if there are no open proposals.
  useEffect(() => {
    if (openProposals && openProposals.proposals.length === 0) {
      setError((fieldNamePrefix + 'proposalId') as 'proposalId', {
        type: 'manual',
      })
    } else {
      clearErrors((fieldNamePrefix + 'proposalId') as 'proposalId')
    }
  }, [openProposals, setError, clearErrors, fieldNamePrefix])

  // If viewing an action where we already selected and voted on a proposal,
  // load just the one we voted on and add it to the list so we can display it.
  const selectedProposal = useRecoilValue(
    !isCreating && proposalId
      ? govProposalSelector({
          proposalId: Number(proposalId),
          chainId,
        })
      : constSelector(undefined)
  )

  const existingVotesLoading = loadableToLoadingData(
    useRecoilValueLoadable(
      proposalId
        ? govProposalVoteSelector({
            proposalId: Number(proposalId),
            voter: address,
            chainId,
          })
        : constSelector(undefined)
    ),
    undefined
  )

  // Select first proposal once loaded if nothing selected.
  useEffect(() => {
    if (isCreating && openProposals?.proposals.length && !proposalId) {
      setValue(
        (fieldNamePrefix + 'proposalId') as 'proposalId',
        openProposals.proposals[0].id.toString()
      )
    }
  }, [isCreating, openProposals, proposalId, setValue, fieldNamePrefix])

  return (
    <StatelessGovernanceVoteComponent
      {...props}
      options={{
        proposals: [
          ...(openProposals?.proposals ?? []),
          ...(selectedProposal ? [selectedProposal] : []),
        ],
        existingVotesLoading,
        TokenAmountDisplay,
        GovProposalActionDisplay,
      }}
    />
  )
}

export const makeGovernanceVoteAction: ActionMaker<GovernanceVoteData> = ({
  t,
}) => {
  const useTransformToCosmos: UseTransformToCosmos<GovernanceVoteData> = () =>
    useCallback(
      ({ proposalId, vote }) => ({
        gov: {
          vote: {
            proposal_id: Number(proposalId || '-1'),
            vote: govVoteOptionToCwVoteOption(vote),
          },
        },
      }),
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<GovernanceVoteData> = (
    msg: Record<string, any>
  ) =>
    isDecodedStargateMsg(msg) &&
    objectMatchesStructure(msg.stargate.value, {
      proposalId: {},
      voter: {},
      option: {},
    }) &&
    // Make sure this is a vote message.
    msg.stargate.typeUrl === MsgVote.typeUrl
      ? {
          match: true,
          data: {
            proposalId: msg.stargate.value.proposalId.toString(),
            vote: msg.stargate.value.option,
          },
        }
      : objectMatchesStructure(msg, {
          gov: {
            vote: {
              proposal_id: {},
              vote: {},
            },
          },
        })
      ? {
          match: true,
          data: {
            proposalId: msg.gov.vote.proposal_id.toString(),
            vote: cwVoteOptionToGovVoteOption(msg.gov.vote.vote),
          },
        }
      : {
          match: false,
        }

  return {
    key: ActionKey.GovernanceVote,
    Icon: BallotDepositEmoji,
    label: t('title.voteOnGovernanceProposal'),
    description: t('info.voteOnGovernanceProposalDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
