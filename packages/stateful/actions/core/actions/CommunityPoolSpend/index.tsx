import { ActionBase, MoneyEmoji } from '@dao-dao/stateless'
import { UnifiedCosmosMsg, makeStargateMessage } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { MsgCommunityPoolSpend } from '@dao-dao/types/protobuf/codegen/cosmos/distribution/v1beta1/tx'
import { isDecodedStargateMsg } from '@dao-dao/utils'

import { PayEntityDisplay } from '../../../../components/PayEntityDisplay'
import {
  CommunityPoolSpendComponent,
  CommunityPoolSpendData,
} from './Component'

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

export class CommunityPoolSpendAction extends ActionBase<CommunityPoolSpendData> {
  public readonly key = ActionKey.CommunityPoolSpend
  public readonly Component = Component

  protected _defaults: CommunityPoolSpendData = {
    authority: '',
    recipient: '',
    funds: [],
  }

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Gov) {
      throw new Error(
        'Community pool spends are only allowed in governance proposals'
      )
    }

    super(options, {
      Icon: MoneyEmoji,
      label: options.t('title.spend'),
      description: options.t('info.spendActionDescription', {
        context: options.context.type,
      }),
      // The normal Spend action will automatically create community pool spends
      // when used inside a governance proposal context. This community pool
      // spend action is just for display purposes, since the Spend action only
      // allows selecting one token at a time, whereas community pool spends can
      // contain multiple tokens. Thus, don't allow choosing this action when
      // creating a proposal, but still render it.
      hideFromPicker: true,
    })
  }

  encode({
    authority,
    recipient,
    funds,
  }: CommunityPoolSpendData): UnifiedCosmosMsg {
    return makeStargateMessage({
      stargate: {
        typeUrl: MsgCommunityPoolSpend.typeUrl,
        value: MsgCommunityPoolSpend.fromPartial({
          authority,
          recipient,
          amount: funds,
        }),
      },
    })
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return isDecodedStargateMsg(decodedMessage, MsgCommunityPoolSpend, {
      authority: {},
      recipient: {},
      amount: {},
    })
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): CommunityPoolSpendData {
    return {
      authority: decodedMessage.stargate.value.authority,
      recipient: decodedMessage.stargate.value.recipient,
      funds: decodedMessage.stargate.value.amount,
    }
  }
}
