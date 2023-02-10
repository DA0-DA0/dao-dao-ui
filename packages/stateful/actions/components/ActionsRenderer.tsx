import { Check, Link } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { ActionCardLoader, IconButton } from '@dao-dao/stateless'
import { Action, ActionAndData, ActionKeyAndData } from '@dao-dao/types/actions'

import { SuspenseLoader } from '../../components/SuspenseLoader'

// The props needed to render an action from a message.
export interface ActionsRendererProps {
  availableActions: Action[]
  actionData: ActionAndData[]
  onCopyLink: () => void
}

export const ActionsRenderer = ({
  availableActions,
  actionData,
  onCopyLink,
}: ActionsRendererProps) => {
  const formMethods = useForm<{ actions: ActionKeyAndData[] }>({
    defaultValues: {
      actions: [],
    },
  })
  useEffect(() => {
    formMethods.reset({
      actions: actionData.map(({ action: { key }, data }) => ({
        key,
        data,
      })),
    })
  }, [actionData, formMethods])

  const actionKeysWithData = formMethods.watch('actions')

  const [copied, setCopied] = useState<number>()
  // Unset copied after 2 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(undefined), 2000)
    // Cleanup on unmount.
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-2">
        {/* Use keys to get length, and index into map. */}
        {actionKeysWithData.map(({ key, data }, index) => {
          const action = availableActions.find((action) => action.key === key)
          // Should never happen because all actions get matched.
          if (!action) {
            return null
          }

          return (
            <div key={index} className="group relative" id={`A${index + 1}`}>
              <SuspenseLoader fallback={<ActionCardLoader />}>
                <action.Component
                  allActionsWithData={actionKeysWithData}
                  data={data}
                  fieldNamePrefix={`actions.${index}.data.`}
                  index={index}
                  isCreating={false}
                />
              </SuspenseLoader>

              <IconButton
                Icon={copied === index ? Check : Link}
                className="absolute top-1 right-1 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => {
                  const url = new URL(window.location.href)
                  url.hash = '#' + `A${index + 1}`
                  navigator.clipboard.writeText(url.href)
                  setCopied(index)
                  onCopyLink()
                }}
                size="sm"
                variant="none"
              />
            </div>
          )
        })}
      </form>
    </FormProvider>
  )
}
