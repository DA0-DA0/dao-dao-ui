import {
  CosmosMsgForEmpty,
  LoadedActions,
  PartialCategorizedActionKeyAndData,
} from '@dao-dao/types'

// Convert action data to a Cosmos message given all loaded actions.
export const convertActionsToMessages = (
  loadedActions: LoadedActions,
  actions: PartialCategorizedActionKeyAndData[]
): CosmosMsgForEmpty[] =>
  actions
    .map(({ actionKey, data }) => {
      if (!actionKey || !data) {
        return
      }

      try {
        return loadedActions[actionKey]?.transform(data)
      } catch (err) {
        console.error(err)
      }
    })
    // Filter out undefined messages.
    .filter(Boolean) as CosmosMsgForEmpty[]
