import { ActionBase, GasEmoji } from '@dao-dao/stateless'
import { ChainId, UnifiedCosmosMsg, makeStargateMessage } from '@dao-dao/types'
import {
  ActionComponent,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  MsgRegisterFeeShare,
  MsgUpdateFeeShare,
} from '@dao-dao/types/protobuf/codegen/juno/feeshare/v1/tx'
import { isDecodedStargateMsg } from '@dao-dao/utils'

import { AddressInput } from '../../../../components/AddressInput'
import { FeeShareComponent, FeeShareData } from './Component'

const Component: ActionComponent = (props) => (
  <FeeShareComponent
    {...props}
    options={{
      AddressInput,
    }}
  />
)

export class FeeShareAction extends ActionBase<FeeShareData> {
  public readonly key = ActionKey.FeeShare
  public readonly Component = Component

  protected _defaults: FeeShareData = {
    typeUrl: MsgRegisterFeeShare.typeUrl,
    contract: '',
    showWithdrawer: false,
    withdrawer: '',
  }

  constructor(options: ActionOptions) {
    // Only supported on Juno.
    if (
      options.chain.chain_id !== ChainId.JunoMainnet &&
      options.chain.chain_id !== ChainId.JunoTestnet
    ) {
      throw new Error('Fee share is only supported on Juno')
    }

    super(options, {
      Icon: GasEmoji,
      label: options.t('title.feeShare'),
      description: options.t('info.feeShareDescription'),
    })
  }

  encode({
    contract,
    showWithdrawer,
    typeUrl,
    withdrawer,
  }: FeeShareData): UnifiedCosmosMsg {
    return makeStargateMessage({
      stargate: {
        typeUrl,
        value: {
          contractAddress: contract,
          deployerAddress: this.options.address,
          withdrawerAddress:
            (showWithdrawer && withdrawer) || this.options.address,
        },
      },
    })
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return isDecodedStargateMsg(decodedMessage, [
      MsgRegisterFeeShare,
      MsgUpdateFeeShare,
    ])
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): FeeShareData {
    return {
      typeUrl: decodedMessage.stargate.typeUrl,
      contract: decodedMessage.stargate.value.contractAddress,
      showWithdrawer:
        decodedMessage.stargate.value.withdrawerAddress !==
        this.options.address,
      withdrawer: decodedMessage.stargate.value.withdrawerAddress,
    }
  }
}
