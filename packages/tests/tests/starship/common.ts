import { beforeAll } from 'vitest'

import { ContractVersion } from '@dao-dao/types'

import { TestSuite } from '../suite'

export let suite: TestSuite

beforeAll(async () => {
  suite = await TestSuite.initStarship('neutron', ContractVersion.V270)
  await suite.ensureChainSetUp()
})
