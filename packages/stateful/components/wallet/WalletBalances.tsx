import { ComponentType } from 'react'
import { waitForAllSettled } from 'recoil'

import {
  WalletBalances as StatelessWalletBalances,
  useCachedLoading,
  useChain,
} from '@dao-dao/stateless'
import { LazyNftCardInfo, LoadingData, TokenCardInfo } from '@dao-dao/types'
import { loadableToLoadingData } from '@dao-dao/utils'

import {
  allWalletNftsSelector,
  hiddenBalancesSelector,
  tokenCardLazyInfoSelector,
  walletTokenCardInfosSelector,
} from '../../recoil'
import { WalletTokenLine } from './WalletTokenLine'
import { WalletTokenLineReadonly } from './WalletTokenLineReadonly'

export type WalletBalancesProps = {
  address: string | undefined
  hexPublicKey: LoadingData<string>
  NftCard: ComponentType<LazyNftCardInfo>
  // If true, use token card that has edit actions.
  editable: boolean
  // If defined, show on mobile.
  MobileChainSwitcher?: ComponentType<any>
}

export const WalletBalances = ({
  address,
  hexPublicKey,
  NftCard,
  editable,
  MobileChainSwitcher,
}: WalletBalancesProps) => {
  const { chain_id: chainId } = useChain()

  const tokensWithoutLazyInfo = useCachedLoading(
    address
      ? walletTokenCardInfosSelector({
          chainId,
          walletAddress: address,
        })
      : undefined,
    []
  )

  const flattenedTokensWithoutLazyInfo = tokensWithoutLazyInfo.loading
    ? []
    : tokensWithoutLazyInfo.data

  // Load separately so they cache separately.
  const tokenLazyInfos = useCachedLoading(
    !tokensWithoutLazyInfo.loading && address
      ? waitForAllSettled(
          flattenedTokensWithoutLazyInfo.map(({ token, unstakedBalance }) =>
            tokenCardLazyInfoSelector({
              owner: address,
              token,
              unstakedBalance,
            })
          )
        )
      : undefined,
    []
  )

  const tokens: LoadingData<TokenCardInfo[]> =
    tokensWithoutLazyInfo.loading || tokenLazyInfos.loading
      ? {
          loading: true,
        }
      : {
          loading: false,
          data: flattenedTokensWithoutLazyInfo.map((token, i) => ({
            ...token,
            lazyInfo:
              tokenLazyInfos.loading ||
              flattenedTokensWithoutLazyInfo.length !==
                tokenLazyInfos.data.length
                ? { loading: true }
                : loadableToLoadingData(tokenLazyInfos.data[i], {
                    usdUnitPrice: undefined,
                    stakingInfo: undefined,
                    totalBalance: token.unstakedBalance,
                  }),
          })),
        }

  const nfts = useCachedLoading(
    address
      ? allWalletNftsSelector([
          {
            chainId,
            walletAddress: address,
          },
        ])
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
      MobileChainSwitcher={MobileChainSwitcher}
      NftCard={NftCard}
      TokenLine={editable ? WalletTokenLine : WalletTokenLineReadonly}
      hiddenTokens={hiddenTokens}
      nfts={nfts}
      tokens={tokens}
    />
  )
}
