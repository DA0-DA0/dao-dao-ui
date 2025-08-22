import { PaidOutlined, PaidRounded } from '@mui/icons-material'

import {
  LATEST_VESTING_CONTRACT_VERSION,
  Module,
  ModuleDisplayLocation,
  ModuleId,
  ModuleVisibilityContext,
  VestingPaymentsModuleData,
} from '@dao-dao/types'

import { VestingPaymentsModuleExtraData, editAction } from './editAction'
import { Renderer } from './Renderer'
import { VestingPaymentsEditor as Editor } from './VestingPaymentsEditor'

export const VestingPaymentsModule: Module<
  VestingPaymentsModuleData,
  VestingPaymentsModuleExtraData
> = {
  id: ModuleId.VestingPayments,
  title: 'Vesting Payments',
  description:
    'Vest funds to contributors at a constant rate, similar to a salary.',
  Icon: PaidOutlined,
  IconFilled: PaidRounded,
  location: ModuleDisplayLocation.Tab,
  visibilityContext: ModuleVisibilityContext.Always,
  supportsDaoCreation: true,
  defaultValues: {
    factories: {},
    version: LATEST_VESTING_CONTRACT_VERSION,
  },
  defaultExtra: {
    factories: {},
  },
  Renderer,
  Editor,
  editAction,
}
