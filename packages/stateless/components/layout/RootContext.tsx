import { createContext, useContext } from 'react'

import { IRootContext } from '@dao-dao/types'

export const RootContext = createContext<IRootContext | null>(null)

export const useRootContext = () => {
  const context = useContext(RootContext)
  if (!context) {
    throw new Error(
      'useRootContext can only be used in a descedant of a RootContextProvider wrapper.'
    )
  }

  return context
}

export const useRootContextIfAvailable = () => useContext(RootContext)
