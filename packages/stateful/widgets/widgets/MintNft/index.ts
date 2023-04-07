import { Widget, WidgetLocation, WidgetVisibilityContext } from '@dao-dao/types'

import { MintNftEditor as Editor } from './MintNftEditor'
import { MintNftRenderer as Renderer } from './MintNftRenderer'
import { MintNftData } from './types'

export const MintNftWidget: Widget<MintNftData> = {
  id: 'mint_nft',
  location: WidgetLocation.Home,
  visibilityContext: WidgetVisibilityContext.Always,
  defaultValues: {
    nftCollection: '',
    description: '',
    mint: {
      contract: '',
      msg: '{"mint":{}}',
      buttonLabel: 'Mint NFT',
    },
  },
  Renderer,
  Editor,
}
