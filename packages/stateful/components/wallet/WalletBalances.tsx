import { ComponentType } from 'react'
import { waitForAllSettled } from 'recoil'

import {
  WalletBalances as StatelessWalletBalances,
  useCachedLoading,
} from '@dao-dao/stateless'
import { LazyNftCardInfo, LoadingData, TokenCardInfo } from '@dao-dao/types'
import {
  getConfiguredChains,
  loadableToLoadingData,
  transformBech32Address,
} from '@dao-dao/utils'

import {
  allWalletNftsSelector,
  hiddenBalancesSelector,
  tokenCardLazyInfoSelector,
  walletTokenCardInfosSelector,
} from '../../recoil'
import { WalletTokenLine } from './WalletTokenLine'
import { WalletTokenLineReadonly } from './WalletTokenLineReadonly'

export type WalletBalancesProps = {
  chainId: string
  address: string | undefined
  hexPublicKey: LoadingData<string>
  NftCard: ComponentType<LazyNftCardInfo>
  // If true, use token card that has edit actions.
  editable: boolean
  // Whether to show only the current chain's tokens or all supported chains'.
  chainMode: 'current' | 'all'
}

export const WalletBalances = ({
  chainId,
  address,
  hexPublicKey,
  NftCard,
  editable,
  chainMode,
}: WalletBalancesProps) => {
  const tokensWithoutLazyInfo = useCachedLoading(
    address
      ? waitForAllSettled(
          chainMode === 'current'
            ? [
                walletTokenCardInfosSelector({
                  chainId,
                  walletAddress: address,
                }),
              ]
            : getConfiguredChains().map(({ chain }) =>
                walletTokenCardInfosSelector({
                  chainId: chain.chain_id,
                  walletAddress: transformBech32Address(
                    address,
                    chain.chain_id
                  ),
                })
              )
        )
      : undefined,
    []
  )

  const flattenedTokensWithoutLazyInfo = tokensWithoutLazyInfo.loading
    ? []
    : tokensWithoutLazyInfo.data.flatMap((loadable) =>
        loadable.state === 'hasValue' ? loadable.contents : []
      )

  // Load separately so they cache separately.
  const tokenLazyInfos = useCachedLoading(
    !tokensWithoutLazyInfo.loading && address
      ? waitForAllSettled(
          flattenedTokensWithoutLazyInfo.map(({ token, unstakedBalance }) =>
            tokenCardLazyInfoSelector({
              owner: transformBech32Address(address, token.chainId),
              token,
              unstakedBalance,
            })
          )
        )
      : undefined,
    []
  )

  const tokens: LoadingData<TokenCardInfo[]> =
    tokensWithoutLazyInfo.loading ||
    tokenLazyInfos.loading ||
    flattenedTokensWithoutLazyInfo.length !== tokenLazyInfos.data.length
      ? {
          loading: true,
        }
      : {
          loading: false,
          data: flattenedTokensWithoutLazyInfo.map((token, i) => ({
            ...token,
            lazyInfo: loadableToLoadingData(tokenLazyInfos.data[i], {
              usdUnitPrice: undefined,
              stakingInfo: undefined,
              totalBalance: token.unstakedBalance,
            }),
          })),
        }

  const nfts = useCachedLoading(
    address
      ? allWalletNftsSelector({
          walletAddress: address,
          chainId: chainMode === 'current' ? chainId : undefined,
        })
      : undefined,
    []
  )

  const hiddenTokens = useCachedLoading(
    !hexPublicKey.loading
      ? hiddenBalancesSelector(hexPublicKey.data)
      : undefined,
    []
  )

  return (
    <StatelessWalletBalances
      NftCard={NftCard}
      TokenLine={editable ? WalletTokenLine : WalletTokenLineReadonly}
      hiddenTokens={hiddenTokens}
      nfts={nfts}
      tokens={tokens}
    />
  )
}
