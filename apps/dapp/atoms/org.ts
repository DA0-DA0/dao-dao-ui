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
  groups: NewOrgGroup[]
  votingDuration: {
    value: number
    units: DurationUnits
  }
  variableVotingWeightsEnabled: boolean
  variableVotingWeightsOptions: {
    governanceTokenEnabled: boolean
    governanceTokenOptions: {
      newGovernanceToken?: {
        name: string
        symbol: string
        imageUrl?: string
      }
      existingGovernanceTokenAddress?: string
      proposalDeposit?: {
        value: number
        refundFailed: boolean
      }
      unregisterDuration: {
        value: number
        units: DurationUnits
      }
    }
  }
  // TODO: Initial supply stuff.
  changeThresholdQuorumEnabled: boolean
  changeThresholdQuorumOptions: {
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

export const DefaultNewOrg: Partial<NewOrg> = {
  votingDuration: {
    value: 1,
    units: DurationUnits.Weeks,
  },
  variableVotingWeightsEnabled: false,
  variableVotingWeightsOptions: {
    governanceTokenEnabled: false,
    governanceTokenOptions: {
      unregisterDuration: {
        value: 2,
        units: DurationUnits.Weeks,
      },
    },
  },
  changeThresholdQuorumEnabled: false,
  changeThresholdQuorumOptions: {
    thresholdValue: 'majority',
    quorumValue: 20,
  },
}

export const newOrgAtom = atom<Partial<NewOrg>>({
  key: 'newOrg',
  default: DefaultNewOrg,
})
