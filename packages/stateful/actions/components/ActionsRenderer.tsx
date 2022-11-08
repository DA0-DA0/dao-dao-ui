import { Check, Link } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { ActionCardLoader, IconButton } from '@dao-dao/stateless'
import { ActionAndData } from '@dao-dao/types/actions'

import { SuspenseLoader } from '../../components/SuspenseLoader'

// The props needed to render an action from a message.
export interface ActionsRendererProps {
  actionData: ActionAndData[]
  onCopyLink: () => void
}

export const ActionsRenderer = ({
  actionData,
  onCopyLink,
}: ActionsRendererProps) => {
  const formMethods = useForm({
    defaultValues: actionData.reduce(
      (acc, { data }, index) => ({
        ...acc,
        [index.toString()]: data,
      }),
      {}
    ),
  })

  const [copied, setCopied] = useState<number>()
  // Unset copied after 2 seconds.
  useEffect(() => {
    const timeout = setTimeout(() => setCopied(undefined), 2000)
    // Cleanup on unmount.
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <FormProvider {...formMethods}>
      <form>
        {actionData.map(({ action: { Component } }, index) => (
          <div key={index} className="group relative" id={`A${index + 1}`}>
            <SuspenseLoader fallback={<ActionCardLoader />}>
              <Component
                allActionsWithData={actionData.map(
                  ({ action: { key }, data }) => ({
                    key,
                    data,
                  })
                )}
                data={actionData[index].data}
                fieldNamePrefix={`${index}.`}
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
        ))}
      </form>
    </FormProvider>
  )
}
