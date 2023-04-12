import { ArticleOutlined } from '@mui/icons-material'

import {
  ActionCategoryKey,
  Widget,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'

import { makeCreatePostActionMaker } from './actions/CreatePost'
import { PressEditor as Editor } from './PressEditor'
import { Renderer } from './Renderer'
import { PressData } from './types'

export const PressWidget: Widget<PressData> = {
  id: 'press',
  Icon: ArticleOutlined,
  location: WidgetLocation.Tab,
  visibilityContext: WidgetVisibilityContext.Always,
  Renderer,
  Editor,
  getActionCategoryMakers: (data) => [
    ({ t }) => ({
      key: ActionCategoryKey.Press,
      label: t('actionCategory.pressLabel'),
      description: t('actionCategory.pressDescription'),
      keywords: ['post'],
      actionMakers: [makeCreatePostActionMaker(data)],
    }),
  ],
}
