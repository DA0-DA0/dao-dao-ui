import { ActionBase, PlayPauseEmoji } from '@dao-dao/stateless'
import { AccountType, ChainId, UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  getAccountAddress,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import {
  PauseRebalancerComponent as Component,
  PauseRebalancerData,
} from './Component'

export class PauseRebalancerAction extends ActionBase<PauseRebalancerData> {
  public readonly key = ActionKey.PauseRebalancer
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: PlayPauseEmoji,
      label: options.t('title.pauseRebalancer'),
      description: options.t('info.pauseRebalancerDescription'),
      // Hide if no Valence account created.
      hideFromPicker: !options.context.accounts.some(
        ({ type }) => type === AccountType.Valence
      ),
    })

    const account = getAccountAddress({
      accounts: options.context.accounts,
      chainId: ChainId.NeutronMainnet,
      types: [AccountType.Valence],
    })

    if (!account) {
      throw new Error(options.t('error.noValenceAccount'))
    }

    this.defaults = {
      account,
    }
  }

  encode({ account }: PauseRebalancerData): UnifiedCosmosMsg {
    return makeExecuteSmartContractMessage({
      chainId: this.options.chain.chainId,
      sender: this.options.address,
      contractAddress: account,
      msg: {
        pause_service: {
          service_name: 'rebalancer',
        },
      },
    })
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return (
      objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            funds: {},
            msg: {
              pause_service: {
                service_name: {},
              },
            },
          },
        },
      }) &&
      decodedMessage.wasm.execute.msg.pause_service.service_name ===
        'rebalancer'
    )
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): PauseRebalancerData {
    return {
      account: decodedMessage.wasm.execute.contract_addr,
    }
  }
}
