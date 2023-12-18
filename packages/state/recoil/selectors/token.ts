import { selectorFamily, waitForAllSettled } from 'recoil'

import {
  Account,
  AmountWithTimestampAndDenom,
  ChainId,
  GenericToken,
  GenericTokenBalance,
  GenericTokenSource,
  GenericTokenWithUsdPrice,
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

import {
  denomMetadataSelector,
  ibcRpcClientForChainSelector,
  nativeBalanceSelector,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
} from './chain'
import { isDaoSelector } from './contract'
import { Cw20BaseSelectors, DaoCoreV2Selectors } from './contracts'
import {
  osmosisDenomForTokenSelector,
  osmosisUsdPriceSelector,
} from './osmosis'
import { skipAssetSelector } from './skip'
import { walletCw20BalancesSelector } from './wallet'

export const genericTokenSelector = selectorFamily<
  GenericToken,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'genericToken',
  get:
    ({ type, denomOrAddress, chainId }) =>
    ({ get }) => {
      const source = get(
        sourceChainAndDenomSelector({
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

export const usdPriceSelector = selectorFamily<
  AmountWithTimestampAndDenom | undefined,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'usdPrice',
  get:
    ({ type, denomOrAddress, chainId }) =>
    ({ get }) => {
      if (!MAINNET) {
        return undefined
      }

      const initialDenomOrAddress = denomOrAddress

      if (type === TokenType.Native) {
        // Try to resolve Osmosis denom.
        const osmosisDenom = get(
          osmosisDenomForTokenSelector({
            chainId,
            denom: denomOrAddress,
          })
        )

        // If found a denom, resolved Osmosis denom correctly.
        if (osmosisDenom) {
          chainId = ChainId.OsmosisMainnet
          denomOrAddress = osmosisDenom
        }
      }

      switch (chainId) {
        case ChainId.OsmosisMainnet: {
          let price = get(osmosisUsdPriceSelector(denomOrAddress))

          // If started as different denom and was resolved to an Osmosis denom,
          // return original denom.
          if (price && price.denom !== initialDenomOrAddress) {
            price = {
              ...price,
              denom: initialDenomOrAddress,
            }
          }

          return price
        }
      }
    },
})

export const genericTokenWithUsdPriceSelector = selectorFamily<
  GenericTokenWithUsdPrice,
  WithChainId<Pick<GenericToken, 'type' | 'denomOrAddress'>>
>({
  key: 'genericTokenWithUsdPrice',
  get:
    (params) =>
    async ({ get }) => {
      const token = get(genericTokenSelector(params))

      // Don't calculate price if could not load token decimals correctly.
      const { amount: usdPrice, timestamp } =
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
    walletAddress: string
  }>
>({
  key: 'genericTokenDelegatedBalance',
  get:
    ({ walletAddress, chainId }) =>
    async ({ get }) => {
      const { denom, amount: balance } = get(
        nativeDelegatedBalanceSelector({
          chainId,
          address: walletAddress,
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
      }
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
        symbol: displayDenom.denom,
        decimals: displayDenom.exponent,
      }
    },
})

// Resolve a denom on a chain to its source chain and base denom. If an IBC
// asset, tries to reverse engineer IBC denom. Otherwise returns the arguments.
export const sourceChainAndDenomSelector = selectorFamily<
  GenericTokenSource,
  Pick<GenericToken, 'chainId' | 'type' | 'denomOrAddress'>
>({
  key: 'sourceChainAndDenom',
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
