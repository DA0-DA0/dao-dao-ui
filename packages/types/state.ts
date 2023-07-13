import { cosmos } from 'interchain-rpc'
import { TextProposal } from 'interchain-rpc/types/codegen/cosmos/gov/v1beta1/gov'

import { TokenInfoResponse } from './contracts/Cw20Base'
import { DecodedStargateMsg } from './utils'

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
export type GovProposalDecodedContent = DecodedStargateMsg<
  TextProposal & {
    // May contain additional fields if not a TextProposal.
    [key: string]: any
  }
>['stargate']
export type GovProposalWithDecodedContent = GovProposal & {
  decodedContent: GovProposalDecodedContent
}

export enum GovernanceProposalType {
  TextProposal = '/cosmos.gov.v1beta1.TextProposal',
  CommunityPoolSpendProposal = '/cosmos.distribution.v1beta1.CommunityPoolSpendProposal',
  ParameterChangeProposal = '/cosmos.gov.v1beta1.ParameterChangeProposal',
  SoftwareUpgradeProposal = '/cosmos.upgrade.v1beta1.SoftwareUpgradeProposal',
  CancelSoftwareUpgradeProposal = '/cosmos.upgrade.v1beta1.CancelSoftwareUpgradeProposal',
}
