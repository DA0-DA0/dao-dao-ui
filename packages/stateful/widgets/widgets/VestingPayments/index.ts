import { PaidOutlined } from '@mui/icons-material'

import {
  ActionCategoryKey,
  Widget,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'

import { makeManageVestingActionMaker } from './actions/ManageVesting'
import { VESTING_PAYMENTS_WIDGET_ID } from './constants'
import { Renderer } from './Renderer'
import { VestingPaymentsData, VestingPaymentsWidgetVersion } from './types'
import { VestingPaymentsEditor as Editor } from './VestingPaymentsEditor'

export const VestingPaymentsWidget: Widget<VestingPaymentsData> = {
  id: VESTING_PAYMENTS_WIDGET_ID,
  Icon: PaidOutlined,
  location: WidgetLocation.Tab,
  visibilityContext: WidgetVisibilityContext.Always,
  defaultValues: {
    factory: '',
    version: VestingPaymentsWidgetVersion.V1,
  },
  Renderer,
  Editor,
  getActionCategoryMakers: (data) => {
    // Make makers in outer function so they're not remade on every render.
    const actionMakers = [makeManageVestingActionMaker(data)]

    return [
      () => ({
        // Add to Treasury category.
        key: ActionCategoryKey.Treasury,
        actionMakers,
      }),
    ]
  },
}
