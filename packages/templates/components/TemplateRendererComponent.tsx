import { FunctionComponent } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CosmosMessageDisplay } from '@dao-dao/ui'

import {
  TemplateRendererComponentProps,
  TemplateComponentLoader,
  DecodeCosmosMsgMatch,
  Template,
} from '.'
import { useTemplatesForVotingModuleType } from '..'

const InnerTemplateRendererComponent: FunctionComponent<
  TemplateRendererComponentProps
> = ({ coreAddress, votingModuleType, message, SuspenseLoader }) => {
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
          SuspenseLoader={SuspenseLoader}
          coreAddress={coreAddress}
          getLabel={(field: string) => field}
          readOnly
        />
      </form>
    </FormProvider>
  )
}

export const TemplateRendererComponent: FunctionComponent<
  TemplateRendererComponentProps
> = (props) => (
  <props.SuspenseLoader fallback={<TemplateComponentLoader />}>
    <InnerTemplateRendererComponent {...props} />
  </props.SuspenseLoader>
)
