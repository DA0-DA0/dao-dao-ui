import { Coin } from '@cosmjs/stargate'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useRecoilValue, waitForAll } from 'recoil'

import {
  chainSupportsV1GovModuleSelector,
  communityPoolBalancesSelector,
  genericTokenBalanceSelector,
  genericTokenSelector,
  govParamsSelector,
} from '@dao-dao/state'
import {
  ChainProvider,
  DaoSupportedChainPickerInput,
  RaisedHandEmoji,
  useCachedLoading,
  useCachedLoadingWithError,
} from '@dao-dao/stateless'
import {
  AccountType,
  ActionComponent,
  ActionComponentProps,
  ActionContextType,
  ActionKey,
  ActionMaker,
  ChainId,
  GOVERNANCE_PROPOSAL_TYPES,
  GovProposalVersion,
  GovernanceProposalActionData,
  TokenType,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
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
  decodePolytoneExecuteMsg,
  getChainAddressForActionOptions,
  getNativeTokenForChainId,
  isDecodedStargateMsg,
  maybeMakePolytoneExecuteMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { GovProposalActionDisplay } from '../../../../components'
import { AddressInput } from '../../../../components/AddressInput'
import { SuspenseLoader } from '../../../../components/SuspenseLoader'
import { TokenAmountDisplay } from '../../../../components/TokenAmountDisplay'
import {
  GovActionsProvider,
  useActionOptions,
  useLoadedActionsAndCategories,
} from '../../../react'
import { GovernanceProposalComponent as StatelessGovernanceProposalComponent } from './Component'

const Component: ActionComponent<undefined, GovernanceProposalActionData> = (
  props
) => {
  const { watch } = useFormContext<GovernanceProposalActionData>()
  const chainId = watch((props.fieldNamePrefix + 'chainId') as 'chainId')
  const options = useActionOptions()

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
            }}
          />
        </GovActionsProvider>
      </ChainProvider>
    </>
  )
}

const InnerComponent = ({
  options: { address },
  ...props
}: ActionComponentProps<
  { address: string | undefined },
  GovernanceProposalActionData
>) => {
  const { watch, setValue } = useFormContext<GovernanceProposalActionData>()
  const expedited = watch((props.fieldNamePrefix + 'expedited') as 'expedited')

  // `GovActionsProvier` wraps this, which sets these values.
  const {
    address: govModuleAddress,
    chain: { chain_id: chainId },
    context,
  } = useActionOptions()

  // Type-check.
  if (context.type !== ActionContextType.Gov) {
    throw new Error('Invalid action context.')
  }

  const supportsV1GovProposals = useRecoilValue(
    chainSupportsV1GovModuleSelector({
      chainId,
    })
  )

  const communityPoolBalances = useCachedLoading(
    communityPoolBalancesSelector({
      chainId,
    }),
    []
  )

  // Update version in data.
  useEffect(() => {
    setValue(
      (props.fieldNamePrefix + 'version') as 'version',
      supportsV1GovProposals
        ? GovProposalVersion.V1
        : GovProposalVersion.V1_BETA_1
    )
  }, [supportsV1GovProposals, setValue, props.fieldNamePrefix])

  // Update gov module address in data.
  useEffect(() => {
    setValue(
      (props.fieldNamePrefix + 'govModuleAddress') as 'govModuleAddress',
      govModuleAddress
    )
  }, [govModuleAddress, setValue, props.fieldNamePrefix])

  const minDepositParams =
    expedited && context.params.expeditedMinDeposit?.length
      ? context.params.expeditedMinDeposit
      : context.params.minDeposit

  // On chain or min deposit change, reset deposit.
  useEffect(() => {
    setValue((props.fieldNamePrefix + 'deposit') as 'deposit', [
      {
        denom: minDepositParams[0].denom,
        amount: Number(minDepositParams[0].amount),
      },
    ])
  }, [chainId, setValue, props.fieldNamePrefix, minDepositParams])

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

  const { categories, loadedActions } = useLoadedActionsAndCategories({
    isCreating: props.isCreating,
  })

  return (
    <StatelessGovernanceProposalComponent
      {...props}
      options={{
        supportsV1GovProposals,
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
        categories,
        loadedActions,
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

export const makeGovernanceProposalAction: ActionMaker<
  GovernanceProposalActionData
> = (options) => {
  const {
    t,
    address,
    chain: { chain_id: currentChainId },
    context,
  } = options

  const defaultChainId =
    // Neutron does not use the x/gov module. If this is a DAO on Neutron, see
    // if it has polytone accounts on any other chain. If it does, default to
    // one of them. Otherwise, hide the action since it cannot be used.
    currentChainId === ChainId.NeutronMainnet ||
    currentChainId === ChainId.NeutronTestnet
      ? context.type === ActionContextType.Dao
        ? context.info.accounts.find((a) => a.type === AccountType.Polytone)
            ?.chainId
        : undefined
      : // If not on Neutron, default to current chain.
        currentChainId

  if (
    // Governance module cannot participate in governance.
    context.type === ActionContextType.Gov ||
    !defaultChainId
  ) {
    return null
  }

  const useDefaults: UseDefaults<GovernanceProposalActionData> = () => {
    const loadingData = useCachedLoadingWithError(
      waitForAll([
        govParamsSelector({
          chainId: defaultChainId,
        }),
        chainSupportsV1GovModuleSelector({
          chainId: defaultChainId,
        }),
      ])
    )

    if (loadingData.loading) {
      return
    }
    if (loadingData.errored) {
      return loadingData.error
    }

    const [{ minDeposit }, supportsV1GovProposals] = loadingData.data
    const deposit = minDeposit[0]

    return {
      chainId: defaultChainId,
      version: supportsV1GovProposals
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
              denom: getNativeTokenForChainId(defaultChainId).denomOrAddress,
              amount: 0,
            },
          ],
      legacy: {
        typeUrl: TextProposal.typeUrl,
        spends: [],
        spendRecipient: address,
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

  const useTransformToCosmos: UseTransformToCosmos<
    GovernanceProposalActionData
  > =
    () =>
    ({
      chainId,
      govModuleAddress,
      version,
      title,
      description,
      metadata,
      deposit,
      legacyContent,
      msgs,
      expedited,
      useV1LegacyContent,
    }) => {
      if (!govModuleAddress) {
        throw new Error(
          `Could not find gov module address for chain ID ${chainId}.`
        )
      }

      let msg
      if (version === GovProposalVersion.V1_BETA_1) {
        msg = makeStargateMessage({
          stargate: {
            typeUrl: MsgSubmitProposalV1Beta1.typeUrl,
            value: {
              content: legacyContent,
              initialDeposit: deposit.map(({ amount, denom }) => ({
                amount: BigInt(amount).toString(),
                denom,
              })),
              proposer: getChainAddressForActionOptions(options, chainId),
            } as MsgSubmitProposalV1Beta1,
          },
        })
      } else {
        msg = makeStargateMessage({
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
              proposer: getChainAddressForActionOptions(options, chainId),
              title,
              summary: description,
              // In case it's undefined, default to false.
              expedited: expedited || false,
              // Metadata must be set, so just use the title as a fallback.
              metadata: metadata.trim() || title,
            } as MsgSubmitProposalV1,
          },
        })
      }

      return maybeMakePolytoneExecuteMessage(currentChainId, chainId, msg)
    }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<
    GovernanceProposalActionData
  > = (msg: Record<string, any>) => {
    let chainId = currentChainId
    const decodedPolytone = decodePolytoneExecuteMsg(chainId, msg)
    if (decodedPolytone.match) {
      chainId = decodedPolytone.chainId
      msg = decodedPolytone.msg
    }

    const defaults = useDefaults()
    if (!defaults || defaults instanceof Error) {
      return {
        match: false,
      }
    }

    if (
      !isDecodedStargateMsg(msg) ||
      !objectMatchesStructure(msg.stargate.value, {
        proposer: {},
      })
    ) {
      return {
        match: false,
      }
    }

    if (
      msg.stargate.typeUrl === MsgSubmitProposalV1Beta1.typeUrl &&
      msg.stargate.value.content
    ) {
      const proposal = msg.stargate.value as MsgSubmitProposalV1Beta1
      const type = proposal.content?.typeUrl
      if (
        !proposal.content ||
        !type ||
        !GOVERNANCE_PROPOSAL_TYPES.some(({ typeUrl }) => typeUrl === type)
      ) {
        return {
          match: false,
        }
      }

      // Try to stringify all proposal content for custom field, but ignore
      // failures in case something can't be serialized.
      let customContent = '{}'
      try {
        customContent = JSON.stringify(proposal.content, null, 2)
      } catch {}

      return {
        match: true,
        data: {
          ...defaults,
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
            typeUrl: type,
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
                : address,
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
        },
      }
    }

    if (msg.stargate.typeUrl === MsgSubmitProposalV1.typeUrl) {
      const proposal = msg.stargate.value as MsgSubmitProposalV1
      const decodedMessages = decodeGovProposalV1Messages(
        chainId,
        proposal.messages
      )

      return {
        match: true,
        data: {
          ...defaults,
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
        },
      }
    }

    return {
      match: false,
    }
  }

  return {
    key: ActionKey.GovernanceProposal,
    Icon: RaisedHandEmoji,
    label: t('title.submitGovernanceProposal'),
    description: t('info.submitGovernanceProposalDescription'),
    Component,
    useDefaults,
    useTransformToCosmos,
    useDecodedCosmosMsg,
  }
}
