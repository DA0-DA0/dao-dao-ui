import { TokenInfoResponse } from './contracts/Cw20Base'

export type CachedLoadable<T> =
  | {
      state: 'loading'
      contents: undefined
    }
  | {
      state: 'hasValue'
      contents: T
      updating: boolean
    }
  | {
      state: 'hasError'
      contents: any
    }

export type WithChainId<T> = T & {
  chainId?: string
}

export interface AmountWithTimestamp {
  amount: number
  timestamp: Date
}

export interface AmountWithTimestampAndDenom extends AmountWithTimestamp {
  denom: string
}

export interface TokenInfoResponseWithAddressAndLogo extends TokenInfoResponse {
  address: string
  logoUrl?: string
}
