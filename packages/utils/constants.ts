export const CARD_IMAGES_ENABLED =
  process.env.NEXT_PUBLIC_IMAGES_CARD_ENABLED === 'true'

export const HEADER_IMAGES_ENABLED =
  process.env.NEXT_PUBLIC_IMAGES_HEADER_ENABLED === 'true'

export const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE as string
export const SITE_DESCRIPTION = process.env
  .NEXT_PUBLIC_SITE_DESCRIPTION as string
export const SITE_IMAGE = process.env.NEXT_PUBLIC_SITE_IMAGE as string
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string
export const WC_ICON_PATH = process.env.NEXT_PUBLIC_WC_ICON_PATH as string

export const NATIVE_DECIMALS = 6
export const NATIVE_DENOM = process.env.NEXT_PUBLIC_FEE_DENOM as string

export const GAS_PRICE = process.env.NEXT_PUBLIC_GAS_PRICE as string

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

export const JUNO_BLOCKS_PER_YEAR = 5086451
