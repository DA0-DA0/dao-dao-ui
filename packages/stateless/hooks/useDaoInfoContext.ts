import { createContext, useContext } from 'react'

import { DaoInfo } from '@dao-dao/types'

export const DaoInfoContext = createContext<DaoInfo | null>(null)

export const useDaoInfoContext = () => {
  const context = useContext(DaoInfoContext)
  if (!context) {
    throw new Error(
      'useDaoInfoContext can only be used in a descendant of DaoInfoContext.Provider.'
    )
  }

  return context
}

export const useDaoInfoContextIfAvailable = () => useContext(DaoInfoContext)
