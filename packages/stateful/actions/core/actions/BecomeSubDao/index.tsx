import { ActionBase, BabyEmoji } from '@dao-dao/stateless'
import { UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput } from '../../../../components'
import { BecomeSubDaoComponent, BecomeSubDaoData } from './Component'

const Component: ActionComponent<undefined, BecomeSubDaoData> = (props) => (
  <BecomeSubDaoComponent
    {...props}
    options={{
      AddressInput,
    }}
  />
)

export class BecomeSubDaoAction extends ActionBase<BecomeSubDaoData> {
  public readonly key = ActionKey.BecomeSubDao
  public readonly Component = Component

  protected _defaults: BecomeSubDaoData = {
    admin: '',
  }

  constructor(options: ActionOptions) {
    super(options, {
      Icon: BabyEmoji,
      label: options.t('title.becomeSubDao'),
      description: options.t('info.becomeSubDaoDescription'),
      notReusable: true,
      // If parent DAO exists, hide this action.
      hideFromPicker:
        options.context.type === ActionContextType.Dao &&
        options.context.dao.info.parentDao !== null,
    })
  }

  encode({ admin }: BecomeSubDaoData): UnifiedCosmosMsg {
    return makeExecuteSmartContractMessage({
      chainId: this.options.chain.chain_id,
      sender: this.options.address,
      contractAddress: this.options.address,
      msg: {
        nominate_admin: {
          admin,
        },
      },
    })
  }

  match([{ decodedMessage }]: ProcessedMessage[]): ActionMatch {
    return objectMatchesStructure(decodedMessage, {
      wasm: {
        execute: {
          msg: {
            nominate_admin: {
              admin: {},
            },
          },
        },
      },
    })
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): BecomeSubDaoData {
    return {
      admin: decodedMessage.wasm.execute.msg.nominate_admin.admin,
    }
  }
}
