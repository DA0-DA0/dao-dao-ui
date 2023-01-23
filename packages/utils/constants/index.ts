import { ChainPrefixIdMaps } from './chainPrefixIdMaps'
import { CodeIdConfigs } from './codeIdConfigs'

export const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV

export const SITE_URL =
  // On local dev or production vercel, use manually set domain.
  !VERCEL_ENV || VERCEL_ENV === 'production'
    ? (process.env.NEXT_PUBLIC_SITE_URL as string)
    : // Use vercel deployment URL if on preview or development vercel build.
      `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`

export const SITE_IMAGE = process.env.NEXT_PUBLIC_SITE_IMAGE as string
export const WC_ICON_PATH = process.env.NEXT_PUBLIC_WC_ICON_PATH as string
export const LEGACY_URL_PREFIX = process.env
  .NEXT_PUBLIC_LEGACY_URL_PREFIX as string
export const CHAIN_GOV_PROPOSAL_URL_TEMPLATE = process.env
  .NEXT_PUBLIC_CHAIN_GOV_PROPOSAL_URL_TEMPLATE as string

export const NATIVE_DECIMALS = parseInt(
  process.env.NEXT_PUBLIC_NATIVE_DECIMALS || '6',
  10
)
export const NATIVE_DENOM = process.env.NEXT_PUBLIC_FEE_DENOM as string
export const USDC_DECIMALS = parseInt(
  process.env.NEXT_PUBLIC_USDC_DECIMALS || '6',
  10
)

// True if on mainnet, false if on testnet.
export const MAINNET = process.env.NEXT_PUBLIC_MAINNET === 'true'

export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID as string
export const CHAIN_NAME = process.env.NEXT_PUBLIC_CHAIN_NAME as string
export const CHAIN_TXN_URL_PREFIX = process.env
  .NEXT_PUBLIC_CHAIN_TXN_URL_PREFIX as string
export const CHAIN_RPC_ENDPOINT = process.env
  .NEXT_PUBLIC_CHAIN_RPC_ENDPOINT as string
export const CHAIN_REST_ENDPOINT = process.env
  .NEXT_PUBLIC_CHAIN_REST_ENDPOINT as string
export const CHAIN_BECH32_PREFIX = process.env
  .NEXT_PUBLIC_CHAIN_BECH32_PREFIX as string

export const MICRO_STAKING_DENOM = process.env
  .NEXT_PUBLIC_STAKING_DENOM as string

export const USDC_SWAP_ADDRESS = process.env
  .NEXT_PUBLIC_USDC_SWAP_ADDRESS as string
export const POOLS_LIST_URL = process.env.NEXT_PUBLIC_POOLS_LIST_URL as string

export const CI = process.env.CI === 'true'

// Code IDs
if (!(CHAIN_ID in CodeIdConfigs)) {
  console.error(`Chain ID '${CHAIN_ID}' not found in Code ID Configs`)
}
export const CODE_ID_CONFIG = CodeIdConfigs[CHAIN_ID]!

// Chain Prefix -> ID Map for determining chain from DAO core address.
export const CHAIN_PREFIX_ID_MAP =
  ChainPrefixIdMaps[MAINNET ? 'mainnet' : 'testnet']

export const V1_FACTORY_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_V1_FACTORY_CONTRACT_ADDRESS as string

// DAO name min/max and description max defined in core.
export const MIN_DAO_NAME_LENGTH = parseInt(
  process.env.NEXT_PUBLIC_MIN_DAO_NAME_LENGTH || '3',
  10
)
export const MAX_DAO_NAME_LENGTH = parseInt(
  process.env.NEXT_PUBLIC_MAX_DAO_NAME_LENGTH || '50',
  10
)
export const MAX_DAO_DESCRIPTION_LENGTH = parseInt(
  process.env.NEXT_PUBLIC_MAX_DAO_DESCRIPTION_LENGTH || '130',
  10
)

export const MAX_META_CHARS_PROPOSAL_DESCRIPTION = parseInt(
  process.env.NEXT_PUBLIC_MAX_META_CHARS_PROPOSAL_DESCRIPTION || '200',
  10
)

export const DAO_STATIC_PROPS_CACHE_SECONDS = parseInt(
  process.env.NEXT_PUBLIC_DAO_STATIC_PROPS_CACHE_SECONDS ||
    // 5 minutes
    (60 * 5).toString(),
  10
)

export const FEATURED_DAOS_CACHE_SECONDS = parseInt(
  process.env.NEXT_PUBLIC_FEATURED_DAOS_CACHE_SECONDS ||
    // 12 hours
    (60 * 60 * 12).toString(),
  10
)

export const NEW_DAO_CW20_DECIMALS = parseInt(
  process.env.NEXT_PUBLIC_NEW_DAO_CW20_DECIMALS || '6',
  10
)

// This will not change with environment.
export const MAX_NUM_PROPOSAL_CHOICES = 20

// Stargaze
export const STARGAZE_RPC_ENDPOINT = process.env
  .NEXT_PUBLIC_STARGAZE_RPC_ENDPOINT as string
export const STARGAZE_REST_ENDPOINT = process.env
  .NEXT_PUBLIC_STARGAZE_REST_ENDPOINT as string
export const STARGAZE_PROFILE_API_TEMPLATE = process.env
  .NEXT_PUBLIC_STARGAZE_PROFILE_API_TEMPLATE as string
export const STARGAZE_URL_BASE = process.env
  .NEXT_PUBLIC_STARGAZE_URL_BASE as string

// Wallet profiles
export const PFPK_API_BASE = process.env.NEXT_PUBLIC_PFPK_API_BASE as string

// Indexer
export const INDEXER_API_KEY = process.env.INDEXER_API_KEY

// Search
export const SEARCH_HOST = process.env.NEXT_PUBLIC_SEARCH_HOST as string
export const SEARCH_API_KEY = process.env.NEXT_PUBLIC_SEARCH_API_KEY as string
export const SEARCH_DAOS_INDEX = process.env
  .NEXT_PUBLIC_SEARCH_DAOS_INDEX as string

export const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY as string

export const FAST_AVERAGE_COLOR_API_TEMPLATE = process.env
  .NEXT_PUBLIC_FAST_AVERAGE_COLOR_API_TEMPLATE as string
export const IPFS_GATEWAY_TEMPLATE = process.env
  .NEXT_PUBLIC_IPFS_GATEWAY_TEMPLATE as string

export const DISABLED_ACTIONS = (
  process.env.NEXT_PUBLIC_DISABLED_ACTIONS || ''
).split(',')

// Discord notifier
export const DISCORD_NOTIFIER_CLIENT_ID = process.env
  .NEXT_PUBLIC_DISCORD_NOTIFIER_CLIENT_ID as string
export const DISCORD_NOTIFIER_REDIRECT_URI = process.env
  .NEXT_PUBLIC_DISCORD_NOTIFIER_REDIRECT_URI as string
export const DISCORD_NOTIFIER_API_BASE = process.env
  .NEXT_PUBLIC_DISCORD_NOTIFIER_API_BASE as string
export const DISCORD_NOTIFIER_SIGNATURE_TYPE = 'Discord Notifier'

// Following API
export const FOLLOWING_DAOS_API_BASE = process.env
  .NEXT_PUBLIC_FOLLOWING_DAOS_API_BASE as string
