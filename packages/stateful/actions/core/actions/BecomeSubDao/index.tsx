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
      chainId: this.options.chain.chainId,
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
    return (
      objectMatchesStructure(decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            msg: {
              nominate_admin: {
                admin: {},
              },
            },
          },
        },
        // Only match if this DAO is self-executing, since this indicates that
        // this changes from self-admin to a different admin. An admin
        // transferring a different DAO's admin is a different action
        // (TransferSubDAO).
      }) && decodedMessage.wasm.execute.contract_addr === this.options.address
    )
  }

  decode([{ decodedMessage }]: ProcessedMessage[]): BecomeSubDaoData {
    return {
      admin: decodedMessage.wasm.execute.msg.nominate_admin.admin,
    }
  }
}
