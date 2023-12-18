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
      contents: Error
    }

export type WithChainId<T> = T & {
  chainId: string
}

export interface AmountWithTimestamp {
  amount: number
  timestamp: Date
}

export interface TokenInfoResponseWithAddressAndLogo extends TokenInfoResponse {
  address: string
  logoUrl?: string
}
