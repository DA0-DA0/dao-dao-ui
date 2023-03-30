import { ActionKey, CoreActionKey } from '@dao-dao/types'

// This returns the order value of an action for matching. It ensures the last
// four actions are set items, migrate smart contract, execute smart contract,
// and custom, since these are all catch-alls for other actions, custom being
// the broadest catch-all for all messages. Do this by assigning values and
// sorting the actions in ascending order. See `./provider.tsx` for usage.
export const actionKeyToMatchOrder = (key: ActionKey) =>
  (
    [
      CoreActionKey.ManageStorageItems,
      CoreActionKey.Migrate,
      CoreActionKey.Execute,
      CoreActionKey.Custom,
    ] as ActionKey[]
  ).indexOf(key)
