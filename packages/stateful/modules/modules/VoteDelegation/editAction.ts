import { HugeDecimal } from '@dao-dao/math'
import {
  ActionContextType,
  Module,
  VoteDelegationModuleData,
} from '@dao-dao/types'
import { InstantiateMsg } from '@dao-dao/types/contracts/DaoVoteDelegation'
import {
  makeExecuteSmartContractMessage,
  objectMatchesStructure,
} from '@dao-dao/utils'

import { Instantiate2Action } from '../../../actions/core/actions'
import { Instantiate2Data } from '../../../actions/core/actions/Instantiate2/Component'
import { UpdateDelegationConfigAction } from './actions/UpdateDelegationConfig'
import { UpdateDelegationConfigData } from './actions/UpdateDelegationConfig/Component'

export type VoteDelegationModuleExtraData = {
  updateDelegationConfig: UpdateDelegationConfigData
  /**
   * Defined when the module is being created.
   */
  instantiateData?: Instantiate2Data
}

export const VOTE_DELEGATION_SALT_PREFIX = 'vote_delegation_'
export const VOTE_DELEGATION_LABEL_PREFIX = 'DAO DAO Vote Delegation'

/**
 * Additional actions that will be added to the proposal when the module is
 * edited. These are required for setup.
 */
export const editAction: Module<
  VoteDelegationModuleData,
  VoteDelegationModuleExtraData
>['editAction'] = {
  // Add hook messages (and optionally instantiate2).
  encode: async ({
    data: { address },
    extra: { updateDelegationConfig, instantiateData },
    options,
  }) => {
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

    const instantiate2Action = new Instantiate2Action(options)

    return [
      // Instantiate delegation contract if doesn't exist, or update config.
      // Instantiating sets the config, so no need to update it.
      ...(instantiateData
        ? [instantiate2Action.encode(instantiateData)].flat()
        : [updateDelegationConfigAction.encode(updateDelegationConfig)]),
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

    const instantiate2Action = new Instantiate2Action(options)
    const updateDelegationConfigAction = new UpdateDelegationConfigAction(
      options,
      address
    )

    const firstIsInstantiate2 =
      !!instantiate2Action.match([messages[0]]) &&
      (await instantiate2Action
        .decode([messages[0]])
        .then(
          ({ salt, label }) =>
            salt.startsWith(VOTE_DELEGATION_SALT_PREFIX) &&
            label.startsWith(VOTE_DELEGATION_LABEL_PREFIX)
        ))
    const firstIsUpdateDelegationConfig =
      !firstIsInstantiate2 &&
      !!updateDelegationConfigAction.match([messages[0]])
    if (!firstIsInstantiate2 && !firstIsUpdateDelegationConfig) {
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
  decode: async ({ data: { address }, messages, options }) => {
    // If instantiating, decode config from instantiate data.
    const instantiate2Action = new Instantiate2Action(options)
    if (instantiate2Action.match([messages[0]])) {
      const instantiateData = await instantiate2Action.decode([messages[0]])
      const instantiateMsg = JSON.parse(
        instantiateData.message
      ) as InstantiateMsg

      return {
        updateDelegationConfig: {
          validityBlocks: instantiateMsg.delegation_validity_blocks
            ? HugeDecimal.from(
                instantiateMsg.delegation_validity_blocks
              ).toString()
            : null,
          vpCapPercent: instantiateMsg.vp_cap_percent
            ? HugeDecimal.from(instantiateMsg.vp_cap_percent)
                .times(100)
                .toString()
            : undefined,
          maxDelegations: instantiateMsg.max_delegations
            ? HugeDecimal.from(instantiateMsg.max_delegations).toString()
            : undefined,
        },
        instantiateData,
      }
    }

    // If not instantiating, then first message should be the config update, and
    // `instantiateData` is undefined.
    const updateDelegationConfigAction = new UpdateDelegationConfigAction(
      options,
      address
    )
    const updateDelegationConfig = await updateDelegationConfigAction.decode([
      messages[0],
    ])

    return {
      updateDelegationConfig,
    }
  },
}
