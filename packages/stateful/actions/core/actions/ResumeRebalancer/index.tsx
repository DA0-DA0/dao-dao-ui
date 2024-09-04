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
  ResumeRebalancerComponent as Component,
  ResumeRebalancerData,
} from './Component'

export class ResumeRebalancerAction extends ActionBase<ResumeRebalancerData> {
  public readonly key = ActionKey.ResumeRebalancer
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: PlayPauseEmoji,
      label: options.t('title.resumeRebalancer'),
      description: options.t('info.resumeRebalancerDescription'),
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

  encode({ account }: ResumeRebalancerData): UnifiedCosmosMsg {
    return makeExecuteSmartContractMessage({
      chainId: this.options.chain.chain_id,
      sender: this.options.address,
      contractAddress: account,
      msg: {
        resume_service: {
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
              resume_service: {
                service_name: {},
              },
            },
          },
        },
      }) &&
      decodedMessage.wasm.execute.msg.resume_service.service_name ===
        'rebalancer'
    )
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): ResumeRebalancerData {
    return {
      account: decodedMessage.wasm.execute.contract_addr,
    }
  }
}
