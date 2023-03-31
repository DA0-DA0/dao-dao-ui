import {
  CategorizedActionKeyAndData,
  LoadedActions,
  PartialCategorizedActionKeyAndData,
} from '@dao-dao/types'
import { convertActionsToMessages, decodedMessagesString } from '@dao-dao/utils'

import { CosmosMessageDisplay } from '../CosmosMessageDisplay'

export type RawActionsRendererProps = {
  // This likely comes from a form field array that holds the action data.
  actionData: (
    | CategorizedActionKeyAndData
    | PartialCategorizedActionKeyAndData
  )[]
  // This comes from the `useLoadedActionsAndCategories` hook.
  loadedActions: LoadedActions
}

export const RawActionsRenderer = ({
  actionData,
  loadedActions,
}: RawActionsRendererProps) => (
  <CosmosMessageDisplay
    value={decodedMessagesString(
      convertActionsToMessages(loadedActions, actionData, {
        throwErrors: false,
      })
    )}
  />
)
