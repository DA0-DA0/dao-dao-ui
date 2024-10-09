import { chainQueries } from '@dao-dao/state/query'
import {
  ActionBase,
  DottedLineFaceEmoji,
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
  ICA_CHAINS_TX_PREFIX,
  getFilteredDaoItemsByPrefix,
} from '@dao-dao/utils'

import { ManageStorageItemsAction } from '../ManageStorageItems'
import {
  HideIcaData,
  HideIcaComponent as StatelessHideIcaComponent,
} from './Component'

const Component: ActionComponent = (props) => {
  const { context } = useActionOptions()

  if (context.type !== ActionContextType.Dao) {
    return null
  }

  const currentlyEnabled = getFilteredDaoItemsByPrefix(
    context.dao.info.items,
    ICA_CHAINS_TX_PREFIX
  ).map(([key]) => key)

  return (
    <StatelessHideIcaComponent
      {...props}
      options={{
        currentlyEnabled,
      }}
    />
  )
}

export class HideIcaAction extends ActionBase<HideIcaData> {
  public readonly key = ActionKey.HideIca
  public readonly Component = Component

  private manageStorageItemsAction: ManageStorageItemsAction

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    const manageStorageItemsAction = new ManageStorageItemsAction(options)

    super(options, {
      Icon: DottedLineFaceEmoji,
      label: options.t('title.hideIca'),
      description: options.t('info.hideIcaDescription'),
      // Match just before manage storage items since this action uses that
      // under the hood.
      matchPriority: manageStorageItemsAction.metadata.matchPriority! + 1,
      // Hide until ready. Update this in setup.
      hideFromPicker: true,
    })

    this.manageStorageItemsAction = manageStorageItemsAction

    this.defaults = {
      chainId: '',
    }

    // Fire async init immediately since we may hide this action.
    this.init().catch(() => {})
  }

  async setup() {
    // Hide from picker if chain does not support ICA controller.
    this.metadata.hideFromPicker = !(await this.options.queryClient.fetchQuery(
      chainQueries.supportsIcaController({
        chainId: this.options.chain.chainId,
      })
    ))

    return this.manageStorageItemsAction.setup()
  }

  encode({ chainId }: HideIcaData): UnifiedCosmosMsg {
    return this.manageStorageItemsAction.encode({
      setting: false,
      key: ICA_CHAINS_TX_PREFIX + chainId,
      // Unused.
      value: '',
    })
  }

  match(messages: ProcessedMessage[]): ActionMatch {
    // Check if manage storage items matches.
    const manageStorageItemsMatch =
      this.manageStorageItemsAction.match(messages)
    if (!manageStorageItemsMatch) {
      return manageStorageItemsMatch
    }

    // Ensure this is removing an ICA item.
    const { setting, key } = this.manageStorageItemsAction.decode(messages)
    return (
      !setting &&
      key.startsWith(ICA_CHAINS_TX_PREFIX) &&
      key.split(':').length === 2
    )
  }

  decode(messages: ProcessedMessage[]): HideIcaData {
    const { key } = this.manageStorageItemsAction.decode(messages)
    return {
      chainId: key.split(':')[1],
    }
  }
}
