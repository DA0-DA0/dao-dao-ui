import {
  ActionContextType,
  Module,
  VoteDelegationModuleData,
} from '@dao-dao/types'
import {
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { UpdateDelegationConfigAction } from './actions/UpdateDelegationConfig'
import { UpdateDelegationConfigData } from './actions/UpdateDelegationConfig/Component'

/**
 * Additional actions that will be added to the proposal when the module is
 * edited. These are required for setup.
 */
export const editAction: Module<
  VoteDelegationModuleData,
  UpdateDelegationConfigData
>['editAction'] = {
  // Add hook messages.
  encode: async ({ data: { address }, extra, options }) => {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Invalid context')
    }
    const { dao } = options.context

    const hookCaller = await dao.votingModule.getHookCaller()

    if (!address) {
      throw new Error('Vote delegation contract not yet created.')
    }
    const updateDelegationConfigAction = new UpdateDelegationConfigAction(
      options,
      address
    )

    return [
      // Update delegation config.
      updateDelegationConfigAction.encode(extra),
      // Voting module hook.
      makeExecuteSmartContractMessage({
        chainId: dao.chainId,
        sender: dao.coreAddress,
        contractAddress: hookCaller,
        msg: {
          add_hook: {
            addr: address,
          },
        },
      }),
      // Proposal module vote hooks and delegation module updates.
      ...dao.proposalModules.flatMap((proposalModule) => [
        // Vote hook.
        makeExecuteSmartContractMessage({
          chainId: dao.chainId,
          sender: dao.coreAddress,
          contractAddress: proposalModule.address,
          msg: {
            add_vote_hook: { address },
          },
        }),
        // Delegation module update.
        makeExecuteSmartContractMessage({
          chainId: dao.chainId,
          sender: dao.coreAddress,
          contractAddress: proposalModule.address,
          msg: {
            update_delegation_module: {
              module: address,
            },
          },
        }),
      ]),
    ]
  },
  // Match hook messages.
  match: async ({ data: { address }, messages, options }) => {
    if (options.context.type !== ActionContextType.Dao) {
      throw new Error('Invalid context')
    }
    const { dao } = options.context

    const hookCaller = await dao.votingModule.getHookCaller()

    const updateDelegationConfigAction = new UpdateDelegationConfigAction(
      options,
      address
    )

    const firstIsUpdateDelegationConfig = !!updateDelegationConfigAction.match(
      messages.slice(0, 1)
    )
    if (!firstIsUpdateDelegationConfig) {
      return false
    }

    const secondIsVotingModule =
      objectMatchesStructure(messages[1].decodedMessage, {
        wasm: {
          execute: {
            contract_addr: {},
            msg: {
              add_hook: {
                addr: {},
              },
            },
          },
        },
      }) &&
      messages[1].decodedMessage.wasm.execute.contract_addr === hookCaller &&
      messages[1].decodedMessage.wasm.execute.msg.add_hook.addr === address
    if (!secondIsVotingModule) {
      return false
    }

    // Match at least two messages for the config update and voting module hook
    // caller above.
    let matches = 2

    // Loop over the rest of the messages and count adjacent proposal module
    // add_vote_hook and update_delegation_module messages.
    for (const { decodedMessage } of messages.slice(2)) {
      const isProposalModuleMessage =
        // Add vote hook.
        ((objectMatchesStructure(decodedMessage, {
          wasm: {
            execute: {
              contract_addr: {},
              msg: {
                add_vote_hook: {
                  address: {},
                },
              },
            },
          },
        }) &&
          decodedMessage.wasm.execute.msg.add_vote_hook.address === address) ||
          // Update delegation module.
          (objectMatchesStructure(decodedMessage, {
            wasm: {
              execute: {
                contract_addr: {},
                msg: {
                  update_delegation_module: {
                    module: {},
                  },
                },
              },
            },
          }) &&
            decodedMessage.wasm.execute.msg.update_delegation_module.module ===
              address)) &&
        dao.proposalModules.some(
          (p) => decodedMessage.wasm.execute.contract_addr === p.address
        )

      if (!isProposalModuleMessage) {
        break
      }

      // Stop at the first non-match since we expect these to be adjacent.
      matches++
    }

    return matches
  },
  // Decode extra data.
  decode: ({ data: { address }, messages, options }) => {
    const updateDelegationConfigAction = new UpdateDelegationConfigAction(
      options,
      address
    )

    // First message should be the config update.
    return updateDelegationConfigAction.decode([messages[0]])
  },
}
