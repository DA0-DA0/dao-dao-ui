import { PaidOutlined } from '@mui/icons-material'

import { Widget, WidgetLocation, WidgetVisibilityContext } from '@dao-dao/types'

import { RETROACTIVE_COMPENSATION_WIDGET_ID } from './constants'
import { Renderer } from './Renderer'

export const RetroactiveCompensationWidget: Widget = {
  id: RETROACTIVE_COMPENSATION_WIDGET_ID,
  Icon: PaidOutlined,
  location: WidgetLocation.Tab,
  visibilityContext: WidgetVisibilityContext.Always,
  Renderer,
}
