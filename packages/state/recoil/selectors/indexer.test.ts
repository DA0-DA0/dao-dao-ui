import { snapshot_UNSTABLE } from 'recoil'
import { beforeEach, expect, test, vi } from 'vitest'

import {
  ChainId,
  IndexerFormulaType,
  SupportedChainIndexerMode,
} from '@dao-dao/types'

const mocks = vi.hoisted(() => ({
  queryIndexer: vi.fn(),
  queryIndexerUpStatus: vi.fn(),
}))

vi.mock('../../indexer', async (importOriginal) => ({
  ...(await importOriginal<typeof import('../../indexer')>()),
  queryIndexer: mocks.queryIndexer,
  queryIndexerUpStatus: mocks.queryIndexerUpStatus,
}))

import { queryIndexerSelector } from './indexer'

beforeEach(() => {
  vi.clearAllMocks()
  mocks.queryIndexerUpStatus.mockResolvedValue({ caughtUp: true })
  mocks.queryIndexer.mockResolvedValue([])
})

test('skips every indexer operation when the configured mode is None', async () => {
  const value = await snapshot_UNSTABLE().getPromise(
    queryIndexerSelector({
      type: IndexerFormulaType.Contract,
      address: 'thor1proposalmodule',
      chainId: ChainId.ThorchainMainnet,
      formula: 'daoProposalSingle/reverseProposals',
      allowedModes: [
        SupportedChainIndexerMode.Tx,
        SupportedChainIndexerMode.All,
      ],
    })
  )

  expect(value).toBeNull()
  expect(mocks.queryIndexerUpStatus).not.toHaveBeenCalled()
  expect(mocks.queryIndexer).not.toHaveBeenCalled()
})
