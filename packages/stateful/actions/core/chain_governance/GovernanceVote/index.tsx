import { VoteOption } from 'cosmjs-types/cosmos/gov/v1beta1/gov'
import { MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx'
import Long from 'long'
import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue, useRecoilValueLoadable } from 'recoil'

import {
  govProposalSelector,
  govProposalVoteSelector,
  govProposalsSelector,
} from '@dao-dao/state'
import { BallotDepositEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  isDecodedStargateMsg,
  loadableToLoadingData,
  makeStargateMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { useActionOptions } from '../../../react'
import {
  GovernanceVoteData,
  GovernanceVoteComponent as StatelessGovernanceVoteComponent,
} from './Component'

const useDefaults: UseDefaults<GovernanceVoteData> = () => ({
  proposalId: '',
  vote: VoteOption.VOTE_OPTION_ABSTAIN,
})

const Component: ActionComponent<undefined, GovernanceVoteData> = (props) => {
  const { isCreating, fieldNamePrefix } = props
  const { address, chainId } = useActionOptions()
  const { watch, setValue, setError, clearErrors } =
    useFormContext<GovernanceVoteData>()

  const proposalId = watch(
    (props.fieldNamePrefix + 'proposalId') as 'proposalId'
  )

  const openProposals = useRecoilValue(
    isCreating
      ? govProposalsSelector({
          chainId,
        })
      : constSelector(undefined)
  )

  // Prevent action from being submitted if there are no open proposals.
  useEffect(() => {
    if (openProposals && openProposals.length === 0) {
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
    if (isCreating && openProposals?.length && !proposalId) {
      setValue(
        (fieldNamePrefix + 'proposalId') as 'proposalId',
        openProposals[0].proposalId.toString()
      )
    }
  }, [isCreating, openProposals, proposalId, setValue, fieldNamePrefix])

  return (
    <StatelessGovernanceVoteComponent
      {...props}
      options={{
        proposals: [
          ...(openProposals ?? []),
          ...(selectedProposal ? [selectedProposal] : []),
        ],
        existingVotesLoading,
      }}
    />
  )
}

export const makeGovernanceVoteAction: ActionMaker<GovernanceVoteData> = ({
  t,
  address,
}) => {
  const useTransformToCosmos: UseTransformToCosmos<GovernanceVoteData> = () =>
    useCallback(
      ({ proposalId, vote }) =>
        makeStargateMessage({
          stargate: {
            typeUrl: '/cosmos.gov.v1beta1.MsgVote',
            value: {
              proposalId: Long.fromString(proposalId || '-1'),
              voter: address,
              option: vote,
            } as MsgVote,
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
    msg.stargate.typeUrl === '/cosmos.gov.v1beta1.MsgVote'
      ? {
          match: true,
          data: {
            proposalId: msg.stargate.value.proposalId.toString(),
            vote: msg.stargate.value.option,
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
