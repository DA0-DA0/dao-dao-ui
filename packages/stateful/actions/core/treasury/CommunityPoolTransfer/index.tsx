import { useCallback } from 'react'

import { CurvedDownArrowEmoji } from '@dao-dao/stateless'
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
import { useEntity } from '../../../../hooks'
import {
  CommunityPoolTransferComponent,
  CommunityPoolTransferData,
} from './Component'

const useDefaults: UseDefaults<CommunityPoolTransferData> = () => ({
  authority: '',
  recipient: '',
  funds: [],
})

const Component: ActionComponent<undefined, CommunityPoolTransferData> = (
  props
) => {
  const entity = useEntity(props.data.recipient)

  return (
    <CommunityPoolTransferComponent
      {...props}
      options={{
        entity,
        PayEntityDisplay,
      }}
    />
  )
}

const useTransformToCosmos: UseTransformToCosmos<
  CommunityPoolTransferData
> = () =>
  useCallback(
    ({ authority, recipient, funds }: CommunityPoolTransferData) =>
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

const useDecodedCosmosMsg: UseDecodedCosmosMsg<CommunityPoolTransferData> = (
  msg: Record<string, any>
) =>
  isDecodedStargateMsg(msg) &&
  objectMatchesStructure(msg, {
    stargate: {
      typeUrl: {},
      value: {
        authority: {},
        recipient: {},
        amount: {},
      },
    },
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

export const makeCommunityPoolTransferAction: ActionMaker<
  CommunityPoolTransferData
> = ({ t, context }) =>
  context.type === ActionContextType.Gov
    ? {
        key: ActionKey.CommunityPoolTransfer,
        Icon: CurvedDownArrowEmoji,
        label: t('title.transfer'),
        description: t('info.communityPoolTransferDescription', {
          context: context.type,
        }),
        Component,
        useDefaults,
        useTransformToCosmos,
        useDecodedCosmosMsg,
        // Only used to render community pool spends in gov props. Will be
        // automatically added. Should not be used manually by user.
        programmaticOnly: true,
      }
    : null
