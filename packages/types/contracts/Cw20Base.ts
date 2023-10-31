import { Addr, Binary, Expiration, Uint128 } from './common'

export interface AllAccountsResponse {
  accounts: string[]
}
export interface AllAllowancesResponse {
  allowances: AllowanceInfo[]
}
export interface AllowanceInfo {
  allowance: Uint128
  expires: Expiration
  spender: string
}
export interface AllowanceResponse {
  allowance: Uint128
  expires: Expiration
}
export interface BalanceResponse {
  balance: Uint128
}
export interface DownloadLogoResponse {
  data: Binary
  mime_type: string
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
}
export interface MinterResponse {
  cap?: Uint128 | null
  minter: string
}
export interface TokenInfoResponse {
  decimals: number
  name: string
  symbol: string
  total_supply: Uint128
}
