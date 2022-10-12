import { Addr, Binary, Expiration, Uint128 } from './common'

export interface AllAccountsResponse {
  accounts: string[]
  [k: string]: unknown
}
export interface AllAllowancesResponse {
  allowances: AllowanceInfo[]
  [k: string]: unknown
}
export interface AllowanceInfo {
  allowance: Uint128
  expires: Expiration
  spender: string
  [k: string]: unknown
}
export interface AllowanceResponse {
  allowance: Uint128
  expires: Expiration
  [k: string]: unknown
}
export interface BalanceResponse {
  balance: Uint128
  [k: string]: unknown
}
export interface DownloadLogoResponse {
  data: Binary
  mime_type: string
  [k: string]: unknown
}
export type LogoInfo =
  | 'embedded'
  | {
      url: string
    }
export interface MarketingInfoResponse {
  description?: string | null
  logo?: LogoInfo | null
  marketing?: Addr | null
  project?: string | null
  [k: string]: unknown
}
export interface MinterResponse {
  cap?: Uint128 | null
  minter: string
  [k: string]: unknown
}
export interface TokenInfoResponse {
  decimals: number
  name: string
  symbol: string
  total_supply: Uint128
  [k: string]: unknown
}
