import { ActionKey, CoreActionKey } from '@dao-dao/types'

// This returns the order value of an action for matching. It ensures the last
// actions those in the array below, since these are all catch-alls for other
// actions, custom being the broadest catch-all for all messages. Do this by
// assigning values and sorting the actions in ascending order. See
// `./provider.tsx` for usage.
export const actionKeyToMatchOrder = (key: ActionKey) =>
  (
    [
      // This is before manage storage items becuase it is a more specific item
      // management action.
      CoreActionKey.ManageWidgets,
      // Many actions are more specific item management actions.
      CoreActionKey.ManageStorageItems,
      // The upgrade action (and likely future upgrade actions) are a specific
      // migrate action, so this needs to be after all those.
      CoreActionKey.Migrate,
      // Most messages are some form of execute. Migrate and execute are
      // different, so the order between these two is irrelevant.
      CoreActionKey.Execute,
      // This is last because it catches all messages.
      CoreActionKey.Custom,
    ] as ActionKey[]
  ).indexOf(key)
