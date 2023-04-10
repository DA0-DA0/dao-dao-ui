import { PaidOutlined } from '@mui/icons-material'

import {
  ActionCategoryKey,
  Widget,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'

import { makeManageVestingActionMaker } from './actions/ManageVesting'
import { Renderer } from './Renderer'
import { VestingPaymentsData } from './types'
import { VestingPaymentsEditor as Editor } from './VestingPaymentsEditor'

export const VestingPaymentsWidget: Widget<VestingPaymentsData> = {
  id: 'vesting',
  Icon: PaidOutlined,
  location: WidgetLocation.Tab,
  visibilityContext: WidgetVisibilityContext.Always,
  Renderer,
  Editor,
  getActionCategoryMakers: (data) => [
    () => ({
      // Add to Treasury category.
      key: ActionCategoryKey.Treasury,
      actionMakers: [makeManageVestingActionMaker(data)],
    }),
  ],
}
