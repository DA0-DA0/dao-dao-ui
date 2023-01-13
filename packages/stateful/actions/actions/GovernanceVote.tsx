import { MsgVote } from 'cosmjs-types/cosmos/gov/v1beta1/tx'
import Long from 'long'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue, useRecoilValueLoadable } from 'recoil'

import {
  govProposalSelector,
  govProposalVoteSelector,
  govProposalsSelector,
  validatorSelector,
} from '@dao-dao/state'
import { BallotDepositEmoji } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionMaker,
  CoreActionKey,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  loadableToLoadingData,
  makeStargateMessage,
  objectMatchesStructure,
  toValidatorAddress,
} from '@dao-dao/utils'

import {
  GovernanceVoteData,
  GovernanceVoteComponent as StatelessGovernanceVoteComponent,
} from '../components/GovernanceVote'
import { useActionOptions } from '../react'

const useDefaults: UseDefaults<GovernanceVoteData> = () => ({
  voteAsValidator: true,
  proposalId: '',
})

const Component: ActionComponent<undefined, GovernanceVoteData> = (props) => {
  const { address, chainId, bech32Prefix } = useActionOptions()

  const validatorAddress = toValidatorAddress(address, bech32Prefix)
  // Check if this address manages a validator to decide if we show the vote as
  // validator toggle switch. This should error if the validator does not exist.
  const validator = useRecoilValueLoadable(
    validatorSelector({
      address: validatorAddress,
      chainId,
    })
  )
  // Can vote if validator exists.
  const canVoteAsValidator = validator.state === 'hasValue'

  const openProposals = useRecoilValue(
    props.isCreating
      ? govProposalsSelector({
          chainId,
        })
      : constSelector(undefined)
  )
  // If viewing an action where we already selected and voted on a proposal,
  // load just the one we voted on and add it to the list so we can display it.
  const selectedProposal = useRecoilValue(
    !props.isCreating && props.data.proposalId
      ? govProposalSelector({
          proposalId: Number(props.data.proposalId),
          chainId,
        })
      : constSelector(undefined)
  )

  const { watch } = useFormContext<GovernanceVoteData>()
  const proposalId = watch(
    (props.fieldNamePrefix + 'proposalId') as 'proposalId'
  )
  const voteAsValidator = watch(
    (props.fieldNamePrefix + 'voteAsValidator') as 'voteAsValidator'
  )

  const existingVotesLoading = loadableToLoadingData(
    useRecoilValueLoadable(
      proposalId
        ? govProposalVoteSelector({
            proposalId: Number(proposalId),
            voter:
              canVoteAsValidator && voteAsValidator
                ? validatorAddress
                : address,
            chainId,
          })
        : constSelector(undefined)
    ),
    undefined
  )

  return (
    <StatelessGovernanceVoteComponent
      {...props}
      options={{
        proposals: [
          ...(openProposals ?? []),
          ...(selectedProposal ? [selectedProposal] : []),
        ],
        canVoteAsValidator,
        existingVotesLoading,
      }}
    />
  )
}

export const makeGovernanceVoteAction: ActionMaker<GovernanceVoteData> = ({
  t,
  address,
  chainId,
  bech32Prefix,
}) => {
  const validatorAddress = toValidatorAddress(address, bech32Prefix)

  const useTransformToCosmos: UseTransformToCosmos<GovernanceVoteData> = () => {
    const validator = useRecoilValueLoadable(
      validatorSelector({
        address: validatorAddress,
        chainId,
      })
    )
    // Can vote if validator exists.
    const canVoteAsValidator = validator.state === 'hasValue'

    return useCallback(
      ({ proposalId, vote, voteAsValidator }) =>
        makeStargateMessage({
          stargate: {
            typeUrl: '/cosmos.gov.v1beta1.MsgVote',
            value: {
              proposalId: Long.fromString(proposalId),
              voter:
                canVoteAsValidator && voteAsValidator
                  ? validatorAddress
                  : address,
              option: vote,
            } as MsgVote,
          },
        }),
      [canVoteAsValidator]
    )
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<GovernanceVoteData> = (
    msg: Record<string, any>
  ) =>
    objectMatchesStructure(msg, {
      stargate: {
        type_url: {},
        value: {
          proposalId: {},
          voter: {},
          option: {},
        },
      },
    }) &&
    // Make sure this is a vote message.
    msg.stargate.type_url === '/cosmos.gov.v1beta1.MsgVote'
      ? {
          match: true,
          data: {
            proposalId: msg.stargate.value.proposalId.toString(),
            vote: msg.stargate.value.option,
            voteAsValidator: msg.stargate.value.voter === validatorAddress,
          },
        }
      : {
          match: false,
        }

  return {
    key: CoreActionKey.GovernanceVote,
    Icon: BallotDepositEmoji,
    label: t('title.voteOnGovernanceProposal'),
    description: t('info.voteOnGovernanceProposalDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
