import { EscalatorWarningRounded } from '@mui/icons-material'

import {
  ContractVersion,
  VoteDelegationWidgetData,
  Widget,
  WidgetId,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'

import { editAction } from './editAction'
import { Editor } from './Editor'

export const VoteDelegationWidget: Widget<VoteDelegationWidgetData> = {
  id: WidgetId.VoteDelegation,
  Icon: EscalatorWarningRounded,
  IconFilled: EscalatorWarningRounded,
  location: WidgetLocation.Manual,
  visibilityContext: WidgetVisibilityContext.Always,
  minVersion: ContractVersion.V270,
  // supportsDaoCreation: true,
  defaultValues: {
    address: '',
  },
  Editor,
  editAction,
}
