import { ComponentType } from 'react'

import { LazyNftCardInfo } from '../nft'
import { TokenCardInfo } from '../token'
import { LoadingData } from './common'

export type WalletBalancesProps<
  T extends TokenCardInfo,
  N extends LazyNftCardInfo
> = {
  tokens: LoadingData<T[]>
  // List of token denomOrAddress fields that should be hidden.
  hiddenTokens: LoadingData<string[]>
  TokenLine: ComponentType<T>
  nfts: LoadingData<N[]>
  NftCard: ComponentType<N>
}
