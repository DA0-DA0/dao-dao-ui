import { PaidOutlined } from '@mui/icons-material'

import { Widget, WidgetLocation, WidgetVisibilityContext } from '@dao-dao/types'

import { Renderer } from './Renderer'
import { RetroactiveCompensationEditor as Editor } from './RetroactiveCompensationEditor'

export const RetroactiveCompensationWidget: Widget = {
  id: 'retroactive',
  Icon: PaidOutlined,
  location: WidgetLocation.Tab,
  visibilityContext: WidgetVisibilityContext.Always,
  Renderer,
  Editor,
}
