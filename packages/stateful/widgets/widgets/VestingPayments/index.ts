import { PaidOutlined } from '@mui/icons-material'

import {
  VestingPaymentsWidgetData,
  VestingPaymentsWidgetVersion,
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
  location: WidgetLocation.Tab,
  visibilityContext: WidgetVisibilityContext.Always,
  defaultValues: {
    factory: '',
    version: VestingPaymentsWidgetVersion.V1,
  },
  Renderer,
  Editor,
}
