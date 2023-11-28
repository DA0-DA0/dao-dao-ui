import { ComponentType } from 'react'

import { Account } from '../account'
import { LazyNftCardInfo } from '../nft'
import { TokenCardInfo } from '../token'
import { LoadingData } from './common'
import { TreasuryHistoryGraphProps } from './TreasuryHistoryGraph'
import { ValenceAccountTreasuryProps } from './ValenceAccountTreasury'

export type WalletBalancesProps<
  T extends TokenCardInfo,
  N extends LazyNftCardInfo
> = {
  accounts: Account[]
  tokens: LoadingData<T[]>
  // List of token denomOrAddress fields that should be hidden.
  hiddenTokens: LoadingData<string[]>
  TokenLine: ComponentType<T>
  nfts: LoadingData<N[]>
  NftCard: ComponentType<N>
  TreasuryHistoryGraph: ComponentType<TreasuryHistoryGraphProps>
} & Pick<
  ValenceAccountTreasuryProps<T>,
  'ButtonLink' | 'IconButtonLink' | 'configureRebalancerHref'
>
