// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { atom } from 'recoil'

import { DurationUnits, DurationWithUnits } from '@dao-dao/tstypes'

export enum GovernanceTokenType {
  New,
  Existing,
}

export interface NewDAO {
  tiers: NewDAOTier[]
  _tiersError?: undefined
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

// Default weight when adding a new tier for a membership-based DAO.
export const DEFAULT_NEW_DAO_MEMBERSHIP_INITIAL_TIER_WEIGHT = 1
// Default weight when adding a new tier for a token-based DAO.
export const DEFAULT_NEW_DAO_TOKEN_INITIAL_TIER_WEIGHT = 10

export const generateDefaultNewDAO = (structure: NewDAOStructure): NewDAO => ({
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
  governanceTokenOptions: {
    type: GovernanceTokenType.New,
    newInfo: {
      initialSupply: 10000000,
      initialTreasuryPercent: 90,
      symbol: '',
      name: '',
    },
    unregisterDuration: {
      value: 2,
      units: DurationUnits.Weeks,
    },
  },
})
export const NEW_DAO_CW20_DECIMALS = 6

export const newDAOAtom = atom<NewDAO>({
  key: 'newDAO',
  default: generateDefaultNewDAO(NewDAOStructure.Membership),
})
