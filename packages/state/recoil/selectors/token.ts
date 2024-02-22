import {
  selectorFamily,
  waitForAll,
  waitForAllSettled,
  waitForAny,
} from 'recoil'

import {
  Account,
  AmountWithTimestamp,
  GenericToken,
  GenericTokenBalance,
  GenericTokenSource,
  GenericTokenWithUsdPrice,
  TokenPriceHistoryRange,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  MAINNET,
  getChainForChainId,
  getChainForChainName,
  getFallbackImage,
  getIbcTransferInfoFromChannel,
  getTokenForChainIdAndDenom,
  isValidTokenFactoryDenom,
  isValidWalletAddress,
} from '@dao-dao/utils'

import { astroportUsdPriceSelector } from './astroport'
import {
  denomMetadataSelector,
  ibcRpcClientForChainSelector,
  nativeBalanceSelector,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
  nativeDelegationInfoSelector,
} from './chain'
import { isDaoSelector } from './contract'
import { Cw20BaseSelectors, DaoCoreV2Selectors } from './contracts'
import { querySnapperSelector } from './indexer'
import { osmosisUsdPriceSelector } from './osmosis'
import { skipAssetSelector } from './skip'
import { walletCw20BalancesSelector } from './wallet'
import { whiteWhaleUsdPriceSelector } from './whale'

export const genericTokenSelector = selectorFamily<
  GenericToken,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'genericToken',
  get:
    ({ type, denomOrAddress, chainId }) =>
    ({ get }) => {
      const source = get(
        genericTokenSourceSelector({
          type,
          chainId,
          denomOrAddress,
        })
      )

      // Check if Skip API has the info.
      const skipAsset = get(
        skipAssetSelector({
          chainId,
          type,
          denomOrAddress,
        })
      )

      if (skipAsset) {
        return {
          chainId: skipAsset.chainID,
          type: skipAsset.isCW20 ? TokenType.Cw20 : TokenType.Native,
          denomOrAddress:
            (skipAsset.isCW20 && skipAsset.tokenContract) || skipAsset.denom,
          symbol:
            skipAsset.recommendedSymbol || skipAsset.symbol || skipAsset.denom,
          decimals: skipAsset.decimals || 0,
          imageUrl: skipAsset.logoURI || getFallbackImage(denomOrAddress),
          source,
        }
      } else if (source.chainId !== chainId) {
        // If Skip API does not have the info, check if Skip API has the source
        // if it's different. This has happened before when Skip does not have
        // an IBC asset that we were able to reverse engineer the source for.
        const skipSourceAsset = get(skipAssetSelector(source))

        if (skipSourceAsset) {
          return {
            chainId,
            type,
            denomOrAddress,
            symbol:
              skipSourceAsset.recommendedSymbol ||
              skipSourceAsset.symbol ||
              skipSourceAsset.denom,
            decimals: skipSourceAsset.decimals || 0,
            imageUrl:
              skipSourceAsset.logoURI || getFallbackImage(denomOrAddress),
            source,
          }
        }
      }

      let tokenInfo =
        type === TokenType.Cw20
          ? get(
              Cw20BaseSelectors.tokenInfoSelector({
                contractAddress: denomOrAddress,
                chainId,
                params: [],
              })
            )
          : // Native factory tokens.
          type === TokenType.Native &&
            isValidTokenFactoryDenom(
              denomOrAddress,
              getChainForChainId(chainId).bech32_prefix
            )
          ? get(
              nativeDenomMetadataInfoSelector({
                denom: denomOrAddress,
                chainId,
              })
            )
          : // Native token or invalid type.
            undefined

      // If native non-factory token, try to get the token from the asset list.
      if (!tokenInfo) {
        try {
          return {
            ...getTokenForChainIdAndDenom(chainId, denomOrAddress, false),
            source,
          }
        } catch {
          // If that fails, try to fetch from chain if not IBC asset.
          try {
            tokenInfo = denomOrAddress.startsWith('ibc/')
              ? undefined
              : get(
                  nativeDenomMetadataInfoSelector({
                    denom: denomOrAddress,
                    chainId,
                  })
                )
          } catch (err) {
            // If not an error, rethrow. This may be a promise, which is how
            // recoil waits for the `get` to resolve.
            if (!(err instanceof Error)) {
              throw err
            }
          }

          // If that fails, return placeholder token.
          if (!tokenInfo) {
            return {
              ...getTokenForChainIdAndDenom(chainId, denomOrAddress),
              source,
            }
          }
        }
      }

      const imageUrl =
        type === TokenType.Cw20
          ? get(
              Cw20BaseSelectors.logoUrlSelector({
                contractAddress: denomOrAddress,
                chainId,
              })
            )
          : getFallbackImage(denomOrAddress)

      return {
        chainId,
        type,
        denomOrAddress,
        symbol: tokenInfo.symbol,
        decimals: tokenInfo.decimals,
        imageUrl,
        source,
      }
    },
})

export const coinGeckoUsdPriceSelector = selectorFamily<
  GenericTokenWithUsdPrice | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'coinGeckoUsdPrice',
  get:
    (params) =>
    async ({ get }) => {
      if (!MAINNET) {
        return undefined
      }

      const token = get(genericTokenSelector(params))

      // Resolve Skip asset to retrieve coingecko ID.
      const asset = get(skipAssetSelector(params))
      if (!asset?.coingeckoID) {
        return
      }
      const usdPrice: number | undefined = get(
        querySnapperSelector({
          query: 'coingecko-price',
          parameters: {
            id: asset.coingeckoID,
          },
        })
      )

      return usdPrice !== undefined
        ? {
            token,
            usdPrice,
            timestamp: new Date(),
          }
        : undefined
    },
})

const priceSelectors = [
  coinGeckoUsdPriceSelector,
  osmosisUsdPriceSelector,
  astroportUsdPriceSelector,
  whiteWhaleUsdPriceSelector,
]

export const usdPriceSelector = selectorFamily<
  GenericTokenWithUsdPrice | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'usdPrice',
  get:
    (params) =>
    ({ get }) => {
      if (!MAINNET) {
        return
      }

      const selectors = priceSelectors.map((selector) => selector(params))

      // Load in parallel.
      const priceLoadables = get(waitForAny(selectors))
      // Get first loaded price.
      const anyPrice = priceLoadables
        .find((loadable) => loadable.valueMaybe())
        ?.valueMaybe()

      // If any price is loaded right away, use it.
      if (anyPrice) {
        return anyPrice
      }

      // If no price is loaded yet, wait for all to finish before returning
      // undefined from this selector. This forces the above to load which will
      // return the first one that is available.
      get(waitForAllSettled(selectors))
    },
})

export const genericTokenWithUsdPriceSelector = selectorFamily<
  GenericTokenWithUsdPrice,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'genericTokenWithUsdPrice',
  get:
    (params) =>
    async ({ get }) => {
      const token = get(genericTokenSelector(params))

      // Don't calculate price if could not load token decimals correctly.
      const { usdPrice, timestamp } =
        (token.decimals > 0 && get(usdPriceSelector(params))) || {}

      return {
        token,
        usdPrice,
        timestamp,
      }
    },
})

// Return all native and cw20 tokens for a given address. If this is a DAO, pass
// the core address and native chain ID and use the `account` filter to ensure
// cw20s are loaded.
export const genericTokenBalancesSelector = selectorFamily<
  GenericTokenBalance[],
  WithChainId<{
    address: string
    nativeGovernanceTokenDenom?: string
    cw20GovernanceTokenAddress?: string
    filter?: {
      // Only get balances for this token type.
      tokenType?: TokenType
      // Choose which account to get balances for.
      account?: Pick<Account, 'chainId' | 'address'>
    }
  }>
>({
  key: 'genericTokenBalances',
  get:
    ({
      chainId: mainChainId,
      address: mainAddress,
      nativeGovernanceTokenDenom,
      cw20GovernanceTokenAddress,
      filter,
    }) =>
    async ({ get }) => {
      const chainId = filter?.account?.chainId || mainChainId
      const address = filter?.account?.address || mainAddress

      const nativeTokenBalances =
        !filter?.tokenType || filter.tokenType === TokenType.Native
          ? get(
              nativeBalancesSelector({
                address,
                chainId,
              })
            )
          : []

      const cw20TokenBalances = (
        !filter?.tokenType || filter.tokenType === TokenType.Cw20
          ? get(
              // Neutron's modified DAOs do not support cw20s, so this may
              // error. Ignore if so.
              waitForAllSettled(
                // If is a DAO contract.
                get(
                  isDaoSelector({
                    address: mainAddress,
                    chainId: mainChainId,
                  })
                )
                  ? // Get native cw20s.
                    chainId === mainChainId && address === mainAddress
                    ? [
                        DaoCoreV2Selectors.nativeCw20TokensWithBalancesSelector(
                          {
                            chainId: mainChainId,
                            contractAddress: mainAddress,
                            governanceTokenAddress: cw20GovernanceTokenAddress,
                          }
                        ),
                      ]
                    : // Get polytone cw20s if they exist.
                    chainId !== mainChainId
                    ? [
                        DaoCoreV2Selectors.polytoneCw20TokensWithBalancesSelector(
                          {
                            chainId: mainChainId,
                            contractAddress: mainAddress,
                            polytoneChainId: chainId,
                          }
                        ),
                      ]
                    : []
                  : isValidWalletAddress(
                      address,
                      getChainForChainId(chainId).bech32_prefix
                    )
                  ? [
                      walletCw20BalancesSelector({
                        walletAddress: address,
                        chainId,
                      }),
                    ]
                  : []
              )
            )
          : []
      )[0]

      return [
        ...nativeTokenBalances.map((native) => ({
          ...native,
          isGovernanceToken:
            nativeGovernanceTokenDenom === native.token.denomOrAddress,
        })),
        ...(cw20TokenBalances?.state === 'hasValue'
          ? cw20TokenBalances.contents
          : []),
      ]
    },
})

export const genericTokenBalanceSelector = selectorFamily<
  GenericTokenBalance,
  Parameters<typeof genericTokenSelector>[0] & {
    address: string
  }
>({
  key: 'genericTokenBalance',
  get:
    ({ address, ...params }) =>
    async ({ get }) => {
      const token = get(genericTokenSelector(params))

      let balance = '0'
      if (token.type === TokenType.Native) {
        balance = get(
          nativeBalanceSelector({
            address,
            chainId: params.chainId,
          })
        ).amount
      } else if (token.type === TokenType.Cw20) {
        balance = get(
          Cw20BaseSelectors.balanceSelector({
            contractAddress: params.denomOrAddress,
            chainId: params.chainId,
            params: [
              {
                address,
              },
            ],
          })
        ).balance
      }

      return {
        token,
        balance,
      }
    },
})

export const genericTokenDelegatedBalanceSelector = selectorFamily<
  GenericTokenBalance,
  WithChainId<{
    address: string
  }>
>({
  key: 'genericTokenDelegatedBalance',
  get:
    ({ address, chainId }) =>
    async ({ get }) => {
      const { denom, amount: balance } = get(
        nativeDelegatedBalanceSelector({
          chainId,
          address,
        })
      )
      const token = get(
        genericTokenSelector({
          type: TokenType.Native,
          denomOrAddress: denom,
          chainId,
        })
      )

      return {
        token,
        balance,
        staked: true,
      }
    },
})

export const genericTokenUndelegatingBalancesSelector = selectorFamily<
  GenericTokenBalance[],
  WithChainId<{
    address: string
  }>
>({
  key: 'genericTokenUndelegatingBalances',
  get:
    (params) =>
    async ({ get }) => {
      const { unbondingDelegations } = get(nativeDelegationInfoSelector(params))

      const tokens = get(
        waitForAll(
          unbondingDelegations.map(({ balance }) =>
            genericTokenSelector({
              type: TokenType.Native,
              denomOrAddress: balance.denom,
              chainId: params.chainId,
            })
          )
        )
      )

      const tokenBalances = tokens.map(
        (token, index): GenericTokenBalance => ({
          token,
          balance: unbondingDelegations[index].balance.amount,
        })
      )

      const uniqueTokens = tokenBalances.reduce((acc, { token, balance }) => {
        let existing = acc.find(
          (t) => t.token.denomOrAddress === token.denomOrAddress
        )
        if (!existing) {
          existing = {
            token,
            balance,
            unstaking: true,
          }
          acc.push(existing)
        }
        existing.balance = (
          BigInt(existing.balance) + BigInt(balance)
        ).toString()

        return acc
      }, [] as GenericTokenBalance[])

      return uniqueTokens
    },
})

export const nativeDenomMetadataInfoSelector = selectorFamily<
  | {
      symbol: string
      decimals: number
    }
  | undefined,
  WithChainId<{ denom: string }>
>({
  key: 'nativeDenomMetadataInfo',
  get:
    (params) =>
    async ({ get }) => {
      const metadata = get(denomMetadataSelector(params))
      if (!metadata) {
        return
      }

      const { base, denomUnits, symbol, display } = metadata

      // If display is equal to the base, use the symbol denom unit if
      // available. This fixes the case where display was not updated even
      // though a nonzero exponent was created.
      const searchDenom = display === base ? symbol : display

      const displayDenom =
        denomUnits.find(({ denom }) => denom === searchDenom) ??
        denomUnits.find(({ denom }) => denom === display) ??
        denomUnits.find(({ exponent }) => exponent > 0) ??
        denomUnits[0]

      if (!displayDenom) {
        throw new Error('No denom unit found for token factory denom')
      }

      return {
        // If factory denom, extract symbol at the end.
        symbol: displayDenom.denom.startsWith('factory/')
          ? displayDenom.denom.split('/').pop()!
          : displayDenom.denom,
        decimals: displayDenom.exponent,
      }
    },
})

// Resolve a denom on a chain to its source chain and base denom. If an IBC
// asset, tries to reverse engineer IBC denom. Otherwise returns the arguments.
export const genericTokenSourceSelector = selectorFamily<
  GenericTokenSource,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'genericTokenSource',
  get:
    ({ chainId, type, denomOrAddress }) =>
    async ({ get }) => {
      // Check if Skip API has the info.
      const skipAsset = get(
        skipAssetSelector({
          chainId,
          type,
          denomOrAddress,
        })
      )

      if (skipAsset) {
        const sourceType = skipAsset.originDenom.startsWith('cw20:')
          ? TokenType.Cw20
          : TokenType.Native
        return {
          chainId: skipAsset.originChainID,
          type: sourceType,
          denomOrAddress:
            sourceType === TokenType.Cw20
              ? skipAsset.originDenom.replace(/^cw20:/, '')
              : skipAsset.originDenom,
        }
      }

      let sourceChainId = chainId
      let sourceDenom =
        (type === TokenType.Cw20 ? 'cw20:' : '') + denomOrAddress

      // Try to reverse engineer IBC denom.
      if (denomOrAddress.startsWith('ibc/')) {
        const ibc = get(ibcRpcClientForChainSelector(chainId))

        try {
          const { denomTrace } = await ibc.applications.transfer.v1.denomTrace({
            hash: denomOrAddress,
          })

          // If trace exists, resolve IBC denom.
          if (denomTrace) {
            let channels = denomTrace.path.split('transfer/').slice(1)
            // Trim trailing slash from all but last channel.
            channels = channels.map((channel, index) =>
              index === channels.length - 1 ? channel : channel.slice(0, -1)
            )
            if (channels.length) {
              // Retrace channel paths to find source chain of denom.
              sourceChainId = channels.reduce(
                (currentChainId, channel) =>
                  getChainForChainName(
                    getIbcTransferInfoFromChannel(currentChainId, channel)
                      .destinationChain.chain_name
                  ).chain_id,
                chainId
              )

              sourceDenom = denomTrace.baseDenom
            }
          }
        } catch (err) {
          console.error(err)
          // Ignore resolution error.
        }
      }

      const sourceType = sourceDenom.startsWith('cw20:')
        ? TokenType.Cw20
        : TokenType.Native

      return {
        chainId: sourceChainId,
        type: sourceType,
        denomOrAddress:
          sourceType === TokenType.Cw20
            ? sourceDenom.replace(/^cw20:/, '')
            : sourceDenom,
      }
    },
})

export const historicalUsdPriceSelector = selectorFamily<
  AmountWithTimestamp[] | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'> & {
    range: TokenPriceHistoryRange
  }
>({
  key: 'historicalUsdPrice',
  get:
    ({ chainId, type, denomOrAddress, range }) =>
    async ({ get }) => {
      if (!MAINNET) {
        return undefined
      }

      // Resolve Skip asset to retrieve coingecko ID.
      const asset = get(
        skipAssetSelector({
          type,
          chainId,
          denomOrAddress,
        })
      )

      if (!asset?.coingeckoID) {
        return
      }

      try {
        const prices: [number, number][] = get(
          querySnapperSelector({
            query: 'coingecko-price-history',
            parameters: {
              id: asset.coingeckoID,
              range,
            },
          })
        )

        return prices.map(([timestamp, amount]) => ({
          timestamp: new Date(timestamp),
          amount,
        }))
      } catch (err) {
        // recoil's `get` throws a promise while loading
        if (err instanceof Promise) {
          throw err
        }

        return undefined
      }
    },
})
