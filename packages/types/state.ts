import { cosmos } from 'interchain-rpc'

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

export type GovProposal = ReturnType<
  typeof cosmos.gov.v1beta1.Proposal['fromPartial']
>
export type GovProposalWithDecodedContent = GovProposal & {
  decodedContent: any
}
