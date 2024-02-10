import { ComponentType } from 'react'

import { LoadingData, LoadingDataWithError } from '../misc'
import { LazyNftCardInfo } from '../nft'
import { TokenCardInfo } from '../token'

export type WalletBalancesProps<
  T extends TokenCardInfo,
  N extends LazyNftCardInfo
> = {
  tokens: LoadingDataWithError<T[]>
  // List of token denomOrAddress fields that should be hidden.
  hiddenTokens: LoadingData<string[]>
  TokenLine: ComponentType<T>
  nfts: LoadingDataWithError<N[]>
  NftCard: ComponentType<N>
}
