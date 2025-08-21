import { ActionBase, BeeEmoji } from '@dao-dao/stateless'
import { ModuleId, UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'

import { getModuleById } from '../../../../modules'
import { ManageModulesAction } from '../ManageModules'
import { EnableRetroactiveCompensationComponent } from './Component'

export class EnableRetroactiveCompensationAction extends ActionBase<{}> {
  public readonly key = ActionKey.EnableRetroactiveCompensation
  public readonly Component = EnableRetroactiveCompensationComponent

  protected _defaults = {}

  private manageModulesAction: ManageModulesAction

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    const enabled = options.context.dao.isModuleEnabled(
      ModuleId.RetroactiveCompensation
    )

    super(options, {
      Icon: BeeEmoji,
      label: options.t('title.enableRetroactiveCompensation'),
      description:
        getModuleById(ModuleId.RetroactiveCompensation)?.description || '',
      keywords: ['payroll'],
      notReusable: true,
      // Do not allow using this action if the DAO already has retroactive
      // compensation enabled.
      hideFromPicker: enabled,
    })

    this.manageModulesAction = new ManageModulesAction(options)
  }

  setup() {
    return this.manageModulesAction.setup()
  }

  encode(): Promise<UnifiedCosmosMsg[]> {
    return this.manageModulesAction.encode({
      mode: 'set',
      id: ModuleId.RetroactiveCompensation,
      values: {},
      extra: {},
    })
  }

  async match(messages: ProcessedMessage[]): Promise<ActionMatch> {
    const manageModulesMatch = this.manageModulesAction.match(messages)
    if (!manageModulesMatch) {
      return manageModulesMatch
    }

    // Ensure this is setting the retroactive compensation module item.
    const { mode, id } = await this.manageModulesAction.decode(messages)
    return mode === 'set' && id === ModuleId.RetroactiveCompensation
      ? manageModulesMatch
      : false
  }

  decode() {
    return {}
  }
}
