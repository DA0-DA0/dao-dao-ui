import cloneDeep from 'lodash.clonedeep'

import { ActionBase, SuitAndTieEmoji } from '@dao-dao/stateless'
import {
  ModuleId,
  UnifiedCosmosMsg,
  VestingPaymentsModuleData,
} from '@dao-dao/types'
import {
  ActionContextType,
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'

import { getModuleById } from '../../../../modules'
import { ManageModulesAction } from '../ManageModules'
import { ConfigureVestingPaymentsComponent } from './Component'

export class ConfigureVestingPaymentsAction extends ActionBase<VestingPaymentsModuleData> {
  public readonly key = ActionKey.ConfigureVestingPayments
  public readonly Component = ConfigureVestingPaymentsComponent

  private manageModulesAction: ManageModulesAction

  constructor(options: ActionOptions) {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Not DAO context')
    }

    const enabled = options.context.dao.isModuleEnabled(
      ModuleId.VestingPayments
    )

    super(options, {
      Icon: SuitAndTieEmoji,
      label: enabled
        ? options.t('title.configureVestingPayments')
        : options.t('title.enableVestingPayments'),
      description: enabled
        ? options.t('info.configureVestingPaymentsDescription')
        : getModuleById(ModuleId.VestingPayments)?.description || '',
      keywords: ['payroll'],
      notReusable: true,
    })

    this.manageModulesAction = new ManageModulesAction(options)
  }

  async setup() {
    await this.manageModulesAction.setup()

    // Attempt to load existing module data.
    const module = this.manageModulesAction.dao.modules.find(
      ({ id }) => id === ModuleId.VestingPayments
    )

    this._defaults = module
      ? cloneDeep(module.values)
      : {
          factories: {},
        }
  }

  encode(data: VestingPaymentsModuleData): Promise<UnifiedCosmosMsg[]> {
    return this.manageModulesAction.encode({
      mode: 'set',
      id: ModuleId.VestingPayments,
      values: data,
      extra: {},
    })
  }

  async match(messages: ProcessedMessage[]): Promise<ActionMatch> {
    const manageModulesMatch = this.manageModulesAction.match(messages)
    if (!manageModulesMatch) {
      return manageModulesMatch
    }

    // Ensure this is setting the vesting payments module item.
    const { mode, id } = await this.manageModulesAction.decode(messages)
    return mode === 'set' && id === ModuleId.VestingPayments
  }

  async decode(
    messages: ProcessedMessage[]
  ): Promise<VestingPaymentsModuleData> {
    return (await this.manageModulesAction.decode(messages)).values
  }
}
