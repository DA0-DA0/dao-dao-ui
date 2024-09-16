import { createContext, useContext } from 'react'

import { IActionsEncoderContext } from '@dao-dao/types/actions'

export const ActionsEncoderContext =
  createContext<IActionsEncoderContext | null>(null)

export const useActionsEncoderContext = (): IActionsEncoderContext => {
  const context = useContext(ActionsEncoderContext)

  if (!context) {
    throw new Error(
      'useActionsEncoderContext can only be used in a descendant of ActionsEncoderProvider.'
    )
  }

  return context
}

/**
 * Get the actions encoder.
 */
export const useActionsEncoder = () => useActionsEncoderContext().encoder
