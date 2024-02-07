import { HistoryOutlined, HistoryRounded } from '@mui/icons-material'

import {
  Widget,
  WidgetId,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'

import { Renderer } from './Renderer'

export const RetroactiveCompensationWidget: Widget = {
  id: WidgetId.RetroactiveCompensation,
  Icon: HistoryOutlined,
  IconFilled: HistoryRounded,
  location: WidgetLocation.Tab,
  visibilityContext: WidgetVisibilityContext.Always,
  Renderer,
}
