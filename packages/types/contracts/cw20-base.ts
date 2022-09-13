import { Addr, Uint128 } from './common'

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

export interface TokenInfoResponse {
  decimals: number
  name: string
  symbol: string
  total_supply: Uint128
}
