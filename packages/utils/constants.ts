export const SITE_IMAGE = process.env.NEXT_PUBLIC_SITE_IMAGE as string
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string
export const WC_ICON_PATH = process.env.NEXT_PUBLIC_WC_ICON_PATH as string
export const LEGACY_URL_PREFIX = process.env
  .NEXT_PUBLIC_LEGACY_URL_PREFIX as string

export const NATIVE_DECIMALS = 6
export const NATIVE_DENOM = process.env.NEXT_PUBLIC_FEE_DENOM as string

export const STATUS_COLORS: { [key: string]: string } = {
  open: '#00BAFF',
  draft: '#00F',
  executed: '#53D0C9',
  passed: '#6A78FF',
  rejected: '#ED5276',
}

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

export const SEARCH_URL = process.env.NEXT_PUBLIC_SEARCH_URL as string
export const SEARCH_API_KEY = process.env.NEXT_PUBLIC_SEARCH_API_KEY as string
export const SEARCH_INDEX = process.env.NEXT_PUBLIC_SEARCH_INDEX as string

export const CI = process.env.CI === 'true'

// Contract Code IDs
export const CW20_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_CW20_CODE_ID as string,
  10
)
export const CW4GROUP_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_CW4GROUP_CODE_ID as string,
  10
)
export const CWCORE_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_CWCORE_CODE_ID as string,
  10
)

export const V1_FACTORY_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_V1_FACTORY_CONTRACT_ADDRESS as string

export const CWPROPOSALSINGLE_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_CWPROPOSALSINGLE_CODE_ID as string,
  10
)
export const CW4VOTING_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_CW4VOTING_CODE_ID as string,
  10
)
export const CW20STAKEDBALANCEVOTING_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_CW20STAKEDBALANCEVOTING_CODE_ID as string,
  10
)
export const STAKECW20_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_STAKECW20_CODE_ID as string,
  10
)
// Contract Names
export const CW4VOTING_CONTRACT_NAME = process.env
  .NEXT_PUBLIC_CW4VOTING_CONTRACT_NAME as string
export const CW20STAKEDBALANCEVOTING_CONTRACT_NAME = process.env
  .NEXT_PUBLIC_CW20STAKEDBALANCEVOTING_CONTRACT_NAME as string
export const CWNATIVESTAKEDBALANCEVOTING_CONTRACT_NAME = process.env
  .NEXT_PUBLIC_CWNATIVESTAKEDBALANCEVOTING_CONTRACT_NAME as string
export const CWPROPOSALSINGLE_CONTRACT_NAME = process.env
  .NEXT_PUBLIC_CWPROPOSALSINGLE_CONTRACT_NAME as string
export const CWPROPOSALMULTIPLE_CONTRACT_NAME = process.env
  .NEXT_PUBLIC_CWPROPOSALMULTIPLE_CONTRACT_NAME as string

export const JUNO_BLOCKS_PER_YEAR = 5086451

export const VERCEL_ENV = process.env.NEXT_PUBLIC_VERCEL_ENV as string

// DAO Name min/max defined in cw-core.
export const MIN_DAO_NAME_LENGTH = parseInt(
  process.env.NEXT_PUBLIC_MIN_DAO_NAME_LENGTH || '3',
  10
)
export const MAX_DAO_NAME_LENGTH = parseInt(
  process.env.NEXT_PUBLIC_MAX_DAO_NAME_LENGTH || '50',
  10
)

export const MAX_META_CHARS_PROPOSAL_DESCRIPTION = parseInt(
  process.env.NEXT_PUBLIC_MAX_META_CHARS_PROPOSAL_DESCRIPTION || '200',
  10
)

export const DAO_STATIC_PROPS_CACHE_SECONDS = parseInt(
  process.env.NEXT_PUBLIC_DAO_STATIC_PROPS_CACHE_SECONDS || '300',
  10
)
