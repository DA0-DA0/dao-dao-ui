import { FC, FunctionComponent } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CosmosMessageDisplay, SuspenseLoader } from '@dao-dao/ui'
import { VotingModuleType } from '@dao-dao/utils'

import { Template, DecodeCosmosMsgMatch } from '.'
import { useTemplatesForVotingModuleType } from '..'
import { TemplateKey } from './common'
import { TemplateComponentLoader } from './TemplateCard'

type Message = { [key: string]: any }

// The props needed to render a template from a message.
export interface TemplatesRendererProps {
  coreAddress: string
  votingModuleType: VotingModuleType
  proposalId: number
  messages: Message[]
}

export const TemplatesRenderer: FC<TemplatesRendererProps> = (props) => (
  <SuspenseLoader fallback={<TemplateComponentLoader />}>
    <InnerTemplatesRenderer {...props} />
  </SuspenseLoader>
)

const InnerTemplatesRenderer: FunctionComponent<TemplatesRendererProps> = ({
  coreAddress,
  votingModuleType,
  proposalId,
  messages,
}) => {
  // Call relevant template hooks in the same order every time.
  const templates = useTemplatesForVotingModuleType(votingModuleType)
  const messagesWithTemplates = messages.map((message) => ({
    message,
    // Note: Ensure custom is the last message template since it will match
    // most proposals and we return the first successful message match.
    ...((templates
      .map((template) => ({
        template,
        ...template.useDecodedCosmosMsg(message, coreAddress),
      }))
      .find(({ match }) => match) as
      | (DecodeCosmosMsgMatch & {
          template: Template
        })
      | undefined) ?? { template: undefined, match: false, data: undefined }),
  }))

  const formMethods = useForm({
    defaultValues: messagesWithTemplates.reduce(
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
        {messagesWithTemplates.map((messageWithTemplate, index) =>
          messageWithTemplate.template ? (
            <messageWithTemplate.template.Component
              allTemplatesWithData={messagesWithTemplates.map(
                ({ template, data }) => ({
                  // Custom matches everything, so this should not matter.
                  key: template?.key ?? TemplateKey.Custom,
                  data,
                })
              )}
              coreAddress={coreAddress}
              getLabel={(field: string) => `${index}.${field}`}
              index={index}
              proposalId={proposalId}
              readOnly
            />
          ) : (
            // If could not load required state or did not match template,
            // display raw message.
            <CosmosMessageDisplay
              value={JSON.stringify(messageWithTemplate.message, undefined, 2)}
            />
          )
        )}
      </form>
    </FormProvider>
  )
}
