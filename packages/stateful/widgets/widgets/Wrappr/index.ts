import { ArticleOutlined } from '@mui/icons-material'

import {
  ActionCategoryKey,
  Widget,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'

import { makeCreateWrapprActionMaker } from './actions/CreateWrappr'
import { makeDeleteWrapprActionMaker } from './actions/DeleteWrappr'
import { makeManageWrapprActionMaker } from './actions/ManageWrappr'
import { WRAPPR_WIDGET_ID } from './constants'
import { WrapprEditor as Editor } from './WrapprEditor'
import { Renderer } from './Renderer'
import { WrapprData } from './types'

export const WrapprWidget: Widget<WrapprData> = {
  id: WRAPPR_WIDGET_ID,
  Icon: ArticleOutlined,
  location: WidgetLocation.Tab,
  visibilityContext: WidgetVisibilityContext.Always,
  Renderer,
  Editor,
  getActionCategoryMakers: (data) => {
    // Make makers in outer function so they're not remade on every render.
    const actionMakers = [
      makeCreateWrapprActionMaker(data),
      makeManageWrapprActionMaker(data),
      makeDeleteWrapprActionMaker(data),
    ]

    return [
      ({ t }) => ({
        key: ActionCategoryKey.Wrappr,
        label: t('actionCategory.wrapprLabel'),
        description: t('actionCategory.wrapprDescription'),
        keywords: ['publish', 'article', 'news', 'announcement'],
        actionMakers,
      }),
    ]
  },
}
