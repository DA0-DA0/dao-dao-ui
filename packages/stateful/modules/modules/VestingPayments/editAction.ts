import { Module, VestingPaymentsModuleData } from '@dao-dao/types'

import { Instantiate2Action } from '../../../actions/core/actions'
import { Instantiate2Data } from '../../../actions/core/actions/Instantiate2/Component'

/**
 * Data used to instantiate new vesting payment factories.
 */
export type VestingPaymentsModuleExtraData = {
  /**
   * The factories to create via instantiate2. Map of chain ID to factory
   * information.
   */
  factories: Record<string, Instantiate2Data>
}

export const VESTING_PAYMENTS_SALT_PREFIX = 'vesting_payments_'
export const VESTING_PAYMENTS_LABEL_PREFIX = 'VestingFactory-'

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
    return Object.values(extra?.factories || {}).flatMap((data) =>
      instantiate2Action.encode(data)
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
          salt.startsWith(VESTING_PAYMENTS_SALT_PREFIX) &&
          label.startsWith(VESTING_PAYMENTS_LABEL_PREFIX)
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
        decoded.map((data) => [data.chainId, data])
      ),
    }
  },
}
