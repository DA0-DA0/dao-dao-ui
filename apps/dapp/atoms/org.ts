import { atom } from 'recoil'

export enum DurationUnits {
  Seconds = 'seconds',
  Minutes = 'minutes',
  Hours = 'hours',
  Days = 'days',
  Weeks = 'weeks',
  Months = 'months',
}
export const DurationUnitsValues = Object.values(DurationUnits)

export enum ThresholdType {
  AbsolutePercentage,
  ThresholdQuorum,
  AbsoluteCount,
}
type ThresholdValue = 'majority' | number

export interface NewOrg {
  name: string
  description?: string
  imageUrl?: string
  // Voting power
  groups: NewOrgGroup[]
  variableVotingWeightsEnabled: boolean
  governanceTokenEnabled: boolean
  unstakingDuration: {
    value: number
    units: DurationUnits
  }
  existingGovernanceTokenAddress?: string
  newGovernanceToken?: {
    name: string
    symbol: string
    imageUrl?: string
  }
  // TODO: Initial supply stuff.
  // Proposal
  changeThresholdQuorumEnabled: boolean
  allowRevoting: boolean
  depositInfo?: {
    deposit: number
    refundFailedProposals: boolean
  }
  votingDuration: {
    value: number
    units: DurationUnits
  }
  threshold: {
    type: ThresholdType
    thresholdValue: ThresholdValue
    quorumValue: ThresholdValue
  }
}

export interface NewOrgGroup {
  name: string
  weight: number
  members: NewOrgGroupMember[]
}

export interface NewOrgGroupMember {
  address: string
  proportion: number
}

export const newOrgAtom = atom<Partial<NewOrg>>({
  key: 'newOrg',
  default: {
    variableVotingWeightsEnabled: false,
    governanceTokenEnabled: false,
    unstakingDuration: {
      value: 2,
      units: DurationUnits.Weeks,
    },
    changeThresholdQuorumEnabled: false,
    allowRevoting: false,
    votingDuration: {
      value: 1,
      units: DurationUnits.Weeks,
    },
    threshold: {
      type: ThresholdType.ThresholdQuorum,
      thresholdValue: 'majority',
      quorumValue: 20,
    },
  },
})
