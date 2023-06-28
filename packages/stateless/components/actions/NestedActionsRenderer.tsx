import { ComponentType, useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  CategorizedAction,
  CategorizedActionAndData,
  CosmosMsgFor_Empty,
  SuspenseLoaderProps,
} from '@dao-dao/types'
import { decodeMessages } from '@dao-dao/utils'

import { Loader } from '../logo'
import { ActionsRenderer } from './ActionsRenderer'

export type NestedActionsRendererProps = {
  // Must point to a `msgs` field in the current form context.
  msgsFieldName: string
  actionsForMatching: CategorizedAction[]
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

export const NestedActionsRenderer = ({
  msgsFieldName,
  actionsForMatching,
  SuspenseLoader,
}: NestedActionsRendererProps) => {
  const { watch } = useFormContext<{
    msgs: CosmosMsgFor_Empty[]
  }>()
  const msgs = watch(msgsFieldName as 'msgs')

  const decodedMessages = useMemo(() => decodeMessages(msgs), [msgs])

  // Call relevant action hooks in the same order every time.
  const actionData = decodedMessages
    .map((message) => {
      const actionMatch = actionsForMatching
        .map(({ category, action }) => ({
          category,
          action,
          ...action.useDecodedCosmosMsg(message),
        }))
        .find(({ match }) => match)

      return (
        actionMatch && {
          category: actionMatch.category,
          action: actionMatch.action,
          data: actionMatch.data,
        }
      )
    })
    .filter(Boolean) as CategorizedActionAndData[]

  return (
    <>
      {actionsForMatching.length === 0 ? (
        <Loader />
      ) : (
        <ActionsRenderer
          SuspenseLoader={SuspenseLoader}
          actionData={actionData}
          hideCopyLink
        />
      )}
    </>
  )
}
