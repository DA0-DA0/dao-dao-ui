import { useContext } from 'react'

import { DaoContext } from '../components/dao/DaoContext'

export const useDaoContext = () => {
  const context = useContext(DaoContext)
  if (!context) {
    throw new Error(
      'useDaoContext can only be used in a descendant of DaoContext.Provider.'
    )
  }

  return context
}

export const useDaoInfo = () => useDaoContext().daoInfo
export const useDaoInfoIfAvailable = () => useContext(DaoContext)?.daoInfo
