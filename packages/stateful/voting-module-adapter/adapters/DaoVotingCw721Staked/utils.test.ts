import { afterAll, beforeAll, expect, test, vi } from 'vitest'

import { ChainId } from '@dao-dao/types'

// Supported chains are empty when NODE_ENV is 'test' (see TEST_ENV), so load
// with a non-test environment to check the real chain config.
let canListCw721StakedMembers: (typeof import('./utils'))['canListCw721StakedMembers']

beforeAll(async () => {
  vi.stubEnv('NODE_ENV', 'production')
  vi.resetModules()
  ;({ canListCw721StakedMembers } = await import('./utils'))
})

afterAll(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

test('members cannot be listed on chains without an indexer', () => {
  for (const chainId of [
    ChainId.OsmosisMainnet,
    ChainId.CosmosHubMainnet,
    ChainId.JunoMainnet,
    ChainId.NeutronMainnet,
  ]) {
    expect(canListCw721StakedMembers(chainId)).toBe(false)
  }
})

test('members cannot be listed on Secret Network', () => {
  expect(canListCw721StakedMembers(ChainId.SecretMainnet)).toBe(false)
})

test('members can be listed on chains with the tx indexer', () => {
  expect(canListCw721StakedMembers(ChainId.TerraMainnet)).toBe(true)
})
