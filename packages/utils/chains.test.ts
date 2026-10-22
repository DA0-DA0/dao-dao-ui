import { afterAll, beforeAll, expect, test, vi } from 'vitest'

import { ChainId, SupportedChainIndexerMode } from '@dao-dao/types'

// Supported chains are empty when NODE_ENV is 'test' (see TEST_ENV), so load
// the chain helpers with a non-test environment to assert on the real config.
let getSupportedChainConfig: (typeof import('./chain'))['getSupportedChainConfig']
let chainIsIndexed: (typeof import('./chain'))['chainIsIndexed']

beforeAll(async () => {
  vi.stubEnv('NODE_ENV', 'production')
  vi.resetModules()
  ;({ getSupportedChainConfig, chainIsIndexed } = await import('./chain'))
})

afterAll(() => {
  vi.unstubAllEnvs()
  vi.resetModules()
})

test('Neutron chains are supported', () => {
  expect(getSupportedChainConfig(ChainId.NeutronMainnet)).toBeDefined()
  expect(getSupportedChainConfig(ChainId.NeutronTestnet)).toBeDefined()
})

test('Neutron chains do not redirect chain governance to a DAO contract', () => {
  expect(
    getSupportedChainConfig(ChainId.NeutronMainnet)?.govContractAddress
  ).toBeUndefined()
  expect(
    getSupportedChainConfig(ChainId.NeutronTestnet)?.govContractAddress
  ).toBeUndefined()
})

test('Neutron chains do not include subDAO entries', () => {
  expect(
    getSupportedChainConfig(ChainId.NeutronMainnet)?.subDaos
  ).toBeUndefined()
  expect(
    getSupportedChainConfig(ChainId.NeutronTestnet)?.subDaos
  ).toBeUndefined()
})

test('THORChain mainnet does not use an indexer', () => {
  expect(getSupportedChainConfig(ChainId.ThorchainMainnet)?.indexer).toBe(
    SupportedChainIndexerMode.None
  )
})

test('Neutron mainnet does not use an indexer', () => {
  expect(getSupportedChainConfig(ChainId.NeutronMainnet)?.indexer).toBe(
    SupportedChainIndexerMode.None
  )
})

test('Juno mainnet does not use an indexer', () => {
  expect(getSupportedChainConfig(ChainId.JunoMainnet)?.indexer).toBe(
    SupportedChainIndexerMode.None
  )
})

test('Osmosis mainnet does not use an indexer', () => {
  expect(getSupportedChainConfig(ChainId.OsmosisMainnet)?.indexer).toBe(
    SupportedChainIndexerMode.None
  )
})

test('Cosmos Hub mainnet does not use an indexer', () => {
  expect(getSupportedChainConfig(ChainId.CosmosHubMainnet)?.indexer).toBe(
    SupportedChainIndexerMode.None
  )
})

test('Osmosis and Cosmos Hub mainnet are not indexed in any mode', () => {
  for (const chainId of [ChainId.OsmosisMainnet, ChainId.CosmosHubMainnet]) {
    expect(
      chainIsIndexed(
        chainId,
        SupportedChainIndexerMode.Tx,
        SupportedChainIndexerMode.All
      )
    ).toBe(false)
  }
})

test('Kujira, BitSong and OmniFlix Hub are not supported chains', () => {
  for (const chainId of [
    ChainId.KujiraMainnet,
    ChainId.BitsongMainnet,
    ChainId.OmniflixHubMainnet,
    ChainId.OmniflixHubTestnet,
  ]) {
    expect(getSupportedChainConfig(chainId)).toBeUndefined()
  }
})
