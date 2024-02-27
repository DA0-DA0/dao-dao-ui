import { ActionKey } from '@dao-dao/types'

// This returns the order value of an action for matching. It ensures the last
// actions those in the array below, since these are all catch-alls for other
// actions, custom being the broadest catch-all for all messages. Do this by
// assigning values and sorting the actions in ascending order. See
// `./provider.tsx` for usage.
export const actionKeyToMatchOrder = (key: ActionKey) =>
  (
    [
      // Some actions, like create/delete Press post, are more specific NFT
      // operations.
      ActionKey.MintNft,
      ActionKey.BurnNft,
      // This is before manage storage items because it is a more specific item
      // management action.
      ActionKey.ManageWidgets,
      // This is before manage storage items because it uses item storage when
      // the cw721 contract is improperly formatted.
      ActionKey.ManageCw721,
      // Many actions are more specific item management actions.
      ActionKey.ManageStorageItems,
      // Some actions are instantiate actions.
      ActionKey.Instantiate,
      ActionKey.Instantiate2,
      // The upgrade action (and likely future upgrade actions) are a specific
      // migrate action, so this needs to be after all those.
      ActionKey.Migrate,
      // This is a more specific execute action, so it must be before execute.
      ActionKey.CrossChainExecute,
      // Most messages are some form of execute. Migrate and execute are
      // different, so the order between these two is irrelevant.
      ActionKey.Execute,
      // This is last because it catches all messages.
      ActionKey.Custom,
    ] as ActionKey[]
  ).indexOf(key)
