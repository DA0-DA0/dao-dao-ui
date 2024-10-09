# Action template

Here is a template to use when making a new action.

```ts
import { ActionBase, Emoji } from '@dao-dao/stateless'
import { UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  makeExecuteSmartContractMessage,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { Component, TemplateData } from './Component'

export class TemplateAction extends ActionBase<TemplateData> {
  public readonly key = ActionKey.Template
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: Emoji,
      label: options.t('title.label'),
      description: options.t('info.description'),
    })

    this.defaults = {
      chainId: options.chain.chainId,
      address: '',
      field: '',
    }
  }

  encode({ chainId, address, field }: TemplateData): UnifiedCosmosMsg[] {
    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      makeExecuteSmartContractMessage({
        chainId,
        sender: getChainAddressForActionOptions(this.options, chainId) || '',
        contractAddress: address,
        msg: {
          do_something: {
            field,
          },
        },
      })
    )
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return objectMatchesStructure(decodedMessage, {
      wasm: {
        execute: {
          contract_addr: {},
          funds: {},
          msg: {
            do_something: {
              field: {},
            },
          },
        },
      },
    })
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): TemplateData {
    return {
      chainId,
      address: decodedMessage.wasm.execute.contract_addr,
      field: decodedMessage.wasm.execute.msg.do_something.field,
    }
  }
}
```
