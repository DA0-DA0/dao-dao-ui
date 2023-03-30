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
    .map(({ actionKey, data }) => {
      if (!actionKey || !data) {
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
