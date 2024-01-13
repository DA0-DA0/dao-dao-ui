import { ArticleOutlined } from '@mui/icons-material'

import {
  ActionCategoryKey,
  Widget,
  WidgetId,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'

import { makeCreatePostActionMaker } from './actions/CreatePost'
import { makeDeletePostActionMaker } from './actions/DeletePost'
import { makeUpdatePostActionMaker } from './actions/UpdatePost'
import { PressEditor as Editor } from './PressEditor'
import { Renderer } from './Renderer'
import { PressData } from './types'

export const PressWidget: Widget<PressData> = {
  id: WidgetId.Press,
  Icon: ArticleOutlined,
  location: WidgetLocation.Tab,
  visibilityContext: WidgetVisibilityContext.Always,
  Renderer,
  Editor,
  getActionCategoryMakers: (data) => {
    // Make makers in outer function so they're not remade on every render.
    const actionMakers = [
      makeCreatePostActionMaker(data),
      makeUpdatePostActionMaker(data),
      makeDeletePostActionMaker(data),
    ]

    return [
      ({ t }) => ({
        key: ActionCategoryKey.Press,
        label: t('actionCategory.pressLabel'),
        description: t('actionCategory.pressDescription'),
        keywords: ['publish', 'article', 'news', 'announcement'],
        actionMakers,
      }),
    ]
  },
}
