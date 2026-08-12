import { beforeEach, describe, expect, test, vi } from 'vitest'

import { ChainId } from '@dao-dao/types'

const mocks = vi.hoisted(() => ({
  queryContractSmart: vi.fn(),
  getCosmWasmClientForChainId: vi.fn(),
}))

vi.mock('@dao-dao/utils', async (importOriginal) => ({
  ...(await importOriginal<typeof import('@dao-dao/utils')>()),
  getCosmWasmClientForChainId: mocks.getCosmWasmClientForChainId,
}))

import { cwProposalSingleV1Queries } from './CwProposalSingle.v1'
import { daoProposalMultipleQueries } from './DaoProposalMultiple'
import { daoProposalSingleV2Queries } from './DaoProposalSingle.v2'

const contractAddress = 'thor1proposalmodule'
const families = [
  ['single v2', daoProposalSingleV2Queries],
  ['multiple', daoProposalMultipleQueries],
  ['cw single v1', cwProposalSingleV1Queries],
] as const

const run = async (options: { queryFn?: unknown }, fetchQuery = vi.fn()) =>
  (options.queryFn as (ctx: unknown) => Promise<unknown>)({
    client: { fetchQuery },
  })

beforeEach(() => {
  vi.clearAllMocks()
  mocks.getCosmWasmClientForChainId.mockResolvedValue({
    queryContractSmart: mocks.queryContractSmart,
  })
})

describe.each(families)('%s indexer selection', (_, queries) => {
  test('uses direct forward and reverse pagination without an indexer', async () => {
    const fetchQuery = vi.fn()
    mocks.queryContractSmart.mockResolvedValue({ proposals: [] })

    await expect(
      run(
        queries.listProposals({
          chainId: ChainId.ThorchainMainnet,
          contractAddress,
          args: { limit: 7, startAfter: 12 },
        }),
        fetchQuery
      )
    ).resolves.toEqual({ proposals: [] })
    expect(mocks.queryContractSmart).toHaveBeenLastCalledWith(contractAddress, {
      list_proposals: { limit: 7, start_after: 12 },
    })

    await expect(
      run(
        queries.reverseProposals({
          chainId: ChainId.ThorchainMainnet,
          contractAddress,
          args: { limit: 7, startBefore: 44 },
        }),
        fetchQuery
      )
    ).resolves.toEqual({ proposals: [] })
    expect(mocks.queryContractSmart).toHaveBeenLastCalledWith(contractAddress, {
      reverse_proposals: { limit: 7, start_before: 44 },
    })
    expect(fetchQuery).not.toHaveBeenCalled()
  })

  test('uses direct vote pagination without an indexer', async () => {
    const fetchQuery = vi.fn()
    mocks.queryContractSmart.mockResolvedValue({ votes: [] })

    await expect(
      run(
        queries.listVotes({
          chainId: ChainId.ThorchainMainnet,
          contractAddress,
          args: { limit: 7, proposalId: 44, startAfter: 'thor1voter' },
        }),
        fetchQuery
      )
    ).resolves.toEqual({ votes: [] })
    expect(mocks.queryContractSmart).toHaveBeenCalledWith(contractAddress, {
      list_votes: {
        limit: 7,
        proposal_id: 44,
        start_after: 'thor1voter',
      },
    })
    mocks.queryContractSmart.mockResolvedValue({ vote: null })
    const singleVote = 'getVote' in queries ? queries.getVote : queries.vote
    await expect(
      run(
        singleVote({
          chainId: ChainId.ThorchainMainnet,
          contractAddress,
          args: { proposalId: 44, voter: 'thor1voter' },
        }),
        fetchQuery
      )
    ).resolves.toEqual({ vote: null })
    expect(fetchQuery).not.toHaveBeenCalled()
  })

  test('preserves empty indexed pages and falls back for null lists', async () => {
    const indexedEmpty = vi.fn().mockResolvedValue([])
    await expect(
      run(
        queries.listProposals({
          chainId: ChainId.JunoMainnet,
          contractAddress,
          args: { limit: 7, startAfter: 12 },
        }),
        indexedEmpty
      )
    ).resolves.toEqual({ proposals: [] })
    expect(mocks.queryContractSmart).not.toHaveBeenCalled()

    const indexedVote = vi.fn().mockResolvedValue(null)
    const singleVote = 'getVote' in queries ? queries.getVote : queries.vote
    await expect(
      run(
        singleVote({
          chainId: ChainId.JunoMainnet,
          contractAddress,
          args: { proposalId: 44, voter: 'juno1voter' },
        }),
        indexedVote
      )
    ).resolves.toEqual({ vote: null })
    expect(mocks.queryContractSmart).not.toHaveBeenCalled()

    const nullListCases = [
      [
        queries.listProposals({
          chainId: ChainId.JunoMainnet,
          contractAddress,
          args: { limit: 7, startAfter: 12 },
        }),
        { proposals: ['direct'] },
      ],
      [
        queries.reverseProposals({
          chainId: ChainId.JunoMainnet,
          contractAddress,
          args: { limit: 7, startBefore: 44 },
        }),
        { proposals: ['direct'] },
      ],
      [
        queries.listVotes({
          chainId: ChainId.JunoMainnet,
          contractAddress,
          args: { limit: 7, proposalId: 44, startAfter: 'juno1voter' },
        }),
        { votes: ['direct'] },
      ],
    ] as const

    for (const [query, directResult] of nullListCases) {
      mocks.queryContractSmart.mockResolvedValueOnce(directResult)
      await expect(
        run(query, vi.fn().mockResolvedValue(null))
      ).resolves.toEqual(directResult)
    }
  })

  test('falls back to the direct query when an indexed request fails', async () => {
    mocks.queryContractSmart.mockResolvedValue({ proposals: ['direct'] })

    await expect(
      run(
        queries.reverseProposals({
          chainId: ChainId.JunoMainnet,
          contractAddress,
          args: { limit: 7, startBefore: 44 },
        }),
        vi.fn().mockRejectedValue(new Error('indexer unavailable'))
      )
    ).resolves.toEqual({ proposals: ['direct'] })
  })

  test('propagates direct query failures', async () => {
    mocks.queryContractSmart.mockRejectedValue(
      new Error('THORChain RPC unavailable')
    )

    await expect(
      run(
        queries.reverseProposals({
          chainId: ChainId.ThorchainMainnet,
          contractAddress,
          args: { limit: 7, startBefore: 44 },
        })
      )
    ).rejects.toThrow('THORChain RPC unavailable')
  })

  test('falls back to direct query when indexer is stale on the first reverseProposals page', async () => {
    // Indexer's highest known proposal is #41, but on-chain count is 44.
    mocks.queryContractSmart.mockResolvedValueOnce(44) // proposalCount
    mocks.queryContractSmart.mockResolvedValueOnce({
      proposals: [{ id: 44 }],
    }) // direct reverseProposals fallback

    await expect(
      run(
        queries.reverseProposals({
          chainId: ChainId.JunoMainnet,
          contractAddress,
          args: { limit: 7 },
        }),
        vi.fn().mockResolvedValue([{ id: 41 }, { id: 40 }])
      )
    ).resolves.toEqual({ proposals: [{ id: 44 }] })
  })

  test('trusts indexer data on the first reverseProposals page when up to date', async () => {
    mocks.queryContractSmart.mockResolvedValueOnce(41) // proposalCount

    await expect(
      run(
        queries.reverseProposals({
          chainId: ChainId.JunoMainnet,
          contractAddress,
          args: { limit: 7 },
        }),
        vi.fn().mockResolvedValue([{ id: 41 }, { id: 40 }])
      )
    ).resolves.toEqual({ proposals: [{ id: 41 }, { id: 40 }] })
  })

  test('trusts indexer data on the first reverseProposals page when staleness check fails', async () => {
    mocks.queryContractSmart.mockRejectedValueOnce(
      new Error('RPC unavailable')
    )

    await expect(
      run(
        queries.reverseProposals({
          chainId: ChainId.JunoMainnet,
          contractAddress,
          args: { limit: 7 },
        }),
        vi.fn().mockResolvedValue([{ id: 41 }, { id: 40 }])
      )
    ).resolves.toEqual({ proposals: [{ id: 41 }, { id: 40 }] })
  })

  test('does not run staleness check on paginated reverseProposals pages', async () => {
    await expect(
      run(
        queries.reverseProposals({
          chainId: ChainId.JunoMainnet,
          contractAddress,
          args: { limit: 7, startBefore: 40 },
        }),
        vi.fn().mockResolvedValue([{ id: 39 }, { id: 38 }])
      )
    ).resolves.toEqual({ proposals: [{ id: 39 }, { id: 38 }] })
    expect(mocks.queryContractSmart).not.toHaveBeenCalled()
  })
})
