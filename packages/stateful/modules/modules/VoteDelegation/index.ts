import { EscalatorWarningRounded } from '@mui/icons-material'

import {
  ActionCategoryKey,
  ActionKey,
  ContractVersion,
  Module,
  ModuleDisplayLocation,
  ModuleId,
  ModuleVisibilityContext,
  VoteDelegationModuleData,
} from '@dao-dao/types'

import {
  UpdateDelegationConfigAction,
  defaultExtra,
} from './actions/UpdateDelegationConfig'
import { editAction } from './editAction'
import { Editor } from './Editor'

export const VoteDelegationModule: Module<VoteDelegationModuleData> = {
  id: ModuleId.VoteDelegation,
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
  defaultExtra,
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
