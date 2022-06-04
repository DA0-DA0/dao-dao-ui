import { atom } from 'recoil'

import { Duration } from '@dao-dao/state/clients/cw-core'
import { PercentageThreshold } from '@dao-dao/state/clients/cw-proposal-single'

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
}: DurationWithUnits): string => `${value} ${units}`

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

export enum NewOrgStructure {
  Simple,
  UsingGovToken,
}

export enum GovernanceTokenType {
  New,
  Existing,
}

export interface NewOrg {
  structure: NewOrgStructure
  name: string
  description: string
  imageUrl?: string
  groups: NewOrgGroup[]
  _groupsError?: undefined
  votingDuration: DurationWithUnits
  governanceTokenOptions: {
    type?: GovernanceTokenType
    newInfo: {
      initialTreasuryBalance: number
      imageUrl?: string
      symbol: string
      name: string
    }
    existingGovernanceTokenAddress?: string
    // TODO: Fetch and display.
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
  _changeThresholdQuorumEnabled: boolean
  thresholdQuorum: {
    threshold: ThresholdValue
    quorum: ThresholdValue
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

export const DefaultNewOrg: NewOrg = {
  structure: NewOrgStructure.Simple,
  name: '',
  description: '',
  groups: [
    {
      name: 'Members',
      weight: 1,
      members: [],
    },
  ],
  votingDuration: {
    value: 1,
    units: DurationUnits.Weeks,
  },
  governanceTokenOptions: {
    type: GovernanceTokenType.New,
    newInfo: {
      initialTreasuryBalance: 1000000,
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
  _changeThresholdQuorumEnabled: false,
  thresholdQuorum: {
    threshold: 'majority',
    quorum: 20,
  },
}
// Default percent when selecting the percent option for custom threshold.
export const DEFAULT_NEW_ORG_THRESHOLD_PERCENT: ThresholdValue = 75
export const NEW_ORG_CW20_DECIMALS = 6

export const newOrgAtom = atom<NewOrg>({
  key: 'newOrg',
  default: DefaultNewOrg,
})
