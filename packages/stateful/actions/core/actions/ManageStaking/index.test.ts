import { describe, expect, it } from 'vitest'

import { ChainId } from '@dao-dao/types'

import { isManageStakingAllowedInGovContext } from './utils'

describe('isManageStakingAllowedInGovContext', () => {
  it('allows Neutron mainnet and testnet chain governance to manage staking', () => {
    expect(isManageStakingAllowedInGovContext(ChainId.NeutronMainnet)).toBe(
      true
    )
    expect(isManageStakingAllowedInGovContext(ChainId.NeutronTestnet)).toBe(
      true
    )
  })

  it('keeps the existing chain governance staking guard for other chains', () => {
    expect(isManageStakingAllowedInGovContext(ChainId.CosmosHubMainnet)).toBe(
      false
    )
  })
})
