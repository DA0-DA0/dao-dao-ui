import { useMemo } from 'react'

import {
  ActionBase,
  Loader,
  PuzzlePieceEmoji,
  useDao,
} from '@dao-dao/stateless'
import { IDaoBase, UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { DAO_MODULE_ITEM_PREFIX, getModuleStorageItemKey } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'
import { getModuleById, getModules, useModules } from '../../../../modules'
import { ManageStorageItemsAction } from '../ManageStorageItems'
import {
  ManageModulesData,
  ManageModulesComponent as StatelessManageModulesComponent,
} from './Component'

const Component: ActionComponent = (props) => {
  const dao = useDao()
  const availableModules = useMemo(
    () =>
      getModules({
        chainId: dao.chainId,
        version: dao.coreVersion,
      }),
    [dao]
  )
  const loadingExistingModules = useModules()

  return (
    <SuspenseLoader
      fallback={<Loader />}
      forceFallback={loadingExistingModules.loading}
    >
      {!loadingExistingModules.loading && (
        <StatelessManageModulesComponent
          {...props}
          options={{
            availableModules,
            existingModules: loadingExistingModules.data.map(
              ({ daoModule }) => daoModule
            ),
            SuspenseLoader,
          }}
        />
      )}
    </SuspenseLoader>
  )
}

export class ManageModulesAction<
  Values extends Record<string, unknown> = Record<string, unknown>,
  Extra extends Record<string, unknown> = Record<string, unknown>,
> extends ActionBase<ManageModulesData<Values, Extra>> {
  public readonly key = ActionKey.ManageModules
  public readonly Component = Component

  protected _defaults: ManageModulesData<Values, Extra> = {
    mode: 'set',
    id: '',
    values: {} as Values,
    extra: {} as Extra,
  }

  public readonly dao: IDaoBase
  private manageStorageItemsAction: ManageStorageItemsAction

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    const manageStorageItemsAction = new ManageStorageItemsAction(options)

    super(options, {
      Icon: PuzzlePieceEmoji,
      label: options.t('title.manageModules'),
      description: options.t('info.manageModulesDescription'),
      // match just before manage storage items, but still after other more
      // individual module actions, like enable vesting payments and enable
      // retroactive compensation
      matchPriority: manageStorageItemsAction.metadata.matchPriority! + 1,
    })

    this.dao = options.context.dao
    this.manageStorageItemsAction = manageStorageItemsAction
  }

  setup() {
    return this.manageStorageItemsAction.setup()
  }

  async encode({
    mode,
    id,
    values,
    extra,
  }: ManageModulesData<Values, Extra>): Promise<UnifiedCosmosMsg[]> {
    const setting = mode === 'set'
    const msgs = [
      this.manageStorageItemsAction.encode({
        setting,
        key: getModuleStorageItemKey(id),
        value: JSON.stringify(values),
      }),
    ]

    // Optionally add additional module messages when updating a module.
    if (setting) {
      const existingModule = getModules({
        chainId: this.dao.chainId,
        version: this.dao.coreVersion,
      }).find((w) => w.id === id)
      if (existingModule?.editAction) {
        msgs.push(
          ...[
            await existingModule.editAction.encode({
              data: values,
              options: this.options,
              extra,
            }),
          ].flat()
        )
      }
    }

    return msgs
  }

  async match(messages: ProcessedMessage[]): Promise<ActionMatch> {
    if (this.options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    const manageStorageItemsMatch =
      this.manageStorageItemsAction.match(messages)
    if (!manageStorageItemsMatch) {
      return manageStorageItemsMatch
    }

    const { setting, key, value } =
      this.manageStorageItemsAction.decode(messages)

    // Ensure this is setting or removing a module item.
    if (!key.startsWith(getModuleStorageItemKey(''))) {
      return false
    }

    // Optionally match additional module messages when updating a module.
    if (setting) {
      const moduleId = key.substring(DAO_MODULE_ITEM_PREFIX.length)
      const existingModule = getModuleById(moduleId, {
        chainId: this.dao.chainId,
        version: this.dao.coreVersion,
      })
      if (existingModule?.editAction && messages.length > 1) {
        const values = JSON.parse(value)
        const moduleMatch = await existingModule.editAction.match({
          data: values,
          messages: messages.slice(1),
          options: this.options,
        })
        if (moduleMatch) {
          // Match the first ManageModules message, and then match the number of
          // additional messages encoded by the module's edit action.
          return 1 + (moduleMatch === true ? 1 : moduleMatch)
        }
      }
    }

    return true
  }

  async decode(
    messages: ProcessedMessage[]
  ): Promise<ManageModulesData<Values, Extra>> {
    const manageStorageItemsData =
      this.manageStorageItemsAction.decode(messages)

    let values = {}
    if (manageStorageItemsData.setting) {
      try {
        values = JSON.parse(manageStorageItemsData.value)
      } catch (err) {
        console.error(err)
      }
    }

    const mode = manageStorageItemsData.setting ? 'set' : 'delete'
    const id = manageStorageItemsData.key.substring(
      DAO_MODULE_ITEM_PREFIX.length
    )
    let extra = {}

    // Decode additional module data if necessary.
    if (mode === 'set') {
      const existingModule = getModuleById(id, {
        chainId: this.dao.chainId,
        version: this.dao.coreVersion,
      })
      if (existingModule?.editAction?.decode && messages.length > 1) {
        extra = await existingModule.editAction.decode({
          data: values,
          messages: messages.slice(1),
          options: this.options,
        })
      }
    }

    return {
      mode,
      id,
      values: values as Values,
      extra: extra as Extra,
    }
  }
}
