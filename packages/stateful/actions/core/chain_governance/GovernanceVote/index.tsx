import { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { constSelector, useRecoilValue, useRecoilValueLoadable } from 'recoil'

import {
  govProposalSelector,
  govProposalVoteSelector,
  govProposalsSelector,
} from '@dao-dao/state'
import {
  BallotDepositEmoji,
  ChainProvider,
  DaoSupportedChainPickerInput,
  Loader,
} from '@dao-dao/stateless'
import {
  ChainId,
  cwVoteOptionToGovVoteOption,
  govVoteOptionToCwVoteOption,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  ProposalStatus,
  VoteOption,
} from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { MsgVote } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/tx'
import {
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  loadableToLoadingData,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  GovProposalActionDisplay,
  SuspenseLoader,
} from '../../../../components'
import { TokenAmountDisplay } from '../../../../components/TokenAmountDisplay'
import { GovActionsProvider, useActionOptions } from '../../../react'
import {
  GovernanceVoteData,
  GovernanceVoteComponent as StatelessGovernanceVoteComponent,
} from './Component'

const Component: ActionComponent<undefined, GovernanceVoteData> = (props) => {
  const { isCreating, fieldNamePrefix } = props
  const options = useActionOptions()
  const { watch, setValue, setError, clearErrors } =
    useFormContext<GovernanceVoteData>()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const proposalId = watch(
    (props.fieldNamePrefix + 'proposalId') as 'proposalId'
  )

  const openProposalsLoadable = useRecoilValueLoadable(
    isCreating
      ? govProposalsSelector({
          status: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
          chainId,
        })
      : constSelector(undefined)
  )

  // Prevent action from being submitted if there are no open proposals.
  useEffect(() => {
    if (
      openProposalsLoadable.state === 'hasValue' &&
      openProposalsLoadable.contents?.proposals.length === 0
    ) {
      setError((fieldNamePrefix + 'proposalId') as 'proposalId', {
        type: 'manual',
      })
    } else {
      clearErrors((fieldNamePrefix + 'proposalId') as 'proposalId')
    }
  }, [openProposalsLoadable, setError, clearErrors, fieldNamePrefix])

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

  const address = getChainAddressForActionOptions(options, chainId)
  const existingVotesLoading = loadableToLoadingData(
    useRecoilValueLoadable(
      proposalId && address
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
    if (
      isCreating &&
      openProposalsLoadable.state === 'hasValue' &&
      openProposalsLoadable.contents?.proposals.length &&
      !proposalId
    ) {
      setValue(
        (fieldNamePrefix + 'proposalId') as 'proposalId',
        openProposalsLoadable.contents.proposals[0].id.toString()
      )
    }
  }, [isCreating, openProposalsLoadable, proposalId, setValue, fieldNamePrefix])

  return (
    <>
      {options.context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!isCreating}
          fieldName={fieldNamePrefix + 'chainId'}
          onChange={() =>
            // Clear proposal on chain change.
            setValue((fieldNamePrefix + 'proposalId') as 'proposalId', '')
          }
          onlyDaoChainIds
        />
      )}

      <ChainProvider chainId={chainId}>
        <GovActionsProvider>
          <SuspenseLoader
            fallback={<Loader />}
            forceFallback={openProposalsLoadable.state !== 'hasValue'}
          >
            <StatelessGovernanceVoteComponent
              {...props}
              options={{
                proposals: [
                  ...((openProposalsLoadable.state === 'hasValue' &&
                    openProposalsLoadable.contents?.proposals) ||
                    []),
                  ...(selectedProposal ? [selectedProposal] : []),
                ],
                existingVotesLoading,
                TokenAmountDisplay,
                GovProposalActionDisplay,
              }}
            />
          </SuspenseLoader>
        </GovActionsProvider>
      </ChainProvider>
    </>
  )
}

export const makeGovernanceVoteAction: ActionMaker<GovernanceVoteData> = ({
  t,
  chain: { chain_id: currentChainId },
  context,
}) => {
  if (
    // Governance module cannot participate in governance.
    context.type === ActionContextType.Gov ||
    // Neutron does not use the x/gov module.
    currentChainId === ChainId.NeutronMainnet ||
    currentChainId === ChainId.NeutronTestnet
  ) {
    return null
  }

  const useDefaults: UseDefaults<GovernanceVoteData> = () => ({
    chainId: currentChainId,
    proposalId: '',
    vote: VoteOption.VOTE_OPTION_ABSTAIN,
  })

  const useTransformToCosmos: UseTransformToCosmos<GovernanceVoteData> = () =>
    useCallback(
      ({ chainId, proposalId, vote }) =>
        maybeMakePolytoneExecuteMessage(currentChainId, chainId, {
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
  ) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    return isDecodedStargateMsg(msg) &&
      objectMatchesStructure(msg.stargate.value, {
        proposalId: {},
        voter: {},
        option: {},
      }) &&
      // If vote Stargate message.
      msg.stargate.typeUrl === MsgVote.typeUrl
      ? {
          match: true,
          data: {
            chainId,
            proposalId: msg.stargate.value.proposalId.toString(),
            vote: msg.stargate.value.option,
          },
        }
      : // If vote gov CosmWasm message.
      objectMatchesStructure(msg, {
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
            chainId,
            proposalId: msg.gov.vote.proposal_id.toString(),
            vote: cwVoteOptionToGovVoteOption(msg.gov.vote.vote),
          },
        }
      : {
          match: false,
        }
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
