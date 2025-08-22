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
import { VestingPaymentsModuleExtraData } from '../../../../modules/modules/VestingPayments/editAction'
import { ManageModulesAction } from '../ManageModules'
import {
  ConfigureVestingPaymentsComponent,
  ConfigureVestingPaymentsData,
} from './Component'

export class ConfigureVestingPaymentsAction extends ActionBase<ConfigureVestingPaymentsData> {
  public readonly key = ActionKey.ConfigureVestingPayments
  public readonly Component = ConfigureVestingPaymentsComponent

  private manageModulesAction: ManageModulesAction<
    VestingPaymentsModuleData,
    VestingPaymentsModuleExtraData
  >

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
    const existingModule = this.manageModulesAction.dao.modules.find(
      ({ id }) => id === ModuleId.VestingPayments
    )

    this._defaults = existingModule
      ? {
          values: cloneDeep(existingModule.values),
          extra: {
            factories: {},
          },
        }
      : {
          values: {
            factories: {},
          },
          extra: {
            factories: {},
          },
        }
  }

  encode({
    values,
    extra,
  }: ConfigureVestingPaymentsData): Promise<UnifiedCosmosMsg[]> {
    return this.manageModulesAction.encode({
      mode: 'set',
      id: ModuleId.VestingPayments,
      values,
      extra,
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
      ? manageModulesMatch
      : false
  }

  async decode(
    messages: ProcessedMessage[]
  ): Promise<ConfigureVestingPaymentsData> {
    const { values, extra } = await this.manageModulesAction.decode(messages)
    return {
      values,
      extra,
    }
  }
}
