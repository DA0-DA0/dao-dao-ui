import { selectorFamily, waitForAll } from 'recoil'

import {
  AmountWithTimestampAndDenom,
  ChainId,
  GenericToken,
  GenericTokenBalance,
  GenericTokenWithUsdPrice,
  TokenType,
  WithChainId,
} from '@dao-dao/types'
import {
  MAINNET,
  getChainForChainId,
  getChainForChainName,
  getFallbackImage,
  getIbcTransferInfoBetweenChains,
  getIbcTransferInfoFromChainSource,
  getTokenForChainIdAndDenom,
  isValidContractAddress,
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
import { isContractSelector } from './contract'
import { Cw20BaseSelectors, DaoCoreV2Selectors } from './contracts'
import { osmosisUsdPriceSelector } from './osmosis'
import { walletCw20BalancesSelector } from './wallet'
import { wyndUsdPriceSelector } from './wynd'

export const genericTokenSelector = selectorFamily<
  GenericToken,
  WithChainId<Pick<GenericToken, 'type' | 'denomOrAddress'>>
>({
  key: 'genericToken',
  get:
    ({ type, denomOrAddress, chainId }) =>
    ({ get }) => {
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
          return getTokenForChainIdAndDenom(chainId, denomOrAddress, false)
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
            return getTokenForChainIdAndDenom(chainId, denomOrAddress)
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
    async ({ get }) => {
      if (!MAINNET) {
        return undefined
      }

      // Try to reverse engineer denom and get the osmosis price.
      try {
        if (type === TokenType.Native) {
          const ibc = get(ibcRpcClientForChainSelector(chainId))
          const trace = denomOrAddress.startsWith('ibc/')
            ? (
                await ibc.applications.transfer.v1.denomTrace({
                  hash: denomOrAddress,
                })
              ).denomTrace
            : undefined

          let sourceChainId = chainId
          let baseDenom = denomOrAddress

          // If trace exists, resolve IBC denom and then get its Osmosis IBC
          // denom to find its price.
          if (trace) {
            let channels = trace.path.split('transfer/').slice(1)
            // Trim trailing slash from all but last channel.
            channels = channels.map((channel, index) =>
              index === channels.length - 1 ? channel : channel.slice(0, -1)
            )
            if (channels.length) {
              // Retrace channel paths to find source chain of denom.
              sourceChainId = channels.reduce(
                (currentChainId, channel) =>
                  getChainForChainName(
                    getIbcTransferInfoFromChainSource(currentChainId, channel)
                      .destinationChain.chain_name
                  ).chain_id,
                chainId
              )
              baseDenom = trace.baseDenom
            }
          }

          // If source chain is Osmosis, the denom is the base denom.
          if (sourceChainId === ChainId.OsmosisMainnet) {
            chainId = ChainId.OsmosisMainnet
            denomOrAddress = baseDenom
          } else {
            // Otherwise get the Osmosis IBC denom.
            const osmosisIbc = get(
              ibcRpcClientForChainSelector(ChainId.OsmosisMainnet)
            )
            const { sourceChannel } = getIbcTransferInfoBetweenChains(
              ChainId.OsmosisMainnet,
              sourceChainId
            )
            const { hash: osmosisDenomIbcHash } =
              await osmosisIbc.applications.transfer.v1.denomHash({
                trace: `transfer/${sourceChannel}/${baseDenom}`,
              })

            chainId = ChainId.OsmosisMainnet
            denomOrAddress = 'ibc/' + osmosisDenomIbcHash
          }
        }
      } catch (err) {
        // If not error, rethrow. This may be a promise, which is how
        // recoil waits for the `get` to resolve.
        if (!(err instanceof Error)) {
          throw err
        }

        // On failure, do nothing.
      }

      switch (chainId) {
        case ChainId.OsmosisMainnet:
          return get(osmosisUsdPriceSelector(denomOrAddress))
        // On Juno, use WYND DEX as backup. Likely for CW20s.
        case ChainId.JunoMainnet:
          return get(wyndUsdPriceSelector(denomOrAddress))
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

      const { amount: usdPrice, timestamp } =
        get(usdPriceSelector(params)) ?? {}

      return {
        token,
        usdPrice,
        timestamp,
      }
    },
})

export const genericTokenBalancesSelector = selectorFamily<
  GenericTokenBalance[],
  WithChainId<{
    address: string
    cw20GovernanceTokenAddress?: string
    // Only get balances for this token type.
    filter?: TokenType
  }>
>({
  key: 'genericTokenBalances',
  get:
    ({ address, cw20GovernanceTokenAddress, chainId, filter }) =>
    async ({ get }) => {
      const nativeTokenBalances =
        !filter || filter === TokenType.Native
          ? get(
              nativeBalancesSelector({
                address,
                chainId,
              })
            )
          : []

      // TODO: Get polytone cw20s from some item prefix in the DAO.
      const cw20TokenBalances =
        !filter || filter === TokenType.Cw20
          ? get(
              isValidContractAddress(
                address,
                getChainForChainId(chainId).bech32_prefix
              ) &&
                // If is a DAO contract.
                get(
                  isContractSelector({
                    contractAddress: address,
                    chainId,
                    names: [
                      // V1
                      'cw-core',
                      // V2
                      'cwd-core',
                      'dao-core',
                    ],
                  })
                )
                ? DaoCoreV2Selectors.allCw20TokensWithBalancesSelector({
                    contractAddress: address,
                    governanceTokenAddress: cw20GovernanceTokenAddress,
                    chainId,
                  })
                : isValidWalletAddress(
                    address,
                    getChainForChainId(chainId).bech32_prefix
                  )
                ? walletCw20BalancesSelector({
                    walletAddress: address,
                    chainId,
                  })
                : waitForAll([])
            )
          : []

      return [...nativeTokenBalances, ...cw20TokenBalances]
    },
})

export const genericTokenBalanceSelector = selectorFamily<
  GenericTokenBalance,
  Parameters<typeof genericTokenSelector>[0] & {
    walletAddress: string
  }
>({
  key: 'genericTokenBalance',
  get:
    ({ walletAddress, ...params }) =>
    async ({ get }) => {
      const token = get(genericTokenSelector(params))

      let balance = '0'
      if (token.type === TokenType.Native) {
        balance = get(
          nativeBalanceSelector({
            address: walletAddress,
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
                address: walletAddress,
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

      const displayDenom =
        denomUnits.find(({ denom }) => denom === display) ??
        denomUnits.find(({ exponent }) => exponent > 0) ??
        denomUnits[0]

      if (!displayDenom) {
        throw new Error('No denom unit found for token factory denom')
      }

      return {
        symbol: symbol || display || base,
        decimals: displayDenom.exponent,
      }
    },
})
