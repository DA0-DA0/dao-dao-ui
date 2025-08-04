import { daoQueries } from '@dao-dao/state/query'
import {
  ActionBase,
  BabyAngelEmoji,
  useActionOptions,
} from '@dao-dao/stateless'
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
  getChainAddressForActionOptions,
  makeExecuteSmartContractMessage,
  maybeMakePolytoneExecuteMessages,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { AddressInput, EntityDisplay } from '../../../../components'
import { useQueryLoadingDataWithError } from '../../../../hooks'
import { TransferSubDaoComponent, TransferSubDaoData } from './Component'

const Component: ActionComponent<undefined, TransferSubDaoData> = (props) => {
  const options = useActionOptions()

  const subDaos = useQueryLoadingDataWithError(
    daoQueries.subDaoInfos({
      chainId: options.chain.chainId,
      coreAddress: options.address,
    })
  )

  return (
    <TransferSubDaoComponent
      {...props}
      options={{
        subDaos,
        AddressInput,
        EntityDisplay,
      }}
    />
  )
}

export class TransferSubDaoAction extends ActionBase<TransferSubDaoData> {
  public readonly key = ActionKey.TransferSubDao
  public readonly Component = Component

  constructor(options: ActionOptions) {
    super(options, {
      Icon: BabyAngelEmoji,
      label: options.t('title.transferSubDao'),
      description: options.t('info.transferSubDaoDescription'),
      notReusable: true,
      // If parent DAO does not exist, hide this action.
      hideFromPicker:
        options.context.type !== ActionContextType.Dao ||
        options.context.dao.info.parentDao === null,
    })

    this._defaults = {
      chainId: options.chain.chainId,
      dao: '',
      admin: '',
    }
  }

  encode({ chainId, dao, admin }: TransferSubDaoData): UnifiedCosmosMsg[] {
    const sender = getChainAddressForActionOptions(this.options, chainId)
    if (!sender) {
      throw new Error('No sender address found for chain')
    }

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      makeExecuteSmartContractMessage({
        chainId,
        sender,
        contractAddress: dao,
        msg: {
          nominate_admin: {
            admin,
          },
        },
      })
    )
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
        // Only match if not self-executing to ensure that this is not a DAO
        // becoming a SubDAO, which is a different action (BecomeSubDao).
      }) && decodedMessage.wasm.execute.contract_addr !== this.options.address
    )
  }

  decode([
    {
      decodedMessage,
      account: { chainId },
    },
  ]: ProcessedMessage[]): TransferSubDaoData {
    return {
      chainId,
      dao: decodedMessage.wasm.execute.contract_addr,
      admin: decodedMessage.wasm.execute.msg.nominate_admin.admin,
    }
  }
}
