import { ComponentType } from 'react'
import { constSelector, useRecoilValue, waitForAllSettled } from 'recoil'

import { accountsSelector } from '@dao-dao/state/recoil'
import {
  WalletBalances as StatelessWalletBalances,
  useCachedLoading,
} from '@dao-dao/stateless'
import {
  ActionKey,
  LazyNftCardInfo,
  LoadingData,
  TokenCardInfo,
} from '@dao-dao/types'
import {
  getConfiguredChains,
  getMeTxPrefillPath,
  loadableToLoadingData,
  transformBech32Address,
} from '@dao-dao/utils'

import { useActionForKey } from '../../actions'
import {
  allWalletNftsSelector,
  hiddenBalancesSelector,
  tokenCardLazyInfoSelector,
  walletTokenCardInfosSelector,
} from '../../recoil'
import { ButtonLink } from '../ButtonLink'
import { IconButtonLink } from '../IconButtonLink'
import { TreasuryHistoryGraph } from '../TreasuryHistoryGraph'
import { WalletTokenLine } from './WalletTokenLine'
import { WalletTokenLineReadonly } from './WalletTokenLineReadonly'

export type WalletBalancesProps = {
  address: string | undefined
  hexPublicKey: LoadingData<string>
  NftCard: ComponentType<LazyNftCardInfo>
  // If true, use token card that has edit actions.
  editable: boolean
} & (
  | {
      chainId: string
      chainMode: 'current'
    }
  | {
      chainId?: never
      chainMode: 'all'
    }
)

export const WalletBalances = ({
  address,
  hexPublicKey,
  NftCard,
  editable,
  ...chainModeAndId
}: WalletBalancesProps) => {
  const accounts =
    useRecoilValue(
      address
        ? waitForAllSettled(
            chainModeAndId.chainMode === 'current'
              ? [
                  accountsSelector({
                    chainId: chainModeAndId.chainId,
                    address,
                  }),
                ]
              : getConfiguredChains().map(({ chain }) =>
                  accountsSelector({
                    chainId: chain.chain_id,
                    address: transformBech32Address(address, chain.chain_id),
                  })
                )
          )
        : constSelector(undefined)
    )?.flatMap((loadable) => loadable.valueMaybe() || []) || []

  const tokensWithoutLazyInfo = useCachedLoading(
    address
      ? waitForAllSettled(
          chainModeAndId.chainMode === 'current'
            ? [
                walletTokenCardInfosSelector({
                  chainId: chainModeAndId.chainId,
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
          chainId:
            chainModeAndId.chainMode === 'current'
              ? chainModeAndId.chainId
              : undefined,
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

  const configureRebalancerActionDefaults = useActionForKey(
    ActionKey.ConfigureRebalancer
  )?.action.useDefaults()

  return (
    <StatelessWalletBalances
      ButtonLink={ButtonLink}
      IconButtonLink={IconButtonLink}
      NftCard={NftCard}
      TokenLine={editable ? WalletTokenLine : WalletTokenLineReadonly}
      TreasuryHistoryGraph={TreasuryHistoryGraph}
      accounts={accounts}
      configureRebalancerHref={
        editable && configureRebalancerActionDefaults
          ? getMeTxPrefillPath([
              {
                actionKey: ActionKey.ConfigureRebalancer,
                data: configureRebalancerActionDefaults,
              },
            ])
          : undefined
      }
      hiddenTokens={hiddenTokens}
      nfts={nfts}
      tokens={tokens}
    />
  )
}
