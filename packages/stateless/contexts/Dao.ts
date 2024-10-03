import { createContext, useContext } from 'react'

import { IDaoBase } from '@dao-dao/types/clients'

export type IDaoContext = {
  dao: IDaoBase
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

export const useDao = () => useDaoContext().dao
export const useDaoIfAvailable = () => useDaoContextIfAvailable()?.dao

export const useVotingModule = () => useDao().votingModule
