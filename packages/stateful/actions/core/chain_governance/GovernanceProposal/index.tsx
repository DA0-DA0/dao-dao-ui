import { Coin } from '@cosmjs/stargate'
import { MsgSubmitProposal } from 'cosmjs-types/cosmos/gov/v1beta1/tx'
import { ParameterChangeProposal } from 'cosmjs-types/cosmos/params/v1beta1/params'
import { SoftwareUpgradeProposal } from 'cosmjs-types/cosmos/upgrade/v1beta1/upgrade'
import { CommunityPoolSpendProposal } from 'interchain-rpc/types/codegen/cosmos/distribution/v1beta1/distribution'
import { TextProposal } from 'interchain-rpc/types/codegen/cosmos/gov/v1beta1/gov'
import Long from 'long'
import { useCallback } from 'react'
import { waitForAll } from 'recoil'

import { genericTokenSelector, govQueryParamsSelector } from '@dao-dao/state'
import { RaisedHandEmoji, useCachedLoading } from '@dao-dao/stateless'
import { GovernanceProposalType, TokenType } from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  ActionMaker,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  decodeGovProposalContent,
  encodeRawProtobufMsg,
  isDecodedStargateMsg,
  makeStargateMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components/AddressInput'
import { PayEntityDisplay } from '../../../../components/PayEntityDisplay'
import { TokenAmountDisplay } from '../../../../components/TokenAmountDisplay'
import { useActionOptions } from '../../../react'
import {
  GovernanceProposalData,
  GovernanceProposalComponent as StatelessGovernanceProposalComponent,
} from './Component'

const SUBMIT_PROPOSAL_TYPE_URL = '/cosmos.gov.v1beta1.MsgSubmitProposal'

const Component: ActionComponent<undefined, GovernanceProposalData> = (
  props
) => {
  const { chainId } = useActionOptions()

  const govParams = useCachedLoading(
    govQueryParamsSelector({
      chainId,
    }),
    undefined
  )
  const minDeposits = useCachedLoading(
    govParams.loading || !govParams.data
      ? undefined
      : waitForAll(
          govParams.data.depositParams.minDeposit.map(({ denom }) =>
            genericTokenSelector({
              type: TokenType.Native,
              denomOrAddress: denom,
            })
          )
        ),
    []
  )

  return (
    <StatelessGovernanceProposalComponent
      {...props}
      options={{
        minDeposits:
          minDeposits.loading || govParams.loading || !govParams.data
            ? { loading: true }
            : {
                loading: false,
                data: minDeposits.data.map((token, index) => ({
                  token,
                  balance:
                    govParams.data!.depositParams.minDeposit[index].amount,
                })),
              },
        PayEntityDisplay,
        TokenAmountDisplay,
        AddressInput,
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

export const makeGovernanceProposalAction: ActionMaker<
  GovernanceProposalData
> = ({ t, address, chainId }) => {
  const useDefaults: UseDefaults<GovernanceProposalData> = () => {
    const govParams = useCachedLoading(
      govQueryParamsSelector({
        chainId,
      }),
      undefined
    )
    const minDeposits = useCachedLoading(
      govParams.loading || !govParams.data
        ? undefined
        : waitForAll(
            govParams.data.depositParams.minDeposit.map(({ denom }) =>
              genericTokenSelector({
                type: TokenType.Native,
                denomOrAddress: denom,
              })
            )
          ),
      []
    )

    const deposit =
      minDeposits.loading || govParams.loading || !govParams.data
        ? undefined
        : govParams.data.depositParams.minDeposit[0]

    return {
      type: GovernanceProposalType.TextProposal,
      title: '',
      description: '',
      deposit: deposit
        ? [
            {
              denom: deposit.denom,
              amount: Number(deposit.amount),
            },
          ]
        : [],
      spends: deposit
        ? [
            {
              denom: deposit.denom,
              amount: 1000,
            },
          ]
        : [],
      spendRecipient: address,
      parameterChanges: defaultParameterChanges,
      upgradePlan: defaultPlan,
    }
  }

  const useTransformToCosmos: UseTransformToCosmos<
    GovernanceProposalData
  > = () =>
    useCallback(
      ({
        type,
        title,
        description,
        deposit,
        spends,
        spendRecipient,
        parameterChanges,
        upgradePlan,
      }) => {
        const plan = JSON.parse(upgradePlan)
        const content = encodeRawProtobufMsg({
          typeUrl: type,
          value:
            type === GovernanceProposalType.CommunityPoolSpendProposal
              ? ({
                  title,
                  description,
                  amount: spends.map(({ amount, denom }) => ({
                    denom,
                    amount: BigInt(amount).toString(),
                  })),
                  recipient: spendRecipient,
                } as CommunityPoolSpendProposal)
              : type === GovernanceProposalType.ParameterChangeProposal
              ? ({
                  title,
                  description,
                  changes: JSON.parse(parameterChanges),
                } as ParameterChangeProposal)
              : type === GovernanceProposalType.SoftwareUpgradeProposal
              ? ({
                  title,
                  description,
                  plan: {
                    ...plan,
                    height: !isNaN(Number(plan.height))
                      ? Long.fromValue(plan.height)
                      : -1,
                  },
                } as SoftwareUpgradeProposal)
              : // Default to text proposal.
                ({
                  title,
                  description,
                } as TextProposal),
        })

        return makeStargateMessage({
          stargate: {
            typeUrl: SUBMIT_PROPOSAL_TYPE_URL,
            value: {
              content,
              initialDeposit: deposit.map(({ amount, denom }) => ({
                amount: BigInt(amount).toString(),
                denom,
              })),
              proposer: address,
            } as MsgSubmitProposal,
          },
        })
      },
      []
    )

  const useDecodedCosmosMsg: UseDecodedCosmosMsg<GovernanceProposalData> = (
    msg: Record<string, any>
  ) => {
    if (
      !isDecodedStargateMsg(msg) ||
      msg.stargate.typeUrl !== SUBMIT_PROPOSAL_TYPE_URL ||
      !objectMatchesStructure(msg.stargate.value, {
        content: {},
        initialDeposit: {},
        proposer: {},
      }) ||
      msg.stargate.value.proposer !== address
    ) {
      return {
        match: false,
      }
    }

    const decodedContent = decodeGovProposalContent(msg.stargate.value.content)
    const type = decodedContent.typeUrl as GovernanceProposalType
    if (!Object.values(GovernanceProposalType).includes(type)) {
      return {
        match: false,
      }
    }

    return {
      match: true,
      data: {
        type,
        title: decodedContent.value.title,
        description: decodedContent.value.description,
        deposit: msg.stargate.value.initialDeposit,
        spends:
          decodedContent.typeUrl ===
          GovernanceProposalType.CommunityPoolSpendProposal
            ? (decodedContent.value.amount as Coin[]).map(
                ({ amount, denom }) => ({
                  amount: Number(amount),
                  denom,
                })
              )
            : [],
        spendRecipient:
          decodedContent.typeUrl ===
          GovernanceProposalType.CommunityPoolSpendProposal
            ? decodedContent.value.recipient
            : address,
        parameterChanges:
          decodedContent.typeUrl ===
          GovernanceProposalType.ParameterChangeProposal
            ? JSON.stringify(decodedContent.value.changes, null, 2)
            : defaultParameterChanges,
        upgradePlan:
          decodedContent.typeUrl ===
          GovernanceProposalType.SoftwareUpgradeProposal
            ? JSON.stringify(decodedContent.value.plan, null, 2)
            : defaultPlan,
      },
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
