import { FC, FunctionComponent } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { SuspenseLoader } from '@dao-dao/ui'

import { ActionAndData, ActionCardLoader } from '..'

// The props needed to render an action from a message.
export interface ActionsRendererProps {
  coreAddress: string
  proposalId: number
  actionData: ActionAndData[]
}

export const ActionsRenderer: FC<ActionsRendererProps> = (props) => (
  <SuspenseLoader fallback={<ActionCardLoader />}>
    <InnerActionsRenderer {...props} />
  </SuspenseLoader>
)

const InnerActionsRenderer: FunctionComponent<ActionsRendererProps> = ({
  coreAddress,
  proposalId,
  actionData,
}) => {
  const formMethods = useForm({
    defaultValues: actionData.reduce(
      (acc, { data }, index) => ({
        ...acc,
        [index.toString()]: data,
      }),
      {}
    ),
  })

  return (
    <FormProvider {...formMethods}>
      <form>
        {actionData.map(({ action: { Component } }, index) => (
          <Component
            key={index}
            allActionsWithData={actionData.map(({ action: { key }, data }) => ({
              key,
              data,
            }))}
            coreAddress={coreAddress}
            getFieldName={(field: string) => `${index}.${field}`}
            index={index}
            proposalId={proposalId}
            readOnly
          />
        ))}
      </form>
    </FormProvider>
  )
}
