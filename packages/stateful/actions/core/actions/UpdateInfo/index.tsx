import { daoDaoCoreQueries } from '@dao-dao/state'
import { ActionBase, InfoEmoji } from '@dao-dao/stateless'
import { ActionContextType, ChainId, UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import {
  isNeutronForkVersion,
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { ManageStorageItemsAction } from '../ManageStorageItems'
import { UpdateInfoComponent as Component, UpdateInfoData } from './Component'

export class UpdateInfoAction extends ActionBase<UpdateInfoData> {
  public readonly key = ActionKey.UpdateInfo
  public readonly Component = Component

  private manageStorageItemsAction: ManageStorageItemsAction

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Only DAOs can update info.')
    }

    super(options, {
      Icon: InfoEmoji,
      label: options.t('title.updateInfo'),
      description: options.t('info.updateInfoActionDescription'),
    })

    this.manageStorageItemsAction = new ManageStorageItemsAction(options)
  }

  async setup() {
    if (this.options.context.type !== ActionContextType.Dao) {
      throw new Error('Only DAOs can update info.')
    }

    this.defaults = {
      ...(await this.options.queryClient.fetchQuery(
        daoDaoCoreQueries.config({
          chainId: this.options.chain.chainId,
          contractAddress: this.options.address,
        })
      )),
      banner: this.options.context.dao.bannerImageUrl,
    }
  }

  async encode({
    banner,
    ...data
  }: UpdateInfoData): Promise<UnifiedCosmosMsg[]> {
    // Type-check. Should be validated in the constructor.
    if (this.options.context.type !== ActionContextType.Dao) {
      throw new Error('Only DAOs can update info.')
    }

    const isSettingBanner = !!banner

    const hasBanner = !!(
      await this.options.queryClient.fetchQuery(
        daoDaoCoreQueries.getItem({
          chainId: this.options.chain.chainId,
          contractAddress: this.options.address,
          args: {
            key: 'banner',
          },
        })
      )
    ).item

    return [
      makeExecuteSmartContractMessage({
        chainId: this.options.chain.chainId,
        sender: this.options.address,
        contractAddress: this.options.address,
        msg: {
          update_config: {
            config:
              this.options.context.dao.chainId === ChainId.NeutronMainnet &&
              isNeutronForkVersion(this.options.context.dao.coreVersion)
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
      }),
      // Only unset banner if it is currently set.
      ...(isSettingBanner || hasBanner
        ? [
            this.manageStorageItemsAction.encode({
              setting: isSettingBanner,
              key: 'banner',
              value: banner || '',
            }),
          ]
        : []),
    ]
  }

  match(messages: ProcessedMessage[]): ActionMatch {
    const isUpdateInfo =
      objectMatchesStructure(messages[0].decodedMessage, {
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
      }) &&
      messages[0].decodedMessage.wasm.execute.contract_addr ===
        this.options.address

    if (!isUpdateInfo) {
      return false
    }

    const isChangingBanner =
      messages.length >= 2 &&
      this.manageStorageItemsAction.match([messages[1]]) &&
      this.manageStorageItemsAction.decode([messages[1]]).key === 'banner'

    // If is changing banner, match both update info and banner change.
    // Otherwise, just match update info.
    return isChangingBanner ? 2 : 1
  }

  decode(messages: ProcessedMessage[]): UpdateInfoData {
    const {
      decodedMessage: {
        wasm: {
          execute: {
            msg: {
              update_config: { config },
            },
          },
        },
      },
    } = messages[0]

    const decodedBanner =
      messages.length === 2
        ? this.manageStorageItemsAction.decode([messages[1]])
        : undefined

    return {
      name: config.name,
      description: config.description,
      automatically_add_cw20s: config.automatically_add_cw20s,
      automatically_add_cw721s: config.automatically_add_cw721s,

      // Only add image url if in the message.
      ...(!!config.image_url && {
        image_url: config.image_url,
      }),

      banner: decodedBanner?.setting ? decodedBanner.value : undefined,

      // V2 passthrough
      // Only add dao URI if in the message.
      ...('dao_uri' in config && {
        dao_uri: config.dao_uri,
      }),
    }
  }
}
