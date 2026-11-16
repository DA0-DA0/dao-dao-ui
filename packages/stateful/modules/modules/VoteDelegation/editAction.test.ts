import { describe, expect, test, vi } from 'vitest'

import { ActionContextType } from '@dao-dao/types/actions'
import { decodeMessage, makeExecuteSmartContractMessage } from '@dao-dao/utils'

const UPDATE_CONFIG_MSG = makeExecuteSmartContractMessage({
  chainId: 'juno-1',
  sender: 'juno1dao',
  contractAddress: 'juno1delegation',
  msg: { update_config: {} },
})

vi.mock('../../../actions/core/actions', () => ({
  Instantiate2Action: class {
    encode = vi.fn()
    match = vi.fn(() => false)
  },
}))
vi.mock('./actions/UpdateDelegationConfig', () => ({
  UpdateDelegationConfigAction: class {
    encode = vi.fn(() => UPDATE_CONFIG_MSG)
    match = vi.fn(() => true)
  },
}))

import { editAction } from './editAction'

const DAO = 'juno1dao'
const VOTING_MODULE = 'juno1voting'
const PROPOSAL_MODULE = 'juno1proposal'
const DELEGATION = 'juno1delegation'
const UNSUPPORTED_MESSAGE =
  "This DAO's voting module does not support vote delegation."

const updateDelegationConfig = {
  validityBlocks: '100',
  vpCapPercent: '10',
  maxDelegations: '50',
}

/**
 * Create action options for a DAO whose voting module does or does not support
 * hooks. `getHookCaller` mirrors the real clients: native staked returns its
 * address, while the fallback and Neutron voting registry modules throw.
 */
const makeOptions = ({
  supportsHooks,
  hookCallerThrows = false,
}: {
  supportsHooks: boolean
  hookCallerThrows?: boolean
}) => {
  const votingModule = {
    address: VOTING_MODULE,
    supportsHooks,
    getHookCaller: vi.fn(() => {
      if (hookCallerThrows) {
        throw new Error('Not implemented')
      }
      return VOTING_MODULE
    }),
  }

  const options = {
    t: ((key: string) =>
      key === 'error.votingModuleVoteDelegationUnsupported'
        ? UNSUPPORTED_MESSAGE
        : key) as any,
    address: DAO,
    chain: { chainId: 'juno-1' },
    context: {
      type: ActionContextType.Dao,
      dao: {
        chainId: 'juno-1',
        coreAddress: DAO,
        votingModule,
        proposalModules: [{ address: PROPOSAL_MODULE }],
      },
    },
  } as any

  return { options, votingModule }
}

const encode = (options: any) =>
  editAction!.encode({
    data: { address: DELEGATION },
    extra: { updateDelegationConfig },
    options,
  })

const toProcessed = (msgs: any[]) =>
  msgs.map((msg) => ({ decodedMessage: decodeMessage(msg) })) as any

describe('voting module without hook support (e.g. native staked)', () => {
  test('encode fails with a clear explanation instead of encoding a hook', async () => {
    const { options, votingModule } = makeOptions({ supportsHooks: false })

    await expect(encode(options)).rejects.toThrow(UNSUPPORTED_MESSAGE)
    expect(votingModule.getHookCaller).not.toHaveBeenCalled()
  })

  test('encode fails with a clear explanation instead of "Not implemented"', async () => {
    const { options } = makeOptions({
      supportsHooks: false,
      hookCallerThrows: true,
    })

    await expect(encode(options)).rejects.toThrow(UNSUPPORTED_MESSAGE)
  })

  test('match still recognizes existing proposals when the hook caller is unavailable', async () => {
    const { options: supportedOptions } = makeOptions({ supportsHooks: true })
    const messages = toProcessed([await encode(supportedOptions)].flat())

    const { options } = makeOptions({
      supportsHooks: false,
      hookCallerThrows: true,
    })
    await expect(
      editAction!.match({
        data: { address: DELEGATION },
        messages,
        options,
      })
    ).resolves.toBe(4)
  })
})

describe('voting module with hook support', () => {
  test('encode adds the voting module and proposal module hooks', async () => {
    const { options, votingModule } = makeOptions({ supportsHooks: true })

    const messages = [await encode(options)].flat()
    expect(votingModule.getHookCaller).toHaveBeenCalledTimes(1)
    expect(messages.map((msg) => decodeMessage(msg))).toMatchObject([
      { wasm: { execute: { contract_addr: DELEGATION } } },
      {
        wasm: {
          execute: {
            contract_addr: VOTING_MODULE,
            msg: { add_hook: { addr: DELEGATION } },
          },
        },
      },
      {
        wasm: {
          execute: {
            contract_addr: PROPOSAL_MODULE,
            msg: { add_vote_hook: { address: DELEGATION } },
          },
        },
      },
      {
        wasm: {
          execute: {
            contract_addr: PROPOSAL_MODULE,
            msg: { update_delegation_module: { module: DELEGATION } },
          },
        },
      },
    ])
  })

  test('match requires the hook message to target the hook caller', async () => {
    const { options } = makeOptions({ supportsHooks: true })
    const messages = toProcessed([await encode(options)].flat())

    await expect(
      editAction!.match({ data: { address: DELEGATION }, messages, options })
    ).resolves.toBe(4)

    messages[1].decodedMessage.wasm.execute.contract_addr = 'juno1other'
    await expect(
      editAction!.match({ data: { address: DELEGATION }, messages, options })
    ).resolves.toBe(false)
  })
})
