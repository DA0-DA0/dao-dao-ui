import { PaidOutlined, PaidRounded } from '@mui/icons-material'

import {
  LATEST_VESTING_CONTRACT_VERSION,
  VestingPaymentsWidgetData,
  Widget,
  WidgetId,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'

import { Renderer } from './Renderer'
import { VestingPaymentsEditor as Editor } from './VestingPaymentsEditor'

export const VestingPaymentsWidget: Widget<VestingPaymentsWidgetData> = {
  id: WidgetId.VestingPayments,
  Icon: PaidOutlined,
  IconFilled: PaidRounded,
  location: WidgetLocation.Tab,
  visibilityContext: WidgetVisibilityContext.Always,
  defaultValues: {
    factories: {},
    version: LATEST_VESTING_CONTRACT_VERSION,
  },
  Renderer,
  Editor,
}
