import { createContext, useContext } from 'react'

import { IDaoCreationAdapter } from '../types'

// External API

export const DaoCreationAdapterContext =
  createContext<IDaoCreationAdapter | null>(null)

export const useDaoCreationAdapter = (): IDaoCreationAdapter => {
  const context = useContext(DaoCreationAdapterContext)

  if (!context) {
    throw new Error(
      'useDaoCreationAdapter can only be used in a descendant of DaoCreationAdapterProvider.'
    )
  }

  return context
}
