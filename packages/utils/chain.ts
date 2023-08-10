import { Buffer } from 'buffer'

import { Chain, IBCInfo } from '@chain-registry/types'
import { fromBech32, fromHex, toBech32 } from '@cosmjs/encoding'
import { decodeCosmosSdkDecFromProto } from '@cosmjs/stargate'
import { Bech32Address } from '@keplr-wallet/cosmos'
import { ChainInfo, FeeCurrency } from '@keplr-wallet/types'
import { assets, chains, ibc } from 'chain-registry'
import RIPEMD160 from 'ripemd160'

import {
  Validator as RpcValidator,
  bondStatusToJSON,
} from '@dao-dao/protobuf/codegen/cosmos/staking/v1beta1/staking'
import {
  ChainId,
  GenericToken,
  SupportedChain,
  SupportedChainConfig,
  TokenType,
  Validator,
} from '@dao-dao/types'

import { CHAIN_ENDPOINTS, MAINNET, SUPPORTED_CHAINS } from './constants'
import { getFallbackImage } from './getFallbackImage'
import { getIbcAssets } from './ibc'

export const getRpcForChainId = (chainId: string): string => {
  let rpc = (
    (chainId in CHAIN_ENDPOINTS &&
      CHAIN_ENDPOINTS[chainId as keyof typeof CHAIN_ENDPOINTS]) ||
    {}
  )?.rpc
  if (rpc) {
    return rpc
  }

  // Fallback to chain registry.
  const chain = maybeGetChainForChainId(chainId)
  rpc = chain?.apis?.rpc?.[0].address
  if (!rpc) {
    throw new Error(`Unknown chain ID "${chainId}"`)
  }

  return rpc
}

export const cosmosValidatorToValidator = ({
  operatorAddress: address,
  description: { moniker, website, details } = {
    moniker: '',
    identity: '',
    website: '',
    securityContact: '',
    details: '',
  },
  commission,
  status,
  tokens,
}: RpcValidator): Validator => ({
  address,
  moniker,
  website:
    website && (website.startsWith('http') ? website : `https://${website}`),
  details,
  commission: commission?.commissionRates
    ? decodeCosmosSdkDecFromProto(
        commission.commissionRates.rate
      ).toFloatApproximation()
    : -1,
  status: bondStatusToJSON(status),
  tokens: Number(tokens),
})

export const getImageUrlForChainId = (chainId: string): string => {
  if (
    chainId === ChainId.StargazeMainnet ||
    chainId === ChainId.StargazeTestnet
  ) {
    return '/stargaze.png'
  }

  if (
    chainId === ChainId.OsmosisMainnet ||
    chainId === ChainId.OsmosisTestnet
  ) {
    return '/osmosis.png'
  }

  // Use chain logo if available.
  const { logo_URIs, images } = getChainForChainId(chainId)
  const image =
    logo_URIs?.png ??
    logo_URIs?.jpeg ??
    logo_URIs?.svg ??
    images?.[0]?.png ??
    images?.[0]?.svg
  if (image) {
    return image
  }

  // Fallback to image of native token on chain.
  const { imageUrl } = getNativeTokenForChainId(chainId)

  return imageUrl || getFallbackImage(chainId)
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

const cachedChainsById: Record<string, Chain | undefined> = {}
export const maybeGetChainForChainId = (chainId: string): Chain | undefined => {
  cachedChainsById[chainId] ||= chains.find(
    ({ chain_id }) => chain_id === chainId
  )
  return cachedChainsById[chainId]
}

export const getChainForChainId = (chainId: string): Chain => {
  const chain = maybeGetChainForChainId(chainId)
  if (!chain) {
    throw new Error(`Chain with ID ${chainId} not found`)
  }

  return chain
}

const cachedChainsByName: Record<string, Chain | undefined> = {}
export const getChainForChainName = (chainName: string): Chain => {
  cachedChainsByName[chainName] ||= chains.find(
    ({ chain_name }) => chain_name === chainName
  )
  if (!cachedChainsByName[chainName]) {
    throw new Error(`Chain with name ${chainName} not found`)
  }
  return cachedChainsByName[chainName]!
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
      // Use asset images.
      imageUrl:
        asset.logo_URIs?.png ??
        asset.logo_URIs?.jpeg ??
        asset.logo_URIs?.svg ??
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
      // Try IBC assets.
      const ibcAsset = getIbcAssets(chainId).find(
        ({ denomOrAddress }) => denomOrAddress === denom
      )
      if (!ibcAsset) {
        throw new Error(`Chain ${chainId} has no asset for token ${denom}`)
      }

      cachedTokens[key] = ibcAsset
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

export const getIbcTransferInfoBetweenChains = (
  srcChainId: string,
  destChainId: string
): {
  sourceChannel: string
  info: IBCInfo
} => {
  const { chain_name: srcChainName } = getChainForChainId(srcChainId)
  const { chain_name: destChainName } = getChainForChainId(destChainId)

  const info = ibc.find(
    ({ chain_1, chain_2, channels }) =>
      (chain_1.chain_name === srcChainName &&
        chain_2.chain_name === destChainName) ||
      (chain_1.chain_name === destChainName &&
        chain_2.chain_name === srcChainName &&
        channels.some(
          ({ chain_1, chain_2, version }) =>
            version === 'ics20-1' &&
            chain_1.port_id === 'transfer' &&
            chain_2.port_id === 'transfer'
        ))
  )
  if (!info) {
    throw new Error(
      `Failed to find IBC channel from chain ${srcChainId} to chain ${destChainId}.`
    )
  }

  const srcChainNumber = info.chain_1.chain_name === srcChainName ? 1 : 2
  const channel = info.channels.find(
    ({
      [`chain_${srcChainNumber}` as `chain_${typeof srcChainNumber}`]: srcChain,
      [`chain_${
        srcChainNumber === 1 ? 2 : 1
      }` as `chain_${typeof srcChainNumber}`]: destChain,
      version,
    }) =>
      version === 'ics20-1' &&
      srcChain.port_id === 'transfer' &&
      destChain.port_id === 'transfer'
  )
  if (!channel) {
    throw new Error(
      `Failed to find IBC channel from chain ${srcChainId} to chain ${destChainId}.`
    )
  }

  return {
    sourceChannel:
      channel[`chain_${srcChainNumber}` as `chain_${typeof srcChainNumber}`]
        .channel_id,
    info,
  }
}

export const getIbcTransferInfoFromChainSource = (
  chainId: string,
  sourceChannel: string
): {
  destinationChain: IBCInfo['chain_1']
  channel: IBCInfo['channels'][number]
  info: IBCInfo
} => {
  const { chain_name } = getChainForChainId(chainId)

  const info = ibc.find(
    ({ chain_1, chain_2, channels }) =>
      // Chain 1 is the source chain.
      (chain_1.chain_name === chain_name &&
        channels.some(
          ({ chain_1, version }) =>
            version === 'ics20-1' &&
            chain_1.port_id === 'transfer' &&
            chain_1.channel_id === sourceChannel
        )) ||
      // Chain 2 is the source chain.
      (chain_2.chain_name === chain_name &&
        channels.some(
          ({ chain_2, version }) =>
            version === 'ics20-1' &&
            chain_2.port_id === 'transfer' &&
            chain_2.channel_id === sourceChannel
        ))
  )
  if (!info) {
    throw new Error(
      `Failed to find IBC channel for chain ${chainId} and source channel ${sourceChannel}.`
    )
  }

  const thisChainNumber = info.chain_1.chain_name === chain_name ? 1 : 2
  const otherChain = info[`chain_${thisChainNumber === 1 ? 2 : 1}`]
  const channel = info.channels.find(
    ({
      [`chain_${thisChainNumber}` as `chain_${typeof thisChainNumber}`]: {
        port_id,
        channel_id,
      },
      version,
    }) =>
      version === 'ics20-1' &&
      port_id === 'transfer' &&
      channel_id === sourceChannel
  )
  if (!channel) {
    throw new Error(
      `Failed to find IBC channel for chain ${chainId} and source channel ${sourceChannel}.`
    )
  }

  return {
    destinationChain: otherChain,
    channel,
    info,
  }
}

export const getSupportedChainConfig = (
  chainId: string
): SupportedChainConfig | undefined =>
  Object.values(ChainId).includes(chainId as any)
    ? SUPPORTED_CHAINS[chainId as ChainId]
    : undefined

export const getSupportedChains = ({
  mainnet = MAINNET,
}: {
  mainnet?: boolean
} = {}): SupportedChain[] =>
  Object.entries(SUPPORTED_CHAINS)
    .filter(([, config]) => mainnet === undefined || config.mainnet === mainnet)
    .map(([chainId, config]) => ({
      chain: getChainForChainId(chainId),
      ...config,
    }))

// Validates whether the address is for the current chain. If so, return
// undefined. If not, return the correct subdomain.
export const getChainIdForAddress = (address: string): string => {
  const supportedChains = getSupportedChains()

  // Match supported chain from address prefix. Hopefully there is only one. Use
  // the first.
  const { prefix } = fromBech32(address)
  const chainForAddress = supportedChains.find(
    ({ chain, mainnet }) =>
      chain.bech32_prefix === prefix && mainnet === MAINNET
  )

  if (!chainForAddress) {
    throw new Error(`Unsupported chain: unrecognized prefix "${prefix}"`)
  }

  return chainForAddress.chain.chain_id
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

// Kado fiat modal only supports Juno and Osmosis.
export const isKadoEnabled = (chainId: string) =>
  chainId === ChainId.JunoMainnet || chainId === ChainId.OsmosisMainnet

export const cosmosSdkVersionIs47OrHigher = (version: string) => {
  const [major, minor, patch] = version.replace(/^v/, '').split('.')
  return (
    (Number(major) >= 0 && Number(minor) >= 47 && Number(patch) >= 0) ||
    (Number(major) >= 1 && Number(minor) >= 0 && Number(patch) >= 0)
  )
}
