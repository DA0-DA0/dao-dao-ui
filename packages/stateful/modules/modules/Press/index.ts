import { ArticleOutlined, ArticleRounded } from '@mui/icons-material'

import {
  ActionCategoryKey,
  ActionKey,
  Module,
  ModuleDisplayLocation,
  ModuleId,
  ModuleType,
  ModuleVisibilityContext,
} from '@dao-dao/types'
import { mustGetSupportedChainConfig } from '@dao-dao/utils'

import { CreatePostAction } from './actions/CreatePost'
import { DeletePostAction } from './actions/DeletePost'
import { UpdatePostAction } from './actions/UpdatePost'
import { PressEditor as Editor } from './PressEditor'
import { Renderer } from './Renderer'
import { PressData } from './types'

export const PressModule: Module<PressData> = {
  id: ModuleId.Press,
  type: ModuleType.External,
  title: 'Press',
  description: "Publish posts to your DAO's press page.",
  Icon: ArticleOutlined,
  IconFilled: ArticleRounded,
  location: ModuleDisplayLocation.Tab,
  visibilityContext: ModuleVisibilityContext.Always,
  supportsDaoCreation: true,
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
