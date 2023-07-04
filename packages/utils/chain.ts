import { Buffer } from 'buffer'

import { Chain } from '@chain-registry/types'
import { fromBech32, fromHex, toBech32 } from '@cosmjs/encoding'
import { decodeCosmosSdkDecFromProto } from '@cosmjs/stargate'
import { Bech32Address } from '@keplr-wallet/cosmos'
import { ChainInfo, FeeCurrency } from '@keplr-wallet/types'
import { assets, chains } from 'chain-registry'
import { bondStatusToJSON } from 'cosmjs-types/cosmos/staking/v1beta1/staking'
import { Validator as RpcValidator } from 'interchain-rpc/types/codegen/cosmos/staking/v1beta1/staking'
import RIPEMD160 from 'ripemd160'

import {
  ChainId,
  GenericToken,
  HostChain,
  TokenType,
  Validator,
} from '@dao-dao/types'

import {
  CHAIN_ID,
  CHAIN_RPC_ENDPOINT,
  HOST_CHAIN_SUBDOMAINS,
  STARGAZE_RPC_ENDPOINT,
} from './constants'
import { getFallbackImage } from './getFallbackImage'
import { getIbcAssets } from './ibc'

export const getRpcForChainId = (chainId: string): string => {
  // Override from environment variables. Matched in
  // @dao-dao/stateful/components/WalletProvider.tsx
  if (chainId === CHAIN_ID) {
    return CHAIN_RPC_ENDPOINT
  } else if (chainId === ChainId.StargazeMainnet) {
    return STARGAZE_RPC_ENDPOINT
  }

  const chain = maybeGetChainForChainId(chainId)
  const rpc = chain?.apis?.rpc?.[0].address
  if (!rpc) {
    throw new Error(`Unknown chain ID "${chainId}"`)
  }

  return rpc
}

export const cosmosValidatorToValidator = ({
  operatorAddress: address,
  description: { moniker, website, details },
  commission,
  status,
  tokens,
}: RpcValidator): Validator => ({
  address,
  moniker,
  website:
    website && (website.startsWith('http') ? website : `https://${website}`),
  details,
  commission: decodeCosmosSdkDecFromProto(
    commission.commissionRates.rate
  ).toFloatApproximation(),
  status: bondStatusToJSON(status),
  tokens: Number(tokens),
})

export const getImageUrlForChainId = (chainId: string): string | undefined => {
  if (chainId === ChainId.JunoMainnet || chainId === ChainId.JunoTestnet) {
    return '/juno.png'
  }

  if (
    chainId === ChainId.StargazeMainnet ||
    chainId === ChainId.StargazeTestnet
  ) {
    return '/stargaze.png'
  }

  if (chainId === ChainId.JunoMainnet || chainId === ChainId.JunoTestnet) {
    return '/osmosis.png'
  }

  // Use chain logo if available.
  const { logo_URIs, images } = getChainForChainId(chainId)
  const image =
    logo_URIs?.svg ??
    logo_URIs?.png ??
    logo_URIs?.jpeg ??
    images?.[0]?.svg ??
    images?.[0]?.png
  if (image) {
    return image
  }

  // Fallback to image of native token on chain.
  const { imageUrl } = getNativeTokenForChainId(chainId)
  return imageUrl
}

// Convert public key in hex format to a bech32 address.
// https://github.com/cosmos/cosmos-sdk/blob/e09516f4795c637ab12b30bf732ce5d86da78424/crypto/keys/secp256k1/secp256k1.go#L152-L162
// Keplr implementation:
// https://github.com/chainapsis/keplr-wallet/blob/088dc701ce14df77a1ee22b7e39c651e50879d9f/packages/crypto/src/key.ts#L56-L63
export const secp256k1PublicKeyToBech32Address = async (
  hexPublicKey: string,
  bech32Prefix: string
): Promise<string> => {
  const sha256Hash = await crypto.subtle.digest(
    'SHA-256',
    fromHex(hexPublicKey)
  )
  const ripemd160Hex = new RIPEMD160()
    .update(Buffer.from(sha256Hash))
    .digest('hex')
  return toBech32(bech32Prefix, fromHex(ripemd160Hex))
}

const cachedChains: Record<string, Chain | undefined> = {}
export const maybeGetChainForChainId = (chainId: string): Chain | undefined => {
  cachedChains[chainId] ||= chains.find(({ chain_id }) => chain_id === chainId)
  return cachedChains[chainId]
}

export const getChainForChainId = (chainId: string): Chain => {
  const chain = maybeGetChainForChainId(chainId)
  if (!chain) {
    throw new Error(`Chain with ID ${chainId} not found`)
  }

  return chain
}

export const getDisplayNameForChainId = (chainId: string): string =>
  maybeGetChainForChainId(chainId)?.pretty_name ?? chainId

const cachedNativeTokens: Record<string, GenericToken | undefined> = {}
export const getNativeTokenForChainId = (chainId: string): GenericToken => {
  if (!cachedNativeTokens[chainId]) {
    const chain = getChainForChainId(chainId)

    const feeDenom = chain.fees?.fee_tokens.find(
      ({ denom }) => !denom.startsWith('ibc/')
    )?.denom
    if (!feeDenom) {
      throw new Error(`Chain ${chainId} has no fee token`)
    }

    const assetList =
      assets.find(({ chain_name }) => chain_name === chain.chain_name)
        ?.assets ?? []
    const asset = assetList.find(({ base }) => base === feeDenom)
    if (!asset) {
      throw new Error(`Chain ${chainId} has no asset for fee token ${feeDenom}`)
    }

    cachedNativeTokens[chainId] = Object.freeze({
      chainId,
      type: TokenType.Native,
      denomOrAddress: feeDenom,
      symbol: asset.symbol,
      decimals:
        asset.denom_units.find(({ denom }) => denom === asset.display)
          ?.exponent ??
        asset.denom_units.find(({ exponent }) => exponent > 0)?.exponent ??
        asset.denom_units[0]?.exponent ??
        0,
      // Use local JUNO image.
      imageUrl: feeDenom.startsWith('ujuno')
        ? '/juno.png'
        : // Use asset images.
          asset.logo_URIs?.svg ??
          asset.logo_URIs?.png ??
          asset.logo_URIs?.jpeg ??
          // Fallback.
          getFallbackImage(feeDenom),
    })
  }

  return cachedNativeTokens[chainId]!
}

const cachedTokens: Record<string, GenericToken | undefined> = {}
export const getTokenForChainIdAndDenom = (
  chainId: string,
  denom: string,
  // If true, will return placeholder token if not found. If false, will throw
  // error.
  placeholder = true
): GenericToken => {
  try {
    // If native token, return it.
    const nativeToken = getNativeTokenForChainId(chainId)
    if (denom === nativeToken.denomOrAddress) {
      return nativeToken
    }

    const key = `${chainId}:${denom}`
    if (!cachedTokens[key]) {
      // If Juno mainnet, check IBC assets.
      if (chainId === ChainId.JunoMainnet) {
        const ibcAsset = getIbcAssets().find(
          ({ denomOrAddress }) => denomOrAddress === denom
        )

        if (ibcAsset) {
          cachedTokens[key] = ibcAsset
          return ibcAsset
        }
      }

      // Otherwise, check asset list.
      const chain = getChainForChainId(chainId)

      const assetList =
        assets.find(({ chain_name }) => chain_name === chain.chain_name)
          ?.assets ?? []
      const asset = assetList.find(({ base }) => base === denom)
      if (!asset) {
        throw new Error(`Chain ${chainId} has no asset for token ${denom}`)
      }

      cachedTokens[key] = Object.freeze({
        chainId,
        type: TokenType.Native,
        denomOrAddress: denom,
        symbol: asset.symbol,
        decimals:
          asset.denom_units.find(({ denom }) => denom === asset.display)
            ?.exponent ??
          asset.denom_units.find(({ exponent }) => exponent > 0)?.exponent ??
          asset.denom_units[0]?.exponent ??
          0,
        // Use local Juno image for ujuno token prefix.
        imageUrl: denom.startsWith('ujuno')
          ? '/juno.png'
          : // Use asset images.
            asset.logo_URIs?.svg ??
            asset.logo_URIs?.png ??
            asset.logo_URIs?.jpeg ??
            // Fallback.
            getFallbackImage(denom),
      })
    }

    return cachedTokens[key]!
  } catch (err) {
    if (placeholder) {
      return Object.freeze({
        chainId,
        type: TokenType.Native,
        denomOrAddress: denom,
        symbol: denom,
        decimals: 0,
        imageUrl: getFallbackImage(denom),
      })
    } else {
      throw err
    }
  }
}

export const getHostChains = (): HostChain[] =>
  HOST_CHAIN_SUBDOMAINS.map(({ id, subdomain }) => ({
    chain: getChainForChainId(id),
    subdomain,
  }))

// Validates whether the address is for the current chain. If so, return
// undefined. If not, return the correct subdomain.
export const validateAddressOnCurrentChain = (
  address: string
): string | undefined => {
  const supportedChains = getHostChains()

  // Match supported chains from address prefix. There may be overlaps (testnets
  // often use the same prefix as mainnets).
  const { prefix } = fromBech32(address)
  const chainsForAddress = supportedChains.filter(
    ({ chain }) => chain.bech32_prefix === prefix
  )

  if (chainsForAddress.length === 0) {
    throw new Error(`Unsupported chain: unrecognized prefix "${prefix}"`)
  }

  // If any chain matches the current chain, return undefined.
  if (chainsForAddress.some(({ chain }) => chain.chain_id === CHAIN_ID)) {
    return
  }

  // Otherwise return the subdomain of the first chain.
  return `https://${chainsForAddress[0].subdomain}.daodao.zone`
}

// Construct Keplr chain info from chain registry.
export const maybeGetKeplrChainInfo = (
  chainId: string
): ChainInfo | undefined => {
  const chain = maybeGetChainForChainId(chainId)
  const rpc = chain?.apis?.rpc?.[0].address
  const rest = chain?.apis?.rest?.[0].address
  const stakingDenom = chain?.staking?.staking_tokens[0].denom

  if (!chain || !rpc || !rest || !stakingDenom) {
    return
  }

  const stakeCurrency = getTokenForChainIdAndDenom(
    chain.chain_id,
    stakingDenom,
    false
  )

  const feeCurrencies =
    chain.fees?.fee_tokens?.map(
      ({
        denom,
        low_gas_price,
        average_gas_price,
        high_gas_price,
      }): FeeCurrency => {
        const token = getTokenForChainIdAndDenom(chain.chain_id, denom, false)

        return {
          coinDenom: token.symbol,
          coinMinimalDenom: token.denomOrAddress,
          coinDecimals: token.decimals,
          gasPriceStep:
            low_gas_price !== undefined &&
            average_gas_price !== undefined &&
            high_gas_price !== undefined
              ? {
                  low: low_gas_price,
                  average: average_gas_price,
                  high: high_gas_price,
                }
              : undefined,
        }
      }
    ) ?? []

  return {
    rpc,
    rest,
    chainId: chain.chain_id,
    chainName: chain.pretty_name || chain.chain_name,
    stakeCurrency: {
      coinDenom: stakeCurrency.symbol,
      coinMinimalDenom: stakeCurrency.denomOrAddress,
      coinDecimals: stakeCurrency.decimals,
    },
    bip44: {
      coinType: chain.slip44,
    },
    alternativeBIP44s: chain.alternative_slip44s?.map((coinType) => ({
      coinType,
    })),
    bech32Config: Bech32Address.defaultBech32Config(chain.bech32_prefix),
    currencies: feeCurrencies,
    feeCurrencies,
  }
}
