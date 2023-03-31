import { Check, Link } from '@mui/icons-material'
import { ComponentType, useEffect, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDeepCompareMemoize } from 'use-deep-compare-effect'

import { SuspenseLoaderProps } from '@dao-dao/types'
import {
  Action,
  ActionCategoryWithLabel,
  ActionKey,
  CategorizedActionAndData,
  CategorizedActionKeyAndData,
} from '@dao-dao/types/actions'

import { IconButton } from '../icon_buttons'
import { Loader } from '../logo/Loader'
import { ActionCard } from './ActionCard'

// The props needed to render an action from a message.
export interface ActionsRendererProps {
  actionData: CategorizedActionAndData[]
  hideCopyLink?: boolean
  onCopyLink?: () => void
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

export const ActionsRenderer = ({
  actionData,
  hideCopyLink,
  onCopyLink,
  SuspenseLoader,
}: ActionsRendererProps) => {
  const actionKeysWithData = useMemo(
    () =>
      actionData.map(
        ({
          category: { key: categoryKey },
          action: { key: actionKey },
          data,
        }): CategorizedActionKeyAndData => ({
          categoryKey,
          actionKey,
          data,
        })
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useDeepCompareMemoize([actionData])
  )

  // Group action data by action.
  const groupedActionData = useMemo(
    () =>
      Object.entries(
        actionData.reduce(
          (acc, { category, action, data }, index) => ({
            ...acc,
            [action.key]: {
              category,
              action,
              all: [
                ...(acc[action.key]?.all || []),
                {
                  data,
                  // Index in the original array.
                  index,
                },
              ],
            },
          }),
          {} as Record<
            ActionKey,
            Omit<ActionRendererProps, 'allActionsWithData'>
          >
        )
      ),
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
      {groupedActionData.map(([actionKey, props], index) => (
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
              `${index}-${actionKey}`
            }
            {...props}
            SuspenseLoader={SuspenseLoader}
            allActionsWithData={actionKeysWithData}
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

export type ActionRendererProps = {
  category: ActionCategoryWithLabel
  action: Action
  all: {
    // Index of data in `allActionsWithData` list.
    index: number
    data: any
  }[]
  allActionsWithData: CategorizedActionKeyAndData[]
  SuspenseLoader: ComponentType<SuspenseLoaderProps>
}

export const ActionRenderer = ({
  category,
  action,
  all,
  allActionsWithData,
  SuspenseLoader,
}: ActionRendererProps) => {
  const form = useForm({
    defaultValues: {
      data: all.map(({ data }) => data),
    },
  })

  return (
    <FormProvider {...form}>
      <ActionCard action={action} category={category}>
        {all.map(({ index, data }, dataIndex) => (
          <SuspenseLoader key={index} fallback={<Loader size={36} />}>
            <action.Component
              allActionsWithData={allActionsWithData}
              data={data}
              fieldNamePrefix={`data.${dataIndex}.`}
              index={index}
              isCreating={false}
            />
          </SuspenseLoader>
        ))}
      </ActionCard>
    </FormProvider>
  )
}
