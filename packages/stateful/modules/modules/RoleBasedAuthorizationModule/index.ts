import { KeyRounded } from '@mui/icons-material'

import {
  ContractVersion,
  Module,
  ModuleDisplayLocation,
  ModuleId,
  ModuleType,
  ModuleVisibilityContext,
} from '@dao-dao/types'
import { ContractName } from '@dao-dao/utils'

export const RoleBasedAuthorizationModule: Module = {
  id: ModuleId.RoleBasedAuthorizationModule,
  type: ModuleType.Proposal,
  contractName: ContractName.DaoRbam,
  title: 'Role-based Authorization Module (RBAM)',
  description: 'Authorize accounts to perform actions based on roles.',
  Icon: KeyRounded,
  IconFilled: KeyRounded,
  location: ModuleDisplayLocation.Tab,
  visibilityContext: ModuleVisibilityContext.Always,
  minVersion: ContractVersion.V280Alpha2,
}
