import { CheckCircleIcon, LinkIcon } from '@heroicons/react/outline'
import { ComponentType, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { LoaderProps, LogoProps, SuspenseLoader } from '@dao-dao/ui'
import { ProposalModule } from '@dao-dao/utils'

import { ActionAndData, ActionCardLoader } from '..'

// The props needed to render an action from a message.
export interface ActionsRendererProps {
  coreAddress: string
  proposalModule: ProposalModule
  actionData: ActionAndData[]
  Loader: ComponentType<LoaderProps>
  Logo: ComponentType<LogoProps>
}

export const ActionsRenderer = (props: ActionsRendererProps) => (
  <SuspenseLoader fallback={<ActionCardLoader Loader={props.Loader} />}>
    <InnerActionsRenderer {...props} />
  </SuspenseLoader>
)

const InnerActionsRenderer = ({
  coreAddress,
  proposalModule,
  actionData,
  Loader,
  Logo,
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
            <Component
              Loader={Loader}
              Logo={Logo}
              allActionsWithData={actionData.map(
                ({ action: { key }, data }) => ({
                  key,
                  data,
                })
              )}
              coreAddress={coreAddress}
              data={actionData[index].data}
              fieldNamePrefix={`${index}.`}
              index={index}
              proposalModule={proposalModule}
              readOnly
            />

            <button
              className="absolute top-1 -right-5 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => {
                const url = new URL(window.location.href)
                url.hash = '#' + `A${index + 1}`
                navigator.clipboard.writeText(url.href)
                setCopied(index)
              }}
              type="button"
            >
              {copied === index ? (
                <CheckCircleIcon className="w-4" />
              ) : (
                <LinkIcon className="w-4" />
              )}
            </button>
          </div>
        ))}
      </form>
    </FormProvider>
  )
}
