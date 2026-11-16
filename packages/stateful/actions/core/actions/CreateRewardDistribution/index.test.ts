import { describe, expect, test, vi } from 'vitest'

import { TokenType } from '@dao-dao/types'
import {
  ActionChainContextType,
  ActionContextType,
} from '@dao-dao/types/actions'
import { DurationUnits } from '@dao-dao/types/units'
import {
  decodeMessage,
  getRewardDistributorStorageItemKey,
} from '@dao-dao/utils'

vi.mock('../../../../hooks', () => ({ useQueryLoadingDataWithError: vi.fn() }))
vi.mock('../../../hooks', () => ({ useTokenBalances: vi.fn() }))
vi.mock('../Instantiate2', () => ({
  Instantiate2Action: class {
    setup = vi.fn()
  },
}))
vi.mock('../ManageStorageItems', () => ({
  ManageStorageItemsAction: class {
    setup = vi.fn()
  },
}))
vi.mock('./Component', () => ({ CreateRewardDistributionComponent: vi.fn() }))

import { CreateRewardDistributionAction } from './index'

const DAO = 'juno1dao'
const VOTING_MODULE = 'juno1voting'
const DISTRIBUTOR = 'juno1distributor'
const UNSUPPORTED_MESSAGE =
  "This DAO's voting module does not support reward distributions."

const data = {
  type: TokenType.Native,
  denomOrAddress: 'ujuno',
  immediate: false,
  rate: {
    amount: '1',
    duration: { value: 1, units: DurationUnits.Hours },
  },
  initialFunds: '0',
  openFunding: true,
}

const makeAction = (supportsHooks: boolean) => {
  const votingModule = {
    address: VOTING_MODULE,
    supportsHooks,
    getHookCaller: vi.fn(() => VOTING_MODULE),
    // Mirrors NativeStakedVotingModule, whose contract has no hooks.
    getHooks: vi.fn(async () => {
      if (!supportsHooks) {
        throw new Error('Not implemented')
      }
      return []
    }),
  }

  const action = new CreateRewardDistributionAction({
    t: ((key: string) =>
      key === 'error.votingModuleRewardDistributionsUnsupported'
        ? UNSUPPORTED_MESSAGE
        : key) as any,
    address: DAO,
    chain: { chainId: 'juno-1' } as any,
    chainContext: {
      type: ActionChainContextType.Supported,
      config: { codeIds: { DaoRewardsDistributor: 1 } },
    } as any,
    context: {
      type: ActionContextType.Dao,
      dao: {
        votingModule,
        // An existing distributor, so encode skips instantiation.
        info: {
          items: {
            [getRewardDistributorStorageItemKey('1')]: DISTRIBUTOR,
          },
        },
      },
    } as any,
    queryClient: {
      fetchQuery: vi.fn(async () => ({ decimals: 6 })),
    } as any,
  } as any)

  return { action, votingModule }
}

describe('voting module without hook support (e.g. native staked)', () => {
  test('init fails with a clear explanation, disabling the action', async () => {
    const { action } = makeAction(false)

    await expect(action.init()).rejects.toThrow(UNSUPPORTED_MESSAGE)
    expect(action.status).toBe('error')
    expect(action.error?.message).toBe(UNSUPPORTED_MESSAGE)
  })

  test('encode fails with a clear explanation instead of "Not implemented"', async () => {
    const { action, votingModule } = makeAction(false)

    await expect(action.encode(data)).rejects.toThrow(UNSUPPORTED_MESSAGE)
    expect(votingModule.getHooks).not.toHaveBeenCalled()
  })
})

describe('voting module with hook support', () => {
  test('init succeeds and encode adds the distributor hook', async () => {
    const { action, votingModule } = makeAction(true)

    await action.init()
    expect(action.status).toBe('ready')

    const messages = await action.encode(data)
    expect(votingModule.getHooks).toHaveBeenCalledTimes(1)
    expect(messages.map((msg) => decodeMessage(msg))).toMatchObject([
      {
        wasm: {
          execute: {
            contract_addr: DISTRIBUTOR,
            msg: {
              create: {
                hook_caller: VOTING_MODULE,
                vp_contract: VOTING_MODULE,
              },
            },
          },
        },
      },
      {
        wasm: {
          execute: {
            contract_addr: VOTING_MODULE,
            msg: { add_hook: { addr: DISTRIBUTOR } },
          },
        },
      },
    ])
  })
})
