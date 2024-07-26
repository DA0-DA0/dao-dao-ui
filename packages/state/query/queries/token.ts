import { QueryClient, queryOptions } from '@tanstack/react-query'

import { GenericToken, GenericTokenSource, TokenType } from '@dao-dao/types'
import {
  getChainForChainName,
  getFallbackImage,
  getIbcTransferInfoFromChannel,
  getTokenForChainIdAndDenom,
  ibcProtoRpcClientRouter,
  isSecretNetwork,
} from '@dao-dao/utils'

import { chainQueries } from './chain'
import { contractQueries } from './contract'
import { cw20BaseQueries } from './contracts'
import { indexerQueries } from './indexer'
import { skipQueries } from './skip'

/**
 * Fetch info for a token.
 */
export const fetchTokenInfo = async (
  queryClient: QueryClient,
  { chainId, type, denomOrAddress }: GenericTokenSource
): Promise<GenericToken> => {
  const [source, asset] = await Promise.all([
    queryClient
      .fetchQuery(
        tokenQueries.source(queryClient, {
          chainId,
          type,
          denomOrAddress,
        })
      )
      // On error, fallback to passed in params as the source.
      .catch(() => ({
        chainId,
        type,
        denomOrAddress,
      })),
    queryClient
      .fetchQuery(
        skipQueries.asset(queryClient, {
          chainId,
          type,
          denomOrAddress,
        })
      )
      .catch(() => undefined),
  ])

  if (asset) {
    return {
      chainId: asset.chain_id,
      type: asset.is_cw20 ? TokenType.Cw20 : TokenType.Native,
      denomOrAddress: (asset.is_cw20 && asset.token_contract) || asset.denom,
      symbol: asset.recommended_symbol || asset.symbol || asset.denom,
      decimals: asset.decimals || 0,
      imageUrl: asset.logo_uri || getFallbackImage(denomOrAddress),
      source,
      snip20CodeHash:
        isSecretNetwork(asset.chain_id) && asset.is_cw20 && asset.token_contract
          ? await queryClient.fetchQuery(
              contractQueries.secretCodeHash({
                chainId: asset.chain_id,
                address: asset.token_contract,
              })
            )
          : null,
    }
  } else if (source.chainId !== chainId) {
    // If Skip API does not have the info, check if Skip API has the source
    // if it's different. This has happened before when Skip does not have
    // an IBC asset that we were able to reverse engineer the source for.
    const sourceAsset = await queryClient.fetchQuery(
      skipQueries.asset(queryClient, source)
    )

    if (sourceAsset) {
      return {
        chainId,
        type,
        denomOrAddress,
        symbol:
          sourceAsset.recommended_symbol ||
          sourceAsset.symbol ||
          sourceAsset.denom,
        decimals: sourceAsset.decimals || 0,
        imageUrl: sourceAsset.logo_uri || getFallbackImage(denomOrAddress),
        source,
        snip20CodeHash:
          isSecretNetwork(chainId) && type === TokenType.Cw20
            ? await queryClient.fetchQuery(
                contractQueries.secretCodeHash({
                  chainId,
                  address: denomOrAddress,
                })
              )
            : null,
      }
    }
  }

  if (type === TokenType.Cw20) {
    const [tokenInfo, imageUrl] = await Promise.all([
      queryClient.fetchQuery(
        cw20BaseQueries.tokenInfo(queryClient, {
          chainId,
          contractAddress: denomOrAddress,
        })
      ),
      queryClient.fetchQuery(
        tokenQueries.cw20LogoUrl(queryClient, {
          chainId,
          address: denomOrAddress,
        })
      ),
    ])

    return {
      chainId,
      type,
      denomOrAddress,
      symbol: tokenInfo.symbol,
      decimals: tokenInfo.decimals,
      imageUrl: imageUrl || getFallbackImage(denomOrAddress),
      source,
      snip20CodeHash: isSecretNetwork(chainId)
        ? await queryClient.fetchQuery(
            contractQueries.secretCodeHash({
              chainId,
              address: denomOrAddress,
            })
          )
        : null,
    }
  }

  // Attempt to fetch from local asset list, erroring if not found.
  try {
    const token = getTokenForChainIdAndDenom(chainId, denomOrAddress, false)
    return {
      ...token,
      source,
      snip20CodeHash:
        isSecretNetwork(chainId) && token.type === TokenType.Cw20
          ? await queryClient.fetchQuery(
              contractQueries.secretCodeHash({
                chainId,
                address: denomOrAddress,
              })
            )
          : null,
    }
  } catch (err) {
    console.error(err)
  }

  // Attempt to fetch from chain.
  try {
    const chainMetadata = await queryClient.fetchQuery(
      chainQueries.denomMetadata({
        chainId,
        denom: denomOrAddress,
      })
    )

    if (chainMetadata) {
      return {
        chainId,
        type,
        denomOrAddress,
        symbol: chainMetadata.preferredSymbol,
        decimals: chainMetadata.preferredDecimals,
        imageUrl: getFallbackImage(denomOrAddress),
        source,
      }
    }
  } catch (err) {
    console.error(err)
  }

  // If nothing found, just return empty token.
  return {
    chainId,
    type: TokenType.Native,
    denomOrAddress,
    symbol: denomOrAddress,
    decimals: 0,
    imageUrl: getFallbackImage(denomOrAddress),
    source,
  }
}

/**
 * Resolve a denom on a chain to its source chain and base denom. If an IBC
 * asset, reverse engineer IBC denom. Otherwise returns the inputs.
 */
export const fetchTokenSource = async (
  queryClient: QueryClient,
  { chainId, type, denomOrAddress }: GenericTokenSource
): Promise<GenericTokenSource> => {
  // Check if Skip API has the info.
  const skipAsset = await queryClient.fetchQuery(
    skipQueries.asset(queryClient, {
      chainId,
      type,
      denomOrAddress,
    })
  )

  if (skipAsset) {
    const sourceType = skipAsset.origin_denom.startsWith('cw20:')
      ? TokenType.Cw20
      : TokenType.Native
    return {
      chainId: skipAsset.origin_chain_id,
      type: sourceType,
      denomOrAddress:
        sourceType === TokenType.Cw20
          ? skipAsset.origin_denom.replace(/^cw20:/, '')
          : skipAsset.origin_denom,
    }
  }

  let sourceChainId = chainId
  let sourceDenom = (type === TokenType.Cw20 ? 'cw20:' : '') + denomOrAddress

  // Try to reverse engineer IBC denom.
  if (denomOrAddress.startsWith('ibc/')) {
    const ibc = await ibcProtoRpcClientRouter.connect(chainId)

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
}

/**
 * Fetch the logo URL for a cw20 token if it exists. Returns null if not found.
 */
export const fetchCw20LogoUrl = async (
  queryClient: QueryClient,
  {
    chainId,
    address,
  }: {
    chainId: string
    address: string
  }
): Promise<string | null> => {
  try {
    const logoUrl = await queryClient.fetchQuery(
      indexerQueries.queryContract(queryClient, {
        chainId,
        contractAddress: address,
        formula: 'cw20/logoUrl',
      })
    )
    return logoUrl ?? null
  } catch (err) {
    // Ignore error.
    console.error(err)
  }

  // If indexer query fails, fallback to contract query.
  const logoInfo = (
    await queryClient
      .fetchQuery(
        cw20BaseQueries.marketingInfo(queryClient, {
          chainId,
          contractAddress: address,
        })
      )
      // Cw20 on some chains do not support marketing info.
      .catch(() => undefined)
  )?.logo

  return logoInfo && logoInfo !== 'embedded' && 'url' in logoInfo
    ? logoInfo.url
    : null
}

export const tokenQueries = {
  /**
   * Fetch info for a token.
   */
  info: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchTokenInfo>[1]
  ) =>
    queryOptions({
      queryKey: ['token', 'info', options],
      queryFn: () => fetchTokenInfo(queryClient, options),
    }),
  /**
   * Resolve a denom on a chain to its source chain and base denom. If an IBC
   * asset, reverse engineer IBC denom. Otherwise returns the inputs.
   */
  source: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchTokenSource>[1]
  ) =>
    queryOptions({
      queryKey: ['token', 'source', options],
      queryFn: () => fetchTokenSource(queryClient, options),
    }),
  /**
   * Fetch the logo URL for a cw20 token if it exists.
   */
  cw20LogoUrl: (
    queryClient: QueryClient,
    options: Parameters<typeof fetchCw20LogoUrl>[1]
  ) =>
    queryOptions({
      queryKey: ['token', 'cw20LogoUrl', options],
      queryFn: () => fetchCw20LogoUrl(queryClient, options),
    }),
}
