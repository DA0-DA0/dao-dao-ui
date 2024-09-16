import { ComponentType } from 'react'
import { useFormContext } from 'react-hook-form'

import { SuspenseLoaderProps, UnifiedCosmosMsg } from '@dao-dao/types'

import { ActionsMatchAndRender } from './ActionsRenderer'

export type NestedActionsRendererProps = {
  // Must point to a `msgs` field in the current form context.
  msgsFieldName: string
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

export const NestedActionsRenderer = ({
  msgsFieldName,
  SuspenseLoader,
}: NestedActionsRendererProps) => {
  const { watch } = useFormContext<{
    msgs: UnifiedCosmosMsg[]
  }>()
  const messages = watch(msgsFieldName as 'msgs')

  return (
    <ActionsMatchAndRender
      SuspenseLoader={SuspenseLoader}
      hideCopyLink
      messages={messages}
    />
  )
}
