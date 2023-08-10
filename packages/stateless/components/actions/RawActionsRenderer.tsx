import { useMemo } from 'react'

import {
  CategorizedActionKeyAndData,
  LoadedActions,
  PartialCategorizedActionKeyAndData,
} from '@dao-dao/types'
import {
  convertActionsToMessages,
  decodeMessages,
  decodeRawMessagesForDisplay,
} from '@dao-dao/utils'

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
}: RawActionsRendererProps) => {
  const rawDecodedMessages = useMemo(
    () =>
      JSON.stringify(
        decodeMessages(
          convertActionsToMessages(loadedActions, actionData, {
            throwErrors: false,
          })
        ).map(decodeRawMessagesForDisplay),
        null,
        2
      ),
    [loadedActions, actionData]
  )

  return <CosmosMessageDisplay value={rawDecodedMessages} />
}
