import { atom } from 'recoil'

import { Duration } from '@dao-dao/state/clients/cw-core'
import { PercentageThreshold } from '@dao-dao/state/clients/cw-proposal-single'
import { titlecase } from '@dao-dao/utils'

export enum DurationUnits {
  Seconds = 'seconds',
  Minutes = 'minutes',
  Hours = 'hours',
  Days = 'days',
  Weeks = 'weeks',
}
export const DurationUnitsValues = Object.values(DurationUnits)
interface DurationWithUnits {
  value: number
  units: DurationUnits
}
export const convertDurationWithUnitsToDuration = ({
  units,
  value,
}: DurationWithUnits): Duration => {
  let time
  switch (units) {
    case DurationUnits.Seconds:
      time = value
      break
    case DurationUnits.Minutes:
      time = value * 60
      break
    case DurationUnits.Hours:
      time = value * 60 * 60
      break
    case DurationUnits.Days:
      time = value * 60 * 60 * 24
      break
    case DurationUnits.Weeks:
      time = value * 60 * 60 * 24 * 7
      break
    default:
      throw new Error(`Unsupported duration unit: ${units}`)
  }
  return { time }
}
export const convertDurationWithUnitsToHumanReadableString = ({
  units,
  value,
}: DurationWithUnits): string => `${value} ${titlecase(units)}`

export enum ThresholdType {
  AbsolutePercentage,
  ThresholdQuorum,
  AbsoluteCount,
}
type ThresholdValue = 'majority' | number
export const convertThresholdValueToPercentageThreshold = (
  value: ThresholdValue
): PercentageThreshold =>
  value === 'majority'
    ? { majority: {} }
    : { percent: (value / 100).toFixed(2) }
export const convertThresholdValueToHumanReadableString = (
  value: ThresholdValue
): string => (value === 'majority' ? 'Majority' : `${value}%`)

export enum GovernanceTokenType {
  New,
  Existing,
}

export interface NewOrg {
  name: string
  description: string
  imageUrl?: string
  groups: NewOrgGroup[]
  _groupsError?: undefined
  votingDuration: DurationWithUnits
  governanceTokenEnabled: boolean
  governanceTokenOptions: {
    type?: GovernanceTokenType
    newGovernanceToken?: {
      initialSupply: number
      initialTreasuryPercent: number
      imageUrl?: string
      symbol: string
      name: string
    }
    existingGovernanceTokenAddress?: string
    _existingGovernanceTokenInfo?: {
      imageUrl?: string
      symbol: string
      name: string
    }
    proposalDeposit: {
      value: number
      refundFailed: boolean
    }
    unregisterDuration: DurationWithUnits
  }
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
  _error?: undefined
}

export interface NewOrgGroupMember {
  address: string
}

export const DefaultThresholdQuorum: NewOrg['changeThresholdQuorumOptions'] = {
  thresholdValue: 'majority',
  quorumValue: 20,
}
export const DefaultNewOrg: NewOrg = {
  name: '',
  description: '',
  groups: [
    {
      name: 'Members',
      weight: 100,
      members: [],
    },
  ],
  votingDuration: {
    value: 1,
    units: DurationUnits.Weeks,
  },
  governanceTokenEnabled: false,
  governanceTokenOptions: {
    type: GovernanceTokenType.New,
    newGovernanceToken: {
      initialSupply: 1000000,
      initialTreasuryPercent: 90,
      symbol: '',
      name: '',
    },
    proposalDeposit: {
      value: 0,
      refundFailed: false,
    },
    unregisterDuration: {
      value: 2,
      units: DurationUnits.Weeks,
    },
  },
  changeThresholdQuorumEnabled: false,
  changeThresholdQuorumOptions: DefaultThresholdQuorum,
}

export const newOrgAtom = atom<NewOrg>({
  key: 'newOrg',
  default: DefaultNewOrg,
})
