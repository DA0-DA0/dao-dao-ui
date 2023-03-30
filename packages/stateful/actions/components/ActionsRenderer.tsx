import { Check, Link } from '@mui/icons-material'
import { useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import { ActionCardLoader, IconButton } from '@dao-dao/stateless'
import { ActionAndData, ActionKeyAndData } from '@dao-dao/types/actions'

import { SuspenseLoader } from '../../components/SuspenseLoader'

// The props needed to render an action from a message.
export interface ActionsRendererProps {
  actionData: ActionAndData[]
  hideCopyLink?: boolean
  onCopyLink?: () => void
}

export const ActionsRenderer = ({
  actionData,
  hideCopyLink,
  onCopyLink,
}: ActionsRendererProps) => {
  const actionKeysWithData = useMemo(
    () =>
      actionData.map(({ action: { key }, data }) => ({
        key,
        data,
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useDeepCompareMemoize([actionData])
  )

  const [copied, setCopied] = useState<number>()
  // Unset copied after 2 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(undefined), 2000)
    // Cleanup on unmount.
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <div className="flex flex-col gap-2">
      {actionData.map((props, index) => (
        <div key={index} className="group relative" id={`A${index + 1}`}>
          <ActionRenderer
            key={
              // Re-render when the action at a given position changes so the
              // form resets. If the action changed and the data in the form was
              // updated in a `useEffect`, the new action may try to render the
              // past action's data and error in unexpected ways. The data in
              // the form needs to match the action being rendered at all times,
              // thus re-render the entire component (and reset the form) when
              // the action changes. This is necessary because the component
              // expects to exist inside a FormProvider, and a FormProvider
              // depends on a `useForm` hook return value.
              `${index}-${props.action.key}`
            }
            {...props}
            allActionsWithData={actionKeysWithData}
            index={index}
          />

          {!hideCopyLink && (
            <IconButton
              Icon={copied === index ? Check : Link}
              className="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100"
              onClick={() => {
                const url = new URL(window.location.href)
                url.hash = '#' + `A${index + 1}`
                navigator.clipboard.writeText(url.href)
                setCopied(index)
                onCopyLink?.()
              }}
              size="sm"
              variant="none"
            />
          )}
        </div>
      ))}
    </div>
  )
}

export type ActionRendererProps = ActionAndData & {
  allActionsWithData: ActionKeyAndData[]
  index: number
}

export const ActionRenderer = ({
  action,
  data,
  allActionsWithData,
  index,
}: ActionRendererProps) => {
  const form = useForm({
    defaultValues: {
      data,
    },
  })

  return (
    <FormProvider {...form}>
      <SuspenseLoader fallback={<ActionCardLoader />}>
        <action.Component
          allActionsWithData={allActionsWithData}
          data={data}
          fieldNamePrefix="data."
          index={index}
          isCreating={false}
        />
      </SuspenseLoader>
    </FormProvider>
  )
}
