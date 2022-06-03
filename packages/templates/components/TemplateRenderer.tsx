import { FC, FunctionComponent } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CosmosMessageDisplay, SuspenseLoader } from '@dao-dao/ui'

import {
  TemplateRendererProps,
  TemplateComponentLoader,
  DecodeCosmosMsgMatch,
  Template,
} from '.'
import { useTemplatesForVotingModuleType } from '..'

const InnerTemplateComponent: FunctionComponent<TemplateRendererProps> = ({
  coreAddress,
  votingModuleType,
  message,
}) => {
  const templates = useTemplatesForVotingModuleType(votingModuleType)
  // Call relevant template hooks in the same order every time.
  // Note: Ensure custom is the last message template since it will match
  // most proposals and we return the first successful message match.
  const templateMatches = templates.map((template) => ({
    template,
    ...template.useDecodeCosmosMsg(message, coreAddress),
  }))

  const { template = undefined, data = undefined } =
    (templateMatches.find(({ match }) => match) as
      | (DecodeCosmosMsgMatch & { template: Template })
      | undefined) ?? {}
  const formMethods = useForm({ defaultValues: data ?? {} })

  // If could not load required state or did not match template, just
  // display raw message.
  if (!template || !data) {
    return (
      <CosmosMessageDisplay value={JSON.stringify(message, undefined, 2)} />
    )
  }

  const { Component } = template

  return (
    <FormProvider {...formMethods}>
      <form>
        <Component
          coreAddress={coreAddress}
          getLabel={(field: string) => field}
          readOnly
        />
      </form>
    </FormProvider>
  )
}

export const TemplateRenderer: FC<TemplateRendererProps> = (props) => (
  <SuspenseLoader fallback={<TemplateComponentLoader />}>
    <InnerTemplateComponent {...props} />
  </SuspenseLoader>
)
