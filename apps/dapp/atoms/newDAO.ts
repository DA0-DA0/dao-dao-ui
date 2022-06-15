import { atom } from 'recoil'

import i18n from '@dao-dao/i18n'
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
export type ThresholdValue = 'majority' | number
export const convertThresholdValueToPercentageThreshold = (
  value: ThresholdValue
): PercentageThreshold =>
  value === 'majority'
    ? { majority: {} }
    : { percent: (value / 100).toFixed(2) }
export const convertThresholdValueToHumanReadableString = (
  value: ThresholdValue
): string => (value === 'majority' ? i18n.t('Majority') : `${value}%`)

export enum NewDAOStructure {
  Membership,
  GovernanceToken,
}

export enum GovernanceTokenType {
  New,
  Existing,
}

export interface NewDAO {
  structure: NewDAOStructure
  name: string
  description: string
  imageUrl?: string
  tiers: NewDAOTier[]
  _tiersError?: undefined
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

export interface NewDAOTier {
  name: string
  weight: number
  members: NewDAOTierMember[]
  _error?: undefined
}

export interface NewDAOTierMember {
  address: string
}

// Default percent when selecting the percent option for custom threshold.
export const DEFAULT_NEW_DAO_THRESHOLD_PERCENT: ThresholdValue = 75
// Default weight when adding a new tier for a simple DAO.
export const DEFAULT_NEW_DAO_SIMPLE_INITIAL_TIER_WEIGHT = 1
// Default weight when adding a new tier for a governance token-based DAO.
export const DEFAULT_NEW_DAO_GOV_TOKEN_INITIAL_TIER_WEIGHT = 1000

export const DefaultNewDAO: NewDAO = {
  structure: NewDAOStructure.Membership,
  name: '',
  description: '',
  tiers: [
    {
      name: i18n.t('Default tier name'),
      weight: DEFAULT_NEW_DAO_SIMPLE_INITIAL_TIER_WEIGHT,
      members: [
        {
          address: '',
        },
      ],
    },
  ],
  votingDuration: {
    value: 1,
    units: DurationUnits.Weeks,
  },
  governanceTokenOptions: {
    type: GovernanceTokenType.New,
    newInfo: {
      initialTreasuryBalance: 100000,
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
export const NEW_DAO_CW20_DECIMALS = 6

export const newDAOAtom = atom<NewDAO>({
  key: 'newDAO',
  default: DefaultNewDAO,
})
