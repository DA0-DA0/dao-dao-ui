import { PaidOutlined } from '@mui/icons-material'

import {
  Widget,
  WidgetId,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'

import { Renderer } from './Renderer'

export const RetroactiveCompensationWidget: Widget = {
  id: WidgetId.RetroactiveCompensation,
  Icon: PaidOutlined,
  location: WidgetLocation.Tab,
  visibilityContext: WidgetVisibilityContext.Always,
  Renderer,
}
