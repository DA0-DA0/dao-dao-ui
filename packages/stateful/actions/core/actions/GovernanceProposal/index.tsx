import { Coin } from '@cosmjs/stargate'
import { MutableRefObject, useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { waitForAll } from 'recoil'

import {
  chainQueries,
  communityPoolBalancesSelector,
  genericTokenBalanceSelector,
  genericTokenSelector,
} from '@dao-dao/state'
import {
  ActionBase,
  ChainProvider,
  DaoSupportedChainPickerInput,
  RaisedHandEmoji,
  useActionOptions,
  useCachedLoading,
} from '@dao-dao/stateless'
import {
  AccountType,
  ActionComponent,
  ActionComponentProps,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ChainId,
  GOVERNANCE_PROPOSAL_TYPES,
  GovProposalVersion,
  GovernanceProposalActionData,
  ProcessedMessage,
  TokenType,
  UnifiedCosmosMsg,
  cwMsgToProtobuf,
  makeStargateMessage,
} from '@dao-dao/types'
import { CommunityPoolSpendProposal } from '@dao-dao/types/protobuf/codegen/cosmos/distribution/v1beta1/distribution'
import {
  MsgExecLegacyContent,
  MsgSubmitProposal as MsgSubmitProposalV1,
} from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1/tx'
import { TextProposal } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { MsgSubmitProposal as MsgSubmitProposalV1Beta1 } from '@dao-dao/types/protobuf/codegen/cosmos/gov/v1beta1/tx'
import { ParameterChangeProposal } from '@dao-dao/types/protobuf/codegen/cosmos/params/v1beta1/params'
import { SoftwareUpgradeProposal } from '@dao-dao/types/protobuf/codegen/cosmos/upgrade/v1beta1/upgrade'
import { Any } from '@dao-dao/types/protobuf/codegen/google/protobuf/any'
import {
  decodeGovProposalV1Messages,
  getChainAddressForActionOptions,
  getNativeTokenForChainId,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessages,
} from '@dao-dao/utils'

import { GovProposalActionDisplay } from '../../../../components'
import { AddressInput } from '../../../../components/AddressInput'
import { SuspenseLoader } from '../../../../components/SuspenseLoader'
import { TokenAmountDisplay } from '../../../../components/TokenAmountDisplay'
import { useActionEncodeContext } from '../../../context'
import { GovActionsProvider } from '../../../providers/gov'
import { GovernanceProposalComponent as StatelessGovernanceProposalComponent } from './Component'

const Component: ActionComponent<undefined, GovernanceProposalActionData> = (
  props
) => {
  const { watch } = useFormContext<GovernanceProposalActionData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const options = useActionOptions()

  // Store whether or not deposit has initially been set. We don't want to reset
  // it if loaded from state; only if chain changes.
  const firstDepositSet = useRef(false)

  return (
    <>
      {options.context.type === ActionContextType.Dao && (
        <DaoSupportedChainPickerInput
          disabled={!props.isCreating}
          fieldName={props.fieldNamePrefix + 'chainId'}
          onlyDaoChainIds
        />
      )}

      <ChainProvider chainId={chainId}>
        <GovActionsProvider
          key={
            // Re-render when chain changes.
            chainId
          }
        >
          <InnerComponent
            {...props}
            options={{
              address: getChainAddressForActionOptions(options, chainId),
              firstDepositSet,
            }}
          />
        </GovActionsProvider>
      </ChainProvider>
    </>
  )
}

const InnerComponent = ({
  options: { address, firstDepositSet },
  ...props
}: ActionComponentProps<
  {
    address: string | undefined
    firstDepositSet: MutableRefObject<boolean>
  },
  GovernanceProposalActionData
>) => {
  const { watch, setValue } = useFormContext<GovernanceProposalActionData>()
  const expedited = watch((props.fieldNamePrefix + 'expedited') as 'expedited')

  const {
    chain: { chain_id: chainId },
    context,
  } = useActionOptions()
  const encodeContext = useActionEncodeContext()

  // Type-check.
  if (context.type !== ActionContextType.Gov) {
    throw new Error('Invalid action context.')
  }

  const communityPoolBalances = useCachedLoading(
    communityPoolBalancesSelector({
      chainId,
    }),
    []
  )

  const minDepositParams =
    expedited && context.params.expeditedMinDeposit?.length
      ? context.params.expeditedMinDeposit
      : context.params.minDeposit

  // On chain or min deposit change, reset deposit, except first load.
  useEffect(() => {
    if (!firstDepositSet.current) {
      firstDepositSet.current = true
      return
    }

    setValue((props.fieldNamePrefix + 'deposit') as 'deposit', [
      {
        denom: minDepositParams[0].denom,
        amount: Number(minDepositParams[0].amount),
      },
    ])
  }, [
    chainId,
    setValue,
    props.fieldNamePrefix,
    minDepositParams,
    firstDepositSet,
  ])

  // Update version in data.
  useEffect(() => {
    setValue(
      (props.fieldNamePrefix + 'version') as 'version',
      context.params.supportsV1
        ? GovProposalVersion.V1
        : GovProposalVersion.V1_BETA_1
    )
  }, [setValue, props.fieldNamePrefix, context.params.supportsV1])

  // Get token info for all deposit tokens.
  const minDepositTokens = useCachedLoading(
    waitForAll(
      minDepositParams.map(({ denom }) =>
        genericTokenSelector({
          type: TokenType.Native,
          denomOrAddress: denom,
          chainId,
        })
      )
    ),
    []
  )

  // Get address balances for all deposit tokens when wallet connected.
  const minDepositBalances = useCachedLoading(
    address
      ? waitForAll(
          minDepositParams.map(({ denom }) =>
            genericTokenBalanceSelector({
              address,
              type: TokenType.Native,
              denomOrAddress: denom,
              chainId,
            })
          )
        )
      : undefined,
    []
  )

  return (
    <StatelessGovernanceProposalComponent
      {...props}
      options={{
        minDeposits: minDepositTokens.loading
          ? { loading: true }
          : {
              loading: false,
              data: minDepositTokens.data.map((token, index) => ({
                token,
                // Wallet's balance or 0 if not loaded.
                balance:
                  (!minDepositBalances.loading &&
                    minDepositBalances.data[index]?.balance) ||
                  '0',
                // Min deposit required.
                min: minDepositParams[index].amount,
              })),
            },
        communityPoolBalances,
        encodeContext,
        TokenAmountDisplay,
        AddressInput,
        SuspenseLoader,
        GovProposalActionDisplay,
      }}
    />
  )
}

const defaultParameterChanges = JSON.stringify(
  [
    {
      subspace: 'INSERT',
      key: 'INSERT',
      value: 'INSERT',
    },
  ],
  null,
  2
)
const defaultPlan = JSON.stringify(
  {
    name: 'INSERT',
    height: 'INSERT',
    info: 'INSERT',
    upgradedClientState: 'INSERT',
  },
  null,
  2
)

const defaultCustom = JSON.stringify(
  {
    type: 'cosmos-sdk/...',
    value: {
      title: '[AUTOMATICALLY INSERTED]',
      description: '[AUTOMATICALLY INSERTED]',
      key1: 'value1',
      key2: 'value2',
    },
  },
  null,
  2
)

export class GovernanceProposalAction extends ActionBase<GovernanceProposalActionData> {
  public readonly key = ActionKey.GovernanceProposal
  public readonly Component = Component

  private defaultChainId: string

  constructor(options: ActionOptions) {
    if (
      // Governance module cannot participate in governance.
      options.context.type === ActionContextType.Gov
    ) {
      throw new Error('Cannot use in chain governance action context.')
    }

    super(options, {
      Icon: RaisedHandEmoji,
      label: options.t('title.submitGovernanceProposal'),
      description: options.t('info.submitGovernanceProposalDescription'),
    })

    const defaultChainId =
      // Neutron does not use the x/gov module. If this is a DAO on Neutron, see
      // if it has polytone accounts on any other chain. If it does, default to
      // one of them. Otherwise, hide the action since it cannot be used.
      options.chain.chain_id === ChainId.NeutronMainnet ||
      options.chain.chain_id === ChainId.NeutronTestnet
        ? options.context.type === ActionContextType.Dao
          ? options.context.dao.accounts.find(
              (a) => a.type === AccountType.Polytone
            )?.chainId
          : undefined
        : // If not on Neutron, default to current chain.
          options.chain.chain_id

    if (!defaultChainId) {
      throw new Error('Could not find chain to vote on.')
    }

    this.defaultChainId = defaultChainId
  }

  async setup() {
    const { minDeposit, supportsV1 } =
      await this.options.queryClient.fetchQuery(
        chainQueries.govParams(this.options.queryClient, {
          chainId: this.defaultChainId,
        })
      )

    const deposit = minDeposit[0]

    this.defaults = {
      chainId: this.defaultChainId,
      version: supportsV1
        ? GovProposalVersion.V1
        : GovProposalVersion.V1_BETA_1,
      title: '',
      description: '',
      metadata: '',
      deposit: deposit
        ? [
            {
              denom: deposit.denom,
              amount: Number(deposit.amount),
            },
          ]
        : [
            {
              denom: getNativeTokenForChainId(this.defaultChainId)
                .denomOrAddress,
              amount: 0,
            },
          ],
      legacy: {
        typeUrl: TextProposal.typeUrl,
        spends: [],
        spendRecipient: this.options.address,
        parameterChanges: defaultParameterChanges,
        upgradePlan: defaultPlan,
        custom: defaultCustom,
      },
      legacyContent: Any.fromPartial({}) as any,
      msgs: [],
      expedited: false,
      useV1LegacyContent: false,
    }
  }

  async encode({
    chainId,
    title,
    description,
    metadata,
    deposit,
    legacyContent,
    msgs,
    expedited,
    useV1LegacyContent,
  }: GovernanceProposalActionData): Promise<UnifiedCosmosMsg[]> {
    const [govModuleAddress, supportsV1] = await Promise.all([
      this.options.queryClient.fetchQuery(
        chainQueries.moduleAddress({
          chainId,
          name: 'gov',
        })
      ),
      this.options.queryClient.fetchQuery(
        chainQueries.supportsV1GovModule(this.options.queryClient, {
          chainId,
        })
      ),
    ])

    const proposer = getChainAddressForActionOptions(this.options, chainId)
    if (!proposer) {
      throw new Error('Could not find proposer address.')
    }

    const msg = supportsV1
      ? makeStargateMessage({
          stargate: {
            typeUrl: MsgSubmitProposalV1.typeUrl,
            value: {
              messages: useV1LegacyContent
                ? [
                    MsgExecLegacyContent.toProtoMsg({
                      authority: govModuleAddress,
                      content: legacyContent,
                    }),
                  ]
                : msgs.map((msg) =>
                    cwMsgToProtobuf(chainId, msg, govModuleAddress)
                  ),
              initialDeposit: deposit.map(({ amount, denom }) => ({
                amount: BigInt(amount).toString(),
                denom,
              })),
              proposer,
              title,
              summary: description,
              // In case it's undefined, default to false.
              expedited: expedited || false,
              // Metadata must be set, so just use the title as a fallback.
              metadata: metadata.trim() || title,
            } as MsgSubmitProposalV1,
          },
        })
      : makeStargateMessage({
          stargate: {
            typeUrl: MsgSubmitProposalV1Beta1.typeUrl,
            value: {
              content: legacyContent,
              initialDeposit: deposit.map(({ amount, denom }) => ({
                amount: BigInt(amount).toString(),
                denom,
              })),
              proposer,
            } as MsgSubmitProposalV1Beta1,
          },
        })

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chain_id,
      chainId,
      msg
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    if (
      !isDecodedStargateMsg(
        decodedMessage,
        [MsgSubmitProposalV1, MsgSubmitProposalV1Beta1],
        {
          proposer: {},
        }
      )
    ) {
      return false
    }

    // Additional checks for v1beta1 message.
    if (decodedMessage.stargate.typeUrl === MsgSubmitProposalV1Beta1.typeUrl) {
      const proposal = decodedMessage.stargate.value as MsgSubmitProposalV1Beta1
      const typeUrl = proposal.content?.typeUrl

      if (
        !proposal.content ||
        !typeUrl ||
        !GOVERNANCE_PROPOSAL_TYPES.some((t) => t.typeUrl === typeUrl)
      ) {
        return false
      }
    }

    return true
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): Partial<GovernanceProposalActionData> {
    if (decodedMessage.stargate.typeUrl === MsgSubmitProposalV1Beta1.typeUrl) {
      const proposal = decodedMessage.stargate.value as MsgSubmitProposalV1Beta1
      const typeUrl = proposal.content?.typeUrl
      // Type-check. Already checked in match.
      if (!proposal.content || !typeUrl) {
        throw new Error('Invalid proposal content.')
      }

      // Try to stringify all proposal content for custom field, but ignore
      // failures in case something can't be serialized.
      let customContent = '{}'
      try {
        customContent = JSON.stringify(proposal.content, null, 2)
      } catch {}

      return {
        chainId,
        version: GovProposalVersion.V1_BETA_1,
        title: proposal.content.title,
        description: proposal.content.description,
        metadata: '',
        deposit: proposal.initialDeposit.map(({ amount, ...coin }) => ({
          ...coin,
          amount: Number(amount),
        })),
        legacy: {
          typeUrl,
          spends:
            proposal.content.typeUrl === CommunityPoolSpendProposal.typeUrl
              ? (proposal.content.amount as Coin[]).map(
                  ({ amount, denom }) => ({
                    amount: Number(amount),
                    denom,
                  })
                )
              : [],
          spendRecipient:
            proposal.content.typeUrl === CommunityPoolSpendProposal.typeUrl
              ? proposal.content.recipient
              : this.options.address,
          parameterChanges:
            proposal.content.typeUrl === ParameterChangeProposal.typeUrl
              ? JSON.stringify(proposal.content.changes, null, 2)
              : defaultParameterChanges,
          upgradePlan:
            proposal.content.typeUrl === SoftwareUpgradeProposal.typeUrl
              ? JSON.stringify(proposal.content.plan, null, 2)
              : defaultPlan,
          custom: customContent,
        },
        legacyContent: proposal.content,
      }
    } else if (
      decodedMessage.stargate.typeUrl === MsgSubmitProposalV1.typeUrl
    ) {
      const proposal = decodedMessage.stargate.value as MsgSubmitProposalV1
      const decodedMessages = decodeGovProposalV1Messages(
        chainId,
        proposal.messages
      )

      return {
        chainId,
        version: GovProposalVersion.V1,
        title: proposal.title,
        description: proposal.summary,
        metadata: proposal.metadata,
        deposit: proposal.initialDeposit.map(({ amount, ...coin }) => ({
          ...coin,
          amount: Number(amount),
        })),
        msgs: decodedMessages,
        expedited: proposal.expedited || false,
      }
    }

    // Should never happen since match checks the type.
    throw new Error('Invalid proposal message type.')
  }
}
