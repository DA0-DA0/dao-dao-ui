import { Buffer } from 'buffer'

import { Chain } from '@chain-registry/types'
import { fromHex, toBech32 } from '@cosmjs/encoding'
import { decodeCosmosSdkDecFromProto } from '@cosmjs/stargate'
import { ChainInfoID, ChainInfoMap } from '@noahsaso/cosmodal'
import { assets, chains } from 'chain-registry'
import { bondStatusToJSON } from 'cosmjs-types/cosmos/staking/v1beta1/staking'
import { Validator as RpcValidator } from 'interchain-rpc/types/codegen/cosmos/staking/v1beta1/staking'
import RIPEMD160 from 'ripemd160'

import { GenericToken, TokenType, Validator } from '@dao-dao/types'

import {
  CHAIN_ID,
  CHAIN_RPC_ENDPOINT,
  STARGAZE_RPC_ENDPOINT,
  STARGAZE_TESTNET_CHAIN_ID,
  STARGAZE_TESTNET_RPC_ENDPOINT,
} from './constants'
import { getFallbackImage } from './getFallbackImage'
import { ibcAssets } from './ibc'

export const getRpcForChainId = (chainId: string): string => {
  // Override from environment variables. Matched in
  // @dao-dao/stateful/components/WalletProvider.tsx
  if (chainId === CHAIN_ID) {
    return CHAIN_RPC_ENDPOINT
  } else if (chainId === ChainInfoID.Stargaze1) {
    return STARGAZE_RPC_ENDPOINT
  } else if (chainId === STARGAZE_TESTNET_CHAIN_ID) {
    return STARGAZE_TESTNET_RPC_ENDPOINT
  }

  if (!(chainId in ChainInfoMap)) {
    throw new Error(`Unknown chain ID "${chainId}"`)
  }
  return ChainInfoMap[chainId as keyof typeof ChainInfoMap].rpc
}

export const getUrlBaseForChainId = (chainId: string): string =>
  // If on same chain, keep URL.
  chainId === CHAIN_ID
    ? ''
    : // Otherwise use chain-specific one.
    chainId === ChainInfoID.Juno1
    ? 'https://daodao.zone'
    : chainId === ChainInfoID.Uni6
    ? 'https://testnet.daodao.zone'
    : ''

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

export const getImageUrlForChainId = (chainId: string): string | undefined =>
  chainId === ChainInfoID.Juno1 || chainId === ChainInfoID.Uni6
    ? '/juno.png'
    : chainId === ChainInfoID.Stargaze1 || chainId === STARGAZE_TESTNET_CHAIN_ID
    ? '/stargaze.png'
    : undefined

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

    const feeDenom = chain.fees?.fee_tokens[0].denom
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
      if (chainId === ChainInfoID.Juno1) {
        const ibcAsset = ibcAssets.find(
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
        // Use local JUNO image.
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
