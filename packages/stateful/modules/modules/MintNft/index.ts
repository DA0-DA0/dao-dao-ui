import { ImageOutlined, ImageRounded } from '@mui/icons-material'

import {
  Module,
  ModuleDisplayLocation,
  ModuleId,
  ModuleType,
  ModuleVisibilityContext,
} from '@dao-dao/types'

import { MintNftEditor as Editor } from './MintNftEditor'
import { MintNftRenderer as Renderer } from './MintNftRenderer'
import { MintNftData } from './types'

export const MintNftModule: Module<MintNftData> = {
  id: ModuleId.MintNft,
  type: ModuleType.External,
  title: 'Mint NFT',
  description: 'Display an NFT collection with a button to mint new NFTs.',
  Icon: ImageOutlined,
  IconFilled: ImageRounded,
  location: ModuleDisplayLocation.Home,
  visibilityContext: ModuleVisibilityContext.Always,
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
