export const DAO_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_DAO_CONTRACT_CODE_ID as string,
  10
)

export const CW20_CODE_ID = parseInt(process.env.NEXT_PUBLIC_CW20_CODE_ID!, 10)

export const STAKE_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_STAKE_CW20_CODE_ID as string,
  10
)

export const C4_GROUP_CODE_ID = parseInt(
  process.env.NEXT_PUBLIC_C4_GROUP_CODE_ID as string,
  10
)

export const SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE as string

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
export const CHAIN_TXN_URL_PREFIX = process.env.NEXT_PUBLIC_CHAIN_TXN_URL_PREFIX

export const DAO_ADDRESS = process.env.NEXT_PUBLIC_DAO_ADDRESS as string
export const EXTERNAL_HREF = process.env.NEXT_PUBLIC_EXTERNAL_HREF as string
