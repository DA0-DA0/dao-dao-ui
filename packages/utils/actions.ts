import {
  CosmosMsgForEmpty,
  LoadedActions,
  PartialCategorizedActionKeyAndData,
} from '@dao-dao/types'

// Convert action data to a Cosmos message given all loaded actions.
export const convertActionsToMessages = (
  loadedActions: LoadedActions,
  actions: PartialCategorizedActionKeyAndData[],
  {
    // Whether or not to throw the error if a transform fails. If false, the
    // error will be logged to the console, and the message will be skipped.
    throwErrors = true,
  }: {
    throwErrors?: boolean
  } = {}
): CosmosMsgForEmpty[] =>
  actions
    .map(({ categoryKey, actionKey, data }) => {
      // If no category or action, skip it.
      if (!categoryKey && !actionKey) {
        return
      }

      // If no action or data, throw error because this is an unselected action.
      if (!actionKey || !data) {
        if (throwErrors) {
          throw new Error('No action selected.')
        }

        return
      }

      try {
        return loadedActions[actionKey]?.transform(data)
      } catch (err) {
        if (throwErrors) {
          throw err
        }

        console.error(err)
      }
    })
    // Filter out undefined messages.
    .filter(Boolean) as CosmosMsgForEmpty[]
