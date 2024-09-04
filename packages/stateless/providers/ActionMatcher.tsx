import { ReactNode, useEffect, useState } from 'react'

import { UnifiedCosmosMsg } from '@dao-dao/types'

import { ActionMatcher } from '../actions'
import { ActionMatcherContext, useActionsContext } from '../contexts'
import { useLoadingPromise } from '../hooks'

export type ActionMatcherProviderProps = {
  /**
   * The messages to match.
   */
  messages: UnifiedCosmosMsg[]
  /**
   * The children to render.
   */
  children: ReactNode
}

export const ActionMatcherProvider = ({
  messages,
  children,
}: ActionMatcherProviderProps) => {
  const { options, actions, messageProcessor } = useActionsContext()

  const [matcher] = useState(
    () => new ActionMatcher(options, messageProcessor, actions)
  )
  // Update fields whenever they change, preserving the matcher instance.
  useEffect(() => {
    matcher.options = options
    matcher.messageProcessor = messageProcessor
    matcher.actions = actions
  }, [matcher, options, messageProcessor, actions])

  // Match the messages whenever they change. All descendants will re-render
  // when this promise resolves or errors, so descendants should immediately
  // render updates to the matcher class instance's state.
  useLoadingPromise({
    promise: () => matcher.match(messages),
    deps: [matcher, messages],
  })

  return (
    <ActionMatcherContext.Provider
      value={{
        matcher,
      }}
    >
      {children}
    </ActionMatcherContext.Provider>
  )
}
