import { expect, test } from 'vitest'

import { ChainId } from '@dao-dao/types'

import { getSupportedChainConfig } from './chain'

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
