import { useCallback } from 'react'

import { MoneyEmoji } from '@dao-dao/stateless'
import { UseDecodedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types/actions'
import {
  isDecodedStargateMsg,
  makeStargateMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'
import { MsgCommunityPoolSpend } from '@dao-dao/utils/protobuf/codegen/cosmos/distribution/v1beta1/tx'

import { PayEntityDisplay } from '../../../../components/PayEntityDisplay'
import {
  CommunityPoolSpendComponent,
  CommunityPoolSpendData,
} from './Component'

const useDefaults: UseDefaults<CommunityPoolSpendData> = () => ({
  authority: '',
  recipient: '',
  funds: [],
})

const Component: ActionComponent<undefined, CommunityPoolSpendData> = (
  props
) => (
  <CommunityPoolSpendComponent
    {...props}
    options={{
      PayEntityDisplay,
    }}
  />
)

const useTransformToCosmos: UseTransformToCosmos<CommunityPoolSpendData> = () =>
  useCallback(
    ({ authority, recipient, funds }: CommunityPoolSpendData) =>
      makeStargateMessage({
        stargate: {
          typeUrl: MsgCommunityPoolSpend.typeUrl,
          value: MsgCommunityPoolSpend.fromPartial({
            authority,
            recipient,
            amount: funds,
          }),
        },
      }),
    []
  )

const useDecodedCosmosMsg: UseDecodedCosmosMsg<CommunityPoolSpendData> = (
  msg: Record<string, any>
) =>
  isDecodedStargateMsg(msg) &&
  objectMatchesStructure(msg.stargate.value, {
    authority: {},
    recipient: {},
    amount: {},
  }) &&
  msg.stargate.typeUrl === MsgCommunityPoolSpend.typeUrl
    ? {
        match: true,
        data: {
          authority: msg.stargate.value.authority,
          recipient: msg.stargate.value.recipient,
          funds: msg.stargate.value.amount,
        },
      }
    : {
        match: false,
      }

export const makeCommunityPoolSpendAction: ActionMaker<
  CommunityPoolSpendData
> = ({ t, context }) =>
  context.type === ActionContextType.Gov
    ? {
        key: ActionKey.CommunityPoolSpend,
        Icon: MoneyEmoji,
        label: t('title.spend'),
        description: t('info.spendActionDescription', {
          context: context.type,
        }),
        Component,
        useDefaults,
        useTransformToCosmos,
        useDecodedCosmosMsg,
        // The normal Spend action will automatically create community pool
        // spends when used inside a governance proposal context. This community
        // pool spend action is just for display purposes, since the Spend
        // action only allows selecting one token at a time, whereas community
        // pool spends can contain multiple tokens. Thus, don't allow choosing
        // this action when creating a proposal, but still render it.
        hideFromPicker: true,
      }
    : null
