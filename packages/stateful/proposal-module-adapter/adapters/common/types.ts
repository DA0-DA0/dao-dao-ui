import {
  DepositRefundPolicy,
  DurationWithUnits,
  GenericToken,
  PercentOrMajorityValue,
} from '@dao-dao/types'

export type DaoCreationConfigWithAllowRevoting = {
  allowRevoting: boolean
}

export type DaoCreationConfigWithProposalDeposit = {
  proposalDeposit: {
    enabled: boolean
    amount: number
    // Token input fields.
    type: 'native' | 'cw20' | 'voting_module_token'
    denomOrAddress: string
    // Loaded from token input fields to access metadata.
    token?: GenericToken
    refundPolicy: DepositRefundPolicy
  }
}

export type DaoCreationConfigWithProposalSubmissionPolicy = {
  anyoneCanPropose: boolean
}

export type DaoCreationConfigWithThreshold = {
  threshold: PercentOrMajorityValue
}

export type DaoCreationConfigWithQuorum = {
  quorumEnabled?: boolean
  quorum: PercentOrMajorityValue
}

export type DaoCreationConfigWithVotingDuration = {
  votingDuration: DurationWithUnits
}
