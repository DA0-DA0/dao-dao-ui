import { ActionKey } from '@dao-dao/types'

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
      ActionKey.ManageWidgets,
      // Many actions are more specific item management actions.
      ActionKey.ManageStorageItems,
      // The upgrade action (and likely future upgrade actions) are a specific
      // migrate action, so this needs to be after all those.
      ActionKey.Migrate,
      // Most messages are some form of execute. Migrate and execute are
      // different, so the order between these two is irrelevant.
      ActionKey.Execute,
      // This is last because it catches all messages.
      ActionKey.Custom,
    ] as ActionKey[]
  ).indexOf(key)
