import { HistoryOutlined, HistoryRounded } from '@mui/icons-material'

import {
  Module,
  ModuleDisplayLocation,
  ModuleId,
  ModuleType,
  ModuleVisibilityContext,
} from '@dao-dao/types'

import { Renderer } from './Renderer'

export const RetroactiveCompensationModule: Module = {
  id: ModuleId.RetroactiveCompensation,
  type: ModuleType.External,
  title: 'Retroactive Compensation',
  description:
    "Reward contributors for work they've already done. Vote on how to distribute payments in regular cycles.",
  Icon: HistoryOutlined,
  IconFilled: HistoryRounded,
  location: ModuleDisplayLocation.Tab,
  visibilityContext: ModuleVisibilityContext.Always,
  supportsDaoCreation: true,
  Renderer,
}
