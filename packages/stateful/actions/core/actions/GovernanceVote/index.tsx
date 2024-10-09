import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { chainQueries } from '@dao-dao/state'
import {
  ActionBase,
  BallotDepositEmoji,
  ChainProvider,
  DaoSupportedChainPickerInput,
  Loader,
  useActionOptions,
} from '@dao-dao/stateless'
import {
  UnifiedCosmosMsg,
  cwVoteOptionToGovVoteOption,
  govVoteOptionToCwVoteOption,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  ProposalStatus,
  VoteOption,
} from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { MsgVote } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/tx'
import {
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  GovProposalActionDisplay,
  SuspenseLoader,
} from '../../../../components'
import { TokenAmountDisplay } from '../../../../components/TokenAmountDisplay'
import { useQueryLoadingDataWithError } from '../../../../hooks'
import { GovActionsProvider } from '../../../providers/gov'
import {
  GovernanceVoteData,
  GovernanceVoteComponent as StatelessGovernanceVoteComponent,
} from './Component'

const Component: ActionComponent<undefined, GovernanceVoteData> = (props) => {
  const { isCreating, fieldNamePrefix } = props
  const options = useActionOptions()
  const { watch, setValue, setError, clearErrors } =
    useFormContext<GovernanceVoteData>()
  const queryClient = useQueryClient()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const proposalId = watch(
    (props.fieldNamePrefix + 'proposalId') as 'proposalId'
  )

  const openProposals = useQueryLoadingDataWithError(
    isCreating
      ? chainQueries.govProposals(queryClient, {
          status: ProposalStatus.PROPOSAL_STATUS_VOTING_PERIOD,
          chainId,
        })
      : undefined
  )

  // Prevent action from being submitted if there are no open proposals.
  useEffect(() => {
    if (
      openProposals.loading ||
      openProposals.errored ||
      openProposals.data.proposals.length === 0
    ) {
      setError((fieldNamePrefix + 'proposalId') as 'proposalId', {
        type: 'manual',
      })
    } else {
      clearErrors((fieldNamePrefix + 'proposalId') as 'proposalId')
    }
  }, [openProposals, setError, clearErrors, fieldNamePrefix])

  // If viewing an action where we already selected and voted on a proposal,
  // load just the one we voted on and add it to the list so we can display it.
  const selectedProposal = useQueryLoadingDataWithError(
    !isCreating && proposalId
      ? chainQueries.govProposal(queryClient, {
          proposalId: Number(proposalId),
          chainId,
        })
      : undefined
  )

  const address = getChainAddressForActionOptions(options, chainId)
  const existingVotesLoading = useQueryLoadingDataWithError(
    proposalId && address
      ? chainQueries.govProposalVote(queryClient, {
          proposalId: Number(proposalId),
          voter: address,
          chainId,
        })
      : undefined
  )

  // Select first proposal once loaded if nothing selected.
  useEffect(() => {
    if (
      isCreating &&
      !openProposals.loading &&
      !openProposals.errored &&
      openProposals.data.proposals.length &&
      !proposalId
    ) {
      setValue(
        (fieldNamePrefix + 'proposalId') as 'proposalId',
        openProposals.data.proposals[0].id.toString()
      )
    }
  }, [isCreating, openProposals, proposalId, setValue, fieldNamePrefix])

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
            forceFallback={openProposals.loading || openProposals.errored}
          >
            <StatelessGovernanceVoteComponent
              {...props}
              options={{
                proposals: [
                  ...(!openProposals.loading && !openProposals.errored
                    ? openProposals.data.proposals
                    : []),
                  ...(!selectedProposal.loading && !selectedProposal.errored
                    ? [selectedProposal.data]
                    : []),
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

export class GovernanceVoteAction extends ActionBase<GovernanceVoteData> {
  public readonly key = ActionKey.GovernanceVote
  public readonly Component = Component

  constructor(options: ActionOptions) {
    // Governance module cannot participate in governance.
    if (options.context.type === ActionContextType.Gov) {
      throw new Error(
        'Governance deposits are not supported by the chain governance context.'
      )
    }

    super(options, {
      Icon: BallotDepositEmoji,
      label: options.t('title.voteOnGovernanceProposal'),
      description: options.t('info.voteOnGovernanceProposalDescription'),
    })

    this.defaults = {
      chainId: options.chain.chainId,
      proposalId: '',
      vote: VoteOption.VOTE_OPTION_ABSTAIN,
    }
  }

  encode({
    chainId,
    proposalId,
    vote,
  }: GovernanceVoteData): UnifiedCosmosMsg[] {
    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      {
        gov: {
          vote: {
            proposal_id: Number(proposalId || '-1'),
            vote: govVoteOptionToCwVoteOption(vote),
          },
        },
      }
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return (
      // Stargate protobuf-encoded message.
      isDecodedStargateMsg(decodedMessage, MsgVote, {
        proposalId: {},
        voter: {},
        option: {},
      }) ||
      // CosmWasm message.
      objectMatchesStructure(decodedMessage, {
        gov: {
          vote: {
            proposal_id: {},
            vote: {},
          },
        },
      })
    )
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): GovernanceVoteData {
    return isDecodedStargateMsg(decodedMessage, MsgVote)
      ? {
          chainId,
          proposalId: decodedMessage.stargate.value.proposalId.toString(),
          vote: decodedMessage.stargate.value.option,
        }
      : {
          chainId,
          proposalId: decodedMessage.gov.vote.proposal_id.toString(),
          vote: cwVoteOptionToGovVoteOption(decodedMessage.gov.vote.vote),
        }
  }
}
