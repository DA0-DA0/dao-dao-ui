import {
  Module,
  VestingPaymentsModuleData,
  VestingPaymentsModuleExtraData,
} from '@dao-dao/types'

import { Instantiate2Action } from '../../../actions/core/actions'

/**
 * Additional actions that will be added to the proposal when the module is
 * edited. These are required for setup.
 */
export const editAction: Module<
  VestingPaymentsModuleData,
  VestingPaymentsModuleExtraData
>['editAction'] = {
  // Add hook messages.
  encode: async ({ extra, options }) => {
    const instantiate2Action = new Instantiate2Action(options)

    // Create factories that need to be created via instantiate2.
    const factories = Object.entries(extra?.factories || {})

    return factories.flatMap(
      ([chainId, { codeId, label, msg, salt, daoChainAccountAddress }]) =>
        instantiate2Action.encode({
          chainId,
          sender: daoChainAccountAddress,
          admin: daoChainAccountAddress,
          codeId,
          label,
          message: JSON.stringify(msg, null, 2),
          salt,
          funds: [],
        })
    )
  },
  // Match hook messages.
  match: async ({ messages, options }) => {
    const instantiate2Action = new Instantiate2Action(options)

    // Count all consecutive matches for the instantiate2 action that match the
    // expected fields, stopping at the first non-match.
    let matches = 0
    for (const message of messages) {
      if (instantiate2Action.match([message])) {
        const { label, salt } = await instantiate2Action.decode([message])
        // If found expected instantiate2 message format, count and continue.
        if (
          label.startsWith('VestingFactory-v') &&
          salt.startsWith('vesting_payments_')
        ) {
          matches++
          continue
        }
      }

      // If not expected format, stop.
      break
    }

    return matches
  },
  decode: async ({ messages, options }) => {
    const instantiate2Action = new Instantiate2Action(options)

    const decoded = await Promise.all(
      messages.map((message) => instantiate2Action.decode([message]))
    )

    return {
      factories: Object.fromEntries(
        decoded.map(({ chainId, sender, codeId, label, message, salt }) => [
          chainId,
          {
            codeId,
            label,
            msg: JSON.parse(message),
            salt,
            daoChainAccountAddress: sender,
          },
        ])
      ),
    }
  },
}
