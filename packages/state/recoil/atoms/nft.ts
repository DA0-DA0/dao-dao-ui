import { atom } from 'recoil'

import { NftCardInfo } from '@dao-dao/types'

// Cache NFT card info per key once loaded so they can be accessed anywhere
// after lazy load.
export const nftCardInfosForKeyAtom = atom<
  Record<string, NftCardInfo | undefined>
>({
  key: 'nftCardInfosForKey',
  default: {},
})
