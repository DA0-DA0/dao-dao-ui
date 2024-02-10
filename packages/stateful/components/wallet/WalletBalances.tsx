import { ComponentType } from 'react'
import { waitForAny } from 'recoil'

import {
  WalletBalances as StatelessWalletBalances,
  useCachedLoading,
  useCachedLoadingWithError,
  useChain,
} from '@dao-dao/stateless'
import {
  LazyNftCardInfo,
  LoadingData,
  LoadingDataWithError,
  TokenCardInfo,
} from '@dao-dao/types'
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
}

export const WalletBalances = ({
  address,
  hexPublicKey,
  NftCard,
  editable,
}: WalletBalancesProps) => {
  const { chain_id: chainId } = useChain()

  const tokensWithoutLazyInfo = useCachedLoadingWithError(
    address
      ? walletTokenCardInfosSelector({
          chainId,
          walletAddress: address,
        })
      : undefined
  )

  // Load separately so they cache separately.
  const tokenLazyInfos = useCachedLoadingWithError(
    !tokensWithoutLazyInfo.loading && !tokensWithoutLazyInfo.errored && address
      ? waitForAny(
          tokensWithoutLazyInfo.data.map(({ token, unstakedBalance }) =>
            tokenCardLazyInfoSelector({
              owner: address,
              token,
              unstakedBalance,
            })
          )
        )
      : undefined
  )

  const tokens: LoadingDataWithError<TokenCardInfo[]> =
    tokensWithoutLazyInfo.loading || tokensWithoutLazyInfo.errored
      ? tokensWithoutLazyInfo
      : {
          loading: false,
          errored: false,
          updating:
            tokensWithoutLazyInfo.updating ||
            (!tokenLazyInfos.loading &&
              !tokenLazyInfos.errored &&
              tokenLazyInfos.updating),
          data: tokensWithoutLazyInfo.data.map(
            (token, i): TokenCardInfo => ({
              ...token,
              lazyInfo:
                tokenLazyInfos.loading ||
                tokenLazyInfos.errored ||
                tokensWithoutLazyInfo.data.length !== tokenLazyInfos.data.length
                  ? { loading: true }
                  : loadableToLoadingData(tokenLazyInfos.data[i], {
                      usdUnitPrice: undefined,
                      stakingInfo: undefined,
                      totalBalance: token.unstakedBalance,
                    }),
            })
          ),
        }

  const nfts = useCachedLoadingWithError(
    address
      ? allWalletNftsSelector([
          {
            chainId,
            walletAddress: address,
          },
        ])
      : undefined
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
