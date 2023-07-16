import { createContext, useContext } from 'react'

import { IAppContext } from '@dao-dao/types'

export const AppContext = createContext<IAppContext | null>(null)

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error(
      'useAppContext can only be used in a descedant of a AppContextProvider wrapper.'
    )
  }

  return context
}

export const useAppContextIfAvailable = () => useContext(AppContext)
