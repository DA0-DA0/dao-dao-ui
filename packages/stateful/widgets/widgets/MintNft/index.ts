import { Widget } from '@dao-dao/types'

import { MintNftComponent } from './MintNftComponent'
import { MintNftData } from './types'

export const MintNftWidget: Widget<MintNftData> = {
  id: 'mint_nft',
  defaultValues: {
    nftCollection: '',
    description: '',
    mint: {
      contract: '',
      msg: '{"mint":{}}',
      buttonLabel: 'Mint NFT',
    },
  },
  Component: MintNftComponent,
}
