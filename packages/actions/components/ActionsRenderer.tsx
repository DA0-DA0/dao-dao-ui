import { FC, FunctionComponent } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { CosmosMessageDisplay, SuspenseLoader } from '@dao-dao/ui'
import { VotingModuleType } from '@dao-dao/utils'

import {
  useActionsForVotingModuleType,
  Action,
  DecodeCosmosMsgMatch,
  ActionKey,
  ActionCardLoader,
} from '..'

type Message = { [key: string]: any }

// The props needed to render an action from a message.
export interface ActionsRendererProps {
  coreAddress: string
  votingModuleType: VotingModuleType
  proposalId: number
  messages: Message[]
}

export const ActionsRenderer: FC<ActionsRendererProps> = (props) => (
  <SuspenseLoader fallback={<ActionCardLoader />}>
    <InnerActionsRenderer {...props} />
  </SuspenseLoader>
)

const InnerActionsRenderer: FunctionComponent<ActionsRendererProps> = ({
  coreAddress,
  votingModuleType,
  proposalId,
  messages,
}) => {
  // Call relevant action hooks in the same order every time.
  const actions = useActionsForVotingModuleType(votingModuleType)
  const messagesWithActions = messages.map((message) => ({
    message,
    // Note: Ensure custom is the last message action since it will match
    // most proposals and we return the first successful message match.
    ...((actions
      .map((action) => ({
        action,
        ...action.useDecodedCosmosMsg(message, coreAddress),
      }))
      .find(({ match }) => match) as
      | (DecodeCosmosMsgMatch & {
          action: Action
        })
      | undefined) ?? { action: undefined, match: false, data: undefined }),
  }))

  const formMethods = useForm({
    defaultValues: messagesWithActions.reduce(
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
        {messagesWithActions.map((messageWithAction, index) =>
          messageWithAction.action ? (
            <messageWithAction.action.Component
              key={index}
              allActionsWithData={messagesWithActions.map(
                ({ action, data }) => ({
                  // Custom matches everything, so this should not matter.
                  key: action?.key ?? ActionKey.Custom,
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
            // If could not load required state or did not match action,
            // display raw message.
            <CosmosMessageDisplay
              value={JSON.stringify(messageWithAction.message, undefined, 2)}
            />
          )
        )}
      </form>
    </FormProvider>
  )
}
