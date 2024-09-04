import { ArticleOutlined, ArticleRounded } from '@mui/icons-material'

import {
  ActionCategoryKey,
  ActionKey,
  Widget,
  WidgetId,
  WidgetLocation,
  WidgetVisibilityContext,
} from '@dao-dao/types'
import { mustGetSupportedChainConfig } from '@dao-dao/utils'

import { CreatePostAction } from './actions/CreatePost'
import { DeletePostAction } from './actions/DeletePost'
import { UpdatePostAction } from './actions/UpdatePost'
import { PressEditor as Editor } from './PressEditor'
import { Renderer } from './Renderer'
import { PressData } from './types'

export const PressWidget: Widget<PressData> = {
  id: WidgetId.Press,
  Icon: ArticleOutlined,
  IconFilled: ArticleRounded,
  location: WidgetLocation.Tab,
  visibilityContext: WidgetVisibilityContext.Always,
  Renderer,
  Editor,
  // Must have cw721 base to mint NFTs.
  isChainSupported: (chainId) =>
    (mustGetSupportedChainConfig(chainId).codeIds.Cw721Base ?? 0) > 0,
  getActions: (pressData) => ({
    actionMakers: [
      (options) => new CreatePostAction(options, pressData),
      (options) => new UpdatePostAction(options, pressData),
      (options) => new DeletePostAction(options, pressData),
    ],
    categoryMakers: [
      ({ t }) => ({
        key: ActionCategoryKey.Press,
        label: t('actionCategory.pressLabel'),
        description: t('actionCategory.pressDescription'),
        keywords: ['publish', 'article', 'news', 'announcement'],
        actionKeys: [
          ActionKey.CreatePost,
          ActionKey.UpdatePost,
          ActionKey.DeletePost,
        ],
      }),
    ],
  }),
}
