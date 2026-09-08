import type { GetStaticPropsContext } from 'next'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mocks = vi.hoisted(() => ({
  daoInit: vi.fn(),
  dehydrate: vi.fn(() => ({ dehydrated: true })),
  fetchQuery: vi.fn(),
  getDao: vi.fn(),
  processError: vi.fn(),
  networkError:
    'Network error. Ensure you are connected to the internet, refresh the page, or try again later. If your network is working, the blockchain nodes may be having problems.',
}))

vi.mock('@dao-dao/i18n/serverSideTranslations', () => ({
  serverSideTranslationsWithServerT: vi.fn(async () => ({
    i18nProps: { locale: 'en' },
    serverT: (key: string) => key,
  })),
}))

vi.mock('@dao-dao/state', () => ({
  ChainXGovDao: class {},
  contractQueries: {
    info: vi.fn(() => ({ queryKey: ['contractInfo'] })),
  },
  getDao: mocks.getDao,
  polytoneQueries: {},
  queryIndexer: vi.fn(),
}))

vi.mock('@dao-dao/utils', () => ({
  CommonError: {
    Network: mocks.networkError,
  },
  ContractName: {
    PolytoneProxy: 'polytone-proxy',
  },
  DAO_CORE_ACCENT_ITEM_KEY: 'accent',
  DAO_STATIC_PROPS_CACHE_SECONDS: 60,
  LEGACY_DAO_CONTRACT_NAMES: [],
  LEGACY_URL_PREFIX: '/legacy',
  MAX_META_CHARS_PROPOSAL_DESCRIPTION: 160,
  cosmosProtoRpcClientRouter: vi.fn(),
  cosmosSdkVersionIs46OrHigher: vi.fn(),
  decodeGovProposal: vi.fn(),
  getChainForChainId: vi.fn(() => ({ chainId: 'thorchain-1' })),
  getChainIdsForAddress: vi.fn(() => ['thorchain-1']),
  getConfiguredGovChainByName: vi.fn(),
  getDaoPath: vi.fn(),
  isErrorWithSubstring: (error: unknown, substrings: string | string[]) => {
    const message = error instanceof Error ? error.message : String(error)
    return (Array.isArray(substrings) ? substrings : [substrings]).some(
      (substring) => message.includes(substring)
    )
  },
  makeDependencyTrackedQueryClient: vi.fn(() => ({
    dehydrate: mocks.dehydrate,
    fetchQuery: mocks.fetchQuery,
  })),
  processError: mocks.processError,
}))

vi.mock('../components', () => ({}))
vi.mock('../proposal-module-adapter', () => ({
  ProposalModuleAdapterError: class extends Error {},
  matchAndLoadAdapter: vi.fn(),
}))

import { makeGetDaoStaticProps } from './makeGetDaoStaticProps'

const coreAddress = 'thor1dao'
const context = {
  locale: 'en',
  params: { address: coreAddress },
} as GetStaticPropsContext

const getStaticProps = () =>
  makeGetDaoStaticProps({ appMode: 'dapp' as never })(context)

beforeEach(() => {
  vi.clearAllMocks()
  vi.spyOn(console, 'error').mockImplementation(() => undefined)
  mocks.fetchQuery.mockResolvedValue(undefined)
  mocks.getDao.mockReturnValue({
    description: 'DAO description',
    info: { items: {} },
    init: mocks.daoInit,
    name: 'DAO name',
  })
})

describe('makeGetDaoStaticProps', () => {
  it('captures a Network error with DAO tags and rethrows it', async () => {
    const networkError = new Error('THORChain RPC fetch failed')
    mocks.daoInit.mockRejectedValue(networkError)
    mocks.processError.mockReturnValue(mocks.networkError)

    await expect(getStaticProps()).rejects.toThrow('THORChain RPC fetch failed')
    expect(mocks.processError).toHaveBeenCalledOnce()
    expect(mocks.processError).toHaveBeenCalledWith(networkError, {
      tags: {
        chainId: 'thorchain-1',
        coreAddress,
      },
      extra: { context },
      overrideCapture: {
        [mocks.networkError]: true,
      },
    })
  })

  it('returns serializable error props for a non-Network error', async () => {
    const unexpectedError = new Error('unexpected response')
    mocks.daoInit.mockRejectedValue(unexpectedError)
    mocks.processError.mockReturnValue('Processed unexpected error')

    await expect(getStaticProps()).resolves.toMatchObject({
      props: {
        title: 'title.500',
        error: 'Processed unexpected error',
      },
      revalidate: 1,
    })
    expect(mocks.processError).toHaveBeenCalledOnce()
  })

  it('returns DAO-not-found props when the contract is missing', async () => {
    mocks.daoInit.mockRejectedValue(new Error('contract: not found'))

    await expect(getStaticProps()).resolves.toMatchObject({
      props: {
        title: 'DAO not found',
      },
      revalidate: 1,
    })
    expect(mocks.processError).not.toHaveBeenCalled()
  })

  it('returns initialized DAO info with the normal revalidation interval', async () => {
    mocks.daoInit.mockResolvedValue(undefined)

    await expect(getStaticProps()).resolves.toMatchObject({
      props: {
        title: 'DAO name',
        description: 'DAO description',
        info: { items: {} },
      },
      revalidate: 60,
    })
    expect(mocks.processError).not.toHaveBeenCalled()
  })
})
