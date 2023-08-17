import { Coin } from '@cosmjs/stargate'
import { useCallback } from 'react'
import { useRecoilValue, waitForAll } from 'recoil'

import { CommunityPoolSpendProposal } from '@dao-dao/protobuf/codegen/cosmos/distribution/v1beta1/distribution'
import { MsgSubmitProposal as MsgSubmitProposalV1 } from '@dao-dao/protobuf/codegen/cosmos/gov/v1/tx'
import { TextProposal } from '@dao-dao/protobuf/codegen/cosmos/gov/v1beta1/gov'
import { MsgSubmitProposal as MsgSubmitProposalV1Beta1 } from '@dao-dao/protobuf/codegen/cosmos/gov/v1beta1/tx'
import { ParameterChangeProposal } from '@dao-dao/protobuf/codegen/cosmos/params/v1beta1/params'
import { SoftwareUpgradeProposal } from '@dao-dao/protobuf/codegen/cosmos/upgrade/v1beta1/upgrade'
import { Any } from '@dao-dao/protobuf/codegen/google/protobuf/any'
import {
  genericTokenSelector,
  govParamsSelector,
  moduleAddressSelector,
} from '@dao-dao/state'
import { Loader, RaisedHandEmoji, useCachedLoading } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  GOVERNANCE_PROPOSAL_TYPES,
  GovProposalVersion,
  GovernanceProposalActionData,
  TokenType,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  convertDenomToMicroDenomWithDecimals,
  cwMsgToProtobuf,
  decodeGovProposalV1Messages,
  getNativeTokenForChainId,
  isDecodedStargateMsg,
  makeStargateMessage,
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
) => (
  <SuspenseLoader fallback={<Loader />}>
    <GovActionsProvider>
      <InnerComponent {...props} />
    </GovActionsProvider>
  </SuspenseLoader>
)

const InnerComponent: ActionComponent<
  undefined,
  GovernanceProposalActionData
> = (props) => {
  const {
    chain: { chain_id: chainId },
    chainContext: {
      config: { supportsV1GovProposals },
    },
  } = useActionOptions()

  const govModuleAddress = useRecoilValue(
    moduleAddressSelector({
      name: 'gov',
      chainId,
    })
  )
  const govParams = useCachedLoading(
    govParamsSelector({
      chainId,
    }),
    undefined
  )

  const minDeposits = useCachedLoading(
    govParams.loading || !govParams.data
      ? undefined
      : waitForAll(
          govParams.data.minDeposit.map(({ denom }) =>
            genericTokenSelector({
              type: TokenType.Native,
              denomOrAddress: denom,
              chainId,
            })
          )
        ),
    []
  )

  const { categories, loadedActions } = useLoadedActionsAndCategories({
    isCreating: props.isCreating,
  })

  return (
    <StatelessGovernanceProposalComponent
      {...props}
      options={{
        govModuleAddress,
        supportsV1GovProposals,
        minDeposits:
          minDeposits.loading || govParams.loading || !govParams.data
            ? { loading: true }
            : {
                loading: false,
                data: minDeposits.data.map((token, index) => ({
                  token,
                  balance: govParams.data!.minDeposit[index].amount,
                })),
              },
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
> = ({
  t,
  address,
  chain: { chain_id: chainId },
  chainContext: {
    config: { supportsV1GovProposals },
  },
}) => {
  const useDefaults: UseDefaults<GovernanceProposalActionData> = () => {
    const govParams = useCachedLoading(
      govParamsSelector({
        chainId,
      }),
      undefined
    )
    const minDepositTokens = useCachedLoading(
      govParams.loading || !govParams.data
        ? undefined
        : waitForAll(
            govParams.data.minDeposit.map(({ denom }) =>
              genericTokenSelector({
                type: TokenType.Native,
                denomOrAddress: denom,
                chainId,
              })
            )
          ),
      []
    )

    const deposit =
      govParams.loading || !govParams.data
        ? undefined
        : govParams.data.minDeposit[0]
    const depositToken = minDepositTokens.loading
      ? undefined
      : minDepositTokens.data[0]

    return {
      version: supportsV1GovProposals
        ? GovProposalVersion.V1
        : GovProposalVersion.V1_BETA_1,
      title: '',
      description: '',
      deposit: deposit
        ? [
            {
              denom: deposit.denom,
              amount: Number(deposit.amount),
            },
          ]
        : [
            {
              denom: getNativeTokenForChainId(chainId).denomOrAddress,
              amount: 0,
            },
          ],
      legacy: {
        typeUrl: TextProposal.typeUrl,
        spends: deposit
          ? [
              {
                denom: deposit.denom,
                amount: convertDenomToMicroDenomWithDecimals(
                  1000,
                  depositToken?.decimals ?? 0
                ),
              },
            ]
          : [],
        spendRecipient: address,
        parameterChanges: defaultParameterChanges,
        upgradePlan: defaultPlan,
        custom: defaultCustom,
      },
      legacyContent: Any.fromPartial({}) as any,
      msgs: [],
      metadataCid: '',
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<
    GovernanceProposalActionData
  > = () => {
    const govModuleAddress = useRecoilValue(
      moduleAddressSelector({
        name: 'gov',
        chainId,
      })
    )

    return useCallback(
      ({
        version,
        title,
        description,
        deposit,
        legacyContent,
        msgs,
        metadataCid,
      }) => {
        if (version === GovProposalVersion.V1_BETA_1) {
          return makeStargateMessage({
            stargate: {
              typeUrl: MsgSubmitProposalV1Beta1.typeUrl,
              value: {
                content: legacyContent,
                initialDeposit: deposit.map(({ amount, denom }) => ({
                  amount: BigInt(amount).toString(),
                  denom,
                })),
                proposer: address,
              } as MsgSubmitProposalV1Beta1,
            },
          })
        } else {
          return makeStargateMessage({
            stargate: {
              typeUrl: MsgSubmitProposalV1.typeUrl,
              value: {
                messages: msgs.map((msg) =>
                  cwMsgToProtobuf(msg, govModuleAddress)
                ),
                initialDeposit: deposit.map(({ amount, denom }) => ({
                  amount: BigInt(amount).toString(),
                  denom,
                })),
                proposer: address,
                metadata: `ipfs://${metadataCid}`,
                title,
                summary: description,
                expedited: false,
              } as MsgSubmitProposalV1,
            },
          })
        }
      },
      [govModuleAddress]
    )
  }

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<
    GovernanceProposalActionData
  > = (msg: Record<string, any>) => {
    const defaults = useDefaults()

    if (
      !isDecodedStargateMsg(msg) ||
      !objectMatchesStructure(msg.stargate.value, {
        proposer: {},
      }) ||
      msg.stargate.value.proposer !== address
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
          version: GovProposalVersion.V1_BETA_1,
          title: proposal.content.title,
          description: proposal.content.description,
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
      const decodedMessages = decodeGovProposalV1Messages(proposal.messages)

      return {
        match: true,
        data: {
          ...defaults,
          version: GovProposalVersion.V1,
          title: proposal.title,
          description: proposal.summary,
          deposit: proposal.initialDeposit.map(({ amount, ...coin }) => ({
            ...coin,
            amount: Number(amount),
          })),
          msgs: decodedMessages,
          metadataCid: proposal.metadata.replace('ipfs://', ''),
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
