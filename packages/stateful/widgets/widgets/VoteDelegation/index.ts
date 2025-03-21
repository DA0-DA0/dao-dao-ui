import { EscalatorWarningRounded } from '@mui/icons-material'

import {
  ActionCategoryKey,
  ActionKey,
  ContractVersion,
  VoteDelegationWidgetData,
  Widget,
  WidgetId,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'

import {
  UpdateDelegationConfigAction,
  defaultExtra,
} from './actions/UpdateDelegationConfig'
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
