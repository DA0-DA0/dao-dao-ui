import { daoVetoableDaosSelector } from '@dao-dao/state/recoil'
import {
  ActionBase,
  ThumbDownEmoji,
  useActionOptions,
  useCachedLoadingWithError,
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
import { VETOABLE_DAOS_ITEM_KEY_PREFIX } from '@dao-dao/utils'

import { AddressInput, EntityDisplay } from '../../../../components'
import { ManageStorageItemsAction } from '../ManageStorageItems'
import {
  ManageVetoableDaosData,
  ManageVetoableDaosComponent as StatelessManageVetoableDaosComponent,
} from './Component'

const Component: ActionComponent = (props) => {
  const {
    address,
    chain: { chain_id: chainId },
  } = useActionOptions()

  const currentlyEnabledLoading = useCachedLoadingWithError(
    daoVetoableDaosSelector({
      chainId,
      coreAddress: address,
    })
  )

  return (
    <StatelessManageVetoableDaosComponent
      {...props}
      options={{
        currentlyEnabled:
          currentlyEnabledLoading.loading || currentlyEnabledLoading.errored
            ? []
            : currentlyEnabledLoading.data,
        AddressInput,
        EntityDisplay,
      }}
    />
  )
}

export class ManageVetoableDaosAction extends ActionBase<ManageVetoableDaosData> {
  public readonly key = ActionKey.ManageVetoableDaos
  public readonly Component = Component

  private manageStorageItemsAction: ManageStorageItemsAction

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    const manageStorageItemsAction = new ManageStorageItemsAction(options)

    super(options, {
      Icon: ThumbDownEmoji,
      label: options.t('title.manageVetoableDaos'),
      description: options.t('info.manageVetoableDaosDescription'),
      // Match just before manage storage items since this action uses that
      // under the hood.
      matchPriority: manageStorageItemsAction.metadata.matchPriority! + 1,
    })

    this.manageStorageItemsAction = manageStorageItemsAction

    this.defaults = {
      chainId: options.chain.chain_id,
      enable: true,
      address: '',
    }
  }

  setup() {
    return this.manageStorageItemsAction.setup()
  }

  encode({
    chainId,
    enable,
    address,
  }: ManageVetoableDaosData): UnifiedCosmosMsg {
    return this.manageStorageItemsAction.encode({
      setting: enable,
      key: VETOABLE_DAOS_ITEM_KEY_PREFIX + chainId + ':' + address,
      value: '1',
    })
  }

  match(messages: ProcessedMessage[]): ActionMatch {
    // Check if manage storage items matches.
    const manageStorageItemsMatch =
      this.manageStorageItemsAction.match(messages)
    if (!manageStorageItemsMatch) {
      return manageStorageItemsMatch
    }

    // Ensure this is setting or removing a vetoable DAO item.
    const { key, value } = this.manageStorageItemsAction.decode(messages)
    return (
      key.startsWith(VETOABLE_DAOS_ITEM_KEY_PREFIX) &&
      key.split(':').length === 3 &&
      value === '1'
    )
  }

  decode(messages: ProcessedMessage[]): ManageVetoableDaosData {
    const { setting, key } = this.manageStorageItemsAction.decode(messages)
    return {
      chainId: key.split(':')[1],
      enable: setting,
      address: key.split(':')[2],
    }
  }
}
