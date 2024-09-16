import { createContext, useContext } from 'react'

import { IActionMatcherContext } from '@dao-dao/types/actions'

export const ActionMatcherContext = createContext<IActionMatcherContext | null>(
  null
)

export const useActionMatcherContext = (): IActionMatcherContext => {
  const context = useContext(ActionMatcherContext)

  if (!context) {
    throw new Error(
      'useActionMatcherContext can only be used in a descendant of ActionMatcherProvider.'
    )
  }

  return context
}

/**
 * Get the action matcher.
 */
export const useActionMatcher = () => useActionMatcherContext().matcher
