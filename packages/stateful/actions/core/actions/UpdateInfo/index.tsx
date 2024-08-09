import { daoDaoCoreQueries } from '@dao-dao/state'
import { ActionBase, InfoEmoji } from '@dao-dao/stateless'
import {
  ActionContextType,
  ChainId,
  ContractVersion,
  UnifiedCosmosMsg,
} from '@dao-dao/types'
import {
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { UpdateInfoComponent as Component, UpdateInfoData } from './Component'

export class UpdateInfoAction extends ActionBase<UpdateInfoData> {
  public readonly key = ActionKey.UpdateInfo
  public readonly Component = Component

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Only DAOs can update info.')
    }

    super(options, {
      Icon: InfoEmoji,
      label: options.t('title.updateInfo'),
      description: options.t('info.updateInfoActionDescription'),
    })
  }

  async setup() {
    this.defaults = await this.options.queryClient.fetchQuery(
      daoDaoCoreQueries.config(this.options.queryClient, {
        chainId: this.options.chain.chain_id,
        contractAddress: this.options.address,
      })
    )
  }

  encode(data: UpdateInfoData): UnifiedCosmosMsg {
    // Type-check. Should be validated in the constructor.
    if (this.options.context.type !== ActionContextType.Dao) {
      throw new Error('Only DAOs can update info.')
    }

    return makeExecuteSmartContractMessage({
      chainId: this.options.chain.chain_id,
      sender: this.options.address,
      contractAddress: this.options.address,
      msg: {
        update_config: {
          config:
            this.options.context.dao.chainId === ChainId.NeutronMainnet &&
            this.options.context.dao.coreVersion ===
              ContractVersion.V2AlphaNeutronFork
              ? // The Neutron fork DAO has a different config structure.
                {
                  name: data.name,
                  description: data.description,
                  dao_uri: 'dao_uri' in data ? data.dao_uri : null,
                }
              : {
                  ...data,
                  // Replace empty string with null.
                  image_url: data.image_url?.trim() || null,
                },
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
              update_config: {
                config: {
                  name: {},
                  description: {},
                },
              },
            },
          },
        },
      }) && decodedMessage.wasm.execute.contract_addr === this.options.address
    )
  }

  decode([
    {
      decodedMessage: {
        wasm: {
          execute: {
            msg: {
              update_config: { config },
            },
          },
        },
      },
    },
  ]: ProcessedMessage[]): UpdateInfoData {
    return {
      name: config.name,
      description: config.description,
      automatically_add_cw20s: config.automatically_add_cw20s,
      automatically_add_cw721s: config.automatically_add_cw721s,

      // Only add image url if in the message.
      ...(!!config.image_url && {
        image_url: config.image_url,
      }),

      // V2 passthrough
      // Only add dao URI if in the message.
      ...('dao_uri' in config && {
        dao_uri: config.dao_uri,
      }),
    }
  }
}
