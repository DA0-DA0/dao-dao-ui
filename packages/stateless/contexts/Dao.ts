import { createContext, useContext } from 'react'

import { DaoBase } from '@dao-dao/types/clients'

export type IDaoContext = {
  dao: DaoBase
}

export const DaoContext = createContext<IDaoContext | null>(null)

export const useDaoContext = () => {
  const context = useContext(DaoContext)
  if (!context) {
    throw new Error(
      'useDaoContext can only be used in a descendant of DaoContext.Provider.'
    )
  }

  return context
}

export const useDaoContextIfAvailable = () => useContext(DaoContext)

export const useDaoInfoContext = () => useDaoContext().dao.info
export const useDaoInfoContextIfAvailable = () =>
  useDaoContextIfAvailable()?.dao.info
