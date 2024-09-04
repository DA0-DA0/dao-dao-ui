import { Coin } from '@cosmjs/stargate'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { waitForAll } from 'recoil'

import { chainQueries, genericTokenSelector } from '@dao-dao/state'
import {
  ActionBase,
  BankEmoji,
  ChainProvider,
  DaoSupportedChainPickerInput,
  useActionOptions,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import {
  TokenType,
  UnifiedCosmosMsg,
  makeStargateMessage,
} from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { ProposalStatus } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { MsgDeposit } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/tx'
import {
  getChainAddressForActionOptions,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessages,
} from '@dao-dao/utils'

import { GovProposalActionDisplay } from '../../../../components'
import { TokenAmountDisplay } from '../../../../components/TokenAmountDisplay'
import { useQueryLoadingDataWithError } from '../../../../hooks'
import { GovActionsProvider } from '../../../providers/gov'
import {
  GovernanceDepositData,
  GovernanceDepositComponent as StatelessGovernanceDepositComponent,
} from './Component'

const Component: ActionComponent<undefined, GovernanceDepositData> = (
  props
) => {
  const { context } = useActionOptions()
  const { watch, setValue } = useFormContext<GovernanceDepositData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')

  return (
    <>
      {context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onChange={() => {
            // Clear fields on chain change.
            setValue((props.fieldNamePrefix + 'proposalId') as 'proposalId', '')
            setValue((props.fieldNamePrefix + 'deposit') as 'deposit', [])
          }}
          onlyDaoChainIds
        />
      )}

      <ChainProvider key={chainId} chainId={chainId}>
        <GovActionsProvider>
          <InnerComponent {...props} />
        </GovActionsProvider>
      </ChainProvider>
    </>
  )
}

const InnerComponent: ActionComponent<undefined, GovernanceDepositData> = (
  props
) => {
  const { isCreating, fieldNamePrefix } = props
  const { chain_id: chainId } = useChain()
  const { watch, setValue, setError, clearErrors } =
    useFormContext<GovernanceDepositData>()
  const queryClient = useQueryClient()
  const { context } = useActionOptions()

  // Type-check. This component is wrapped in a gov actions provider.
  if (context.type !== ActionContextType.Gov) {
    throw new Error('Invalid context for governance deposit action.')
  }

  const proposalId = watch(
    (props.fieldNamePrefix + 'proposalId') as 'proposalId'
  )

  const proposalOptions = useQueryLoadingDataWithError(
    isCreating
      ? chainQueries.govProposals(queryClient, {
          status: ProposalStatus.PROPOSAL_STATUS_DEPOSIT_PERIOD,
          chainId,
        })
      : undefined
  )

  // Prevent action from being submitted if there are no deposit proposals.
  useEffect(() => {
    if (
      proposalOptions.loading ||
      proposalOptions.errored ||
      proposalOptions.data.proposals.length === 0
    ) {
      setError((fieldNamePrefix + 'proposalId') as 'proposalId', {
        type: 'manual',
      })
    } else {
      clearErrors((fieldNamePrefix + 'proposalId') as 'proposalId')
    }
  }, [proposalOptions, setError, clearErrors, fieldNamePrefix])

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

  // On proposal change, update deposit to remaining needed.
  useEffect(() => {
    const proposalSelected =
      proposalId &&
      !proposalOptions.loading &&
      !proposalOptions.errored &&
      proposalOptions.data.proposals.find((p) => p.id.toString() === proposalId)
    if (!proposalSelected) {
      return
    }

    const minDeposit = context.params.minDeposit[0]
    const missingDeposit =
      BigInt(minDeposit.amount) -
      BigInt(
        proposalSelected.proposal.totalDeposit.find(
          ({ denom }) => minDeposit.denom === denom
        )?.amount ?? 0
      )

    if (missingDeposit > 0) {
      setValue((fieldNamePrefix + 'deposit') as 'deposit', [
        {
          denom: minDeposit.denom,
          amount: Number(missingDeposit),
        },
      ])
    }
  }, [proposalId, proposalOptions, context.params, setValue, fieldNamePrefix])

  // Select first proposal once loaded if nothing selected.
  useEffect(() => {
    if (
      isCreating &&
      !proposalOptions.loading &&
      !proposalOptions.errored &&
      proposalOptions.data.proposals.length &&
      !proposalId
    ) {
      setValue(
        (fieldNamePrefix + 'proposalId') as 'proposalId',
        proposalOptions.data.proposals[0].id.toString()
      )
    }
  }, [isCreating, proposalOptions, proposalId, setValue, fieldNamePrefix])

  const depositTokens = useCachedLoading(
    waitForAll(
      context.params.minDeposit.map(({ denom }) =>
        genericTokenSelector({
          type: TokenType.Native,
          denomOrAddress: denom,
          chainId,
        })
      )
    ),
    []
  )

  return (
    <StatelessGovernanceDepositComponent
      {...props}
      options={{
        depositTokens,
        proposals: [
          ...(!proposalOptions.loading && !proposalOptions.errored
            ? proposalOptions.data.proposals
            : []),
          ...(!selectedProposal.loading && !selectedProposal.errored
            ? [selectedProposal.data]
            : []),
        ],
        TokenAmountDisplay,
        GovProposalActionDisplay,
      }}
    />
  )
}

export class GovernanceDepositAction extends ActionBase<GovernanceDepositData> {
  public readonly key = ActionKey.GovernanceDeposit
  public readonly Component = Component

  constructor(options: ActionOptions) {
    // Governance module cannot participate in governance.
    if (options.context.type === ActionContextType.Gov) {
      throw new Error(
        'Governance deposits are not supported by the chain governance context.'
      )
    }

    super(options, {
      Icon: BankEmoji,
      label: options.t('title.depositToGovernanceProposal'),
      description: options.t('info.depositToGovernanceProposalDescription'),
    })

    this.defaults = {
      chainId: options.chain.chain_id,
      proposalId: '',
      deposit: [],
    }
  }

  encode({
    chainId,
    proposalId,
    deposit,
  }: GovernanceDepositData): UnifiedCosmosMsg[] {
    const depositor = getChainAddressForActionOptions(this.options, chainId)
    if (!depositor) {
      throw new Error('Depositor address not found for chain.')
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chain_id,
      chainId,
      makeStargateMessage({
        stargate: {
          typeUrl: MsgDeposit.typeUrl,
          value: {
            proposalId: BigInt(proposalId || '0'),
            depositor,
            amount: deposit.map(({ denom, amount }) => ({
              denom,
              amount: BigInt(amount).toString(),
            })),
          } as MsgDeposit,
        },
      })
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return isDecodedStargateMsg(decodedMessage, MsgDeposit, {
      proposalId: {},
      depositor: {},
      amount: {},
    })
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): GovernanceDepositData {
    return {
      chainId,
      proposalId: decodedMessage.stargate.value.proposalId.toString(),
      deposit: (decodedMessage.stargate.value.amount as Coin[]).map(
        ({ denom, amount }) => ({
          denom,
          amount: Number(amount),
        })
      ),
    }
  }
}
