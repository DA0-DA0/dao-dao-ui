import { EscalatorWarningRounded } from '@mui/icons-material'

import {
  ActionCategoryKey,
  ActionKey,
  ContractVersion,
  Module,
  ModuleDisplayLocation,
  ModuleId,
  ModuleType,
  ModuleVisibilityContext,
  VoteDelegationModuleData,
} from '@dao-dao/types'

import { UpdateDelegationConfigAction } from './actions/UpdateDelegationConfig'
import { VoteDelegationModuleExtraData, editAction } from './editAction'
import { Editor } from './Editor'

export const VoteDelegationModule: Module<
  VoteDelegationModuleData,
  VoteDelegationModuleExtraData
> = {
  id: ModuleId.VoteDelegation,
  type: ModuleType.External,
  title: 'Vote Delegation',
  description: 'Allow members to delegate their voting power within the DAO.',
  Icon: EscalatorWarningRounded,
  IconFilled: EscalatorWarningRounded,
  location: ModuleDisplayLocation.Manual,
  visibilityContext: ModuleVisibilityContext.Always,
  minVersion: ContractVersion.V270,
  // supportsDaoCreation: true,
  defaultValues: {
    address: '',
  },
  defaultExtra: {
    updateDelegationConfig: {
      validityBlocks: '7776000',
      vpCapPercent: '10',
      maxDelegations: '50',
    },
  },
  Editor,
  editAction,
  getActions: ({ address }) => ({
    actionMakers: [
      (options) => new UpdateDelegationConfigAction(options, address),
    ],
    categoryMakers: [
      () => ({
        key: ActionCategoryKey.DaoGovernance,
        actionKeys: [ActionKey.UpdateDelegationConfig],
      }),
    ],
  }),
}
