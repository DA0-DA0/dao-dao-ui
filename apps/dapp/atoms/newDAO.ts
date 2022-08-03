import { atom } from 'recoil'

import { Duration } from '@dao-dao/state/clients/cw-core/0.1.0'
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

export const convertThresholdValueToCwProposalSinglePercentageThreshold = (
  value: ThresholdValue
): PercentageThreshold =>
  value === 'majority'
    ? { majority: {} }
    : { percent: (value / 100).toFixed(2) }

export enum NewDAOStructure {
  Membership,
  GovernanceToken,
  NativeToken,
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
    type: GovernanceTokenType
    newInfo: {
      initialSupply: number
      initialTreasuryPercent: number
      imageUrl?: string
      symbol: string
      name: string
    }
    existingGovernanceTokenAddress?: string
    // TokenInfoResponse
    existingGovernanceTokenInfo?: {
      decimals: number
      name: string
      symbol: string
      total_supply: string
      _error?: undefined
    }
    proposalDeposit: {
      value: number
      refundFailed: boolean
    }
    unregisterDuration: DurationWithUnits
  }
  showAdvancedVotingConfig: boolean
  advancedVotingConfig: {
    allowRevoting: boolean
    thresholdQuorum: {
      threshold: ThresholdValue
      quorumEnabled: boolean
      quorum: ThresholdValue
    }
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
// Default weight when adding a new tier for a membership-based DAO.
export const DEFAULT_NEW_DAO_MEMBERSHIP_INITIAL_TIER_WEIGHT = 1
// Default weight when adding a new tier for a token-based DAO.
export const DEFAULT_NEW_DAO_TOKEN_INITIAL_TIER_WEIGHT = 10

export const generateDefaultNewDAO = (structure: NewDAOStructure): NewDAO => ({
  structure,
  name: '',
  description: '',
  tiers: [
    {
      name: '',
      weight:
        structure === NewDAOStructure.Membership
          ? DEFAULT_NEW_DAO_MEMBERSHIP_INITIAL_TIER_WEIGHT
          : DEFAULT_NEW_DAO_TOKEN_INITIAL_TIER_WEIGHT,
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
      initialSupply: 10000000,
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
  showAdvancedVotingConfig: false,
  advancedVotingConfig: {
    allowRevoting: structure !== NewDAOStructure.Membership,
    thresholdQuorum: {
      threshold: 'majority',
      quorumEnabled: true,
      quorum: 20,
    },
  },
})
export const NEW_DAO_CW20_DECIMALS = 6

export const newDAOAtom = atom<NewDAO>({
  key: 'newDAO',
  default: generateDefaultNewDAO(NewDAOStructure.Membership),
})
