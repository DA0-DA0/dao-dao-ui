import { createContext, useContext } from 'react'

import { IVotingModuleAdapter } from '../types'

export const VotingModuleAdapterContext =
  createContext<IVotingModuleAdapter | null>(null)

export const useVotingModuleAdapter = () => {
  const context = useContext(VotingModuleAdapterContext)

  if (!context) {
    throw new Error(
      'useVotingModuleAdapter can only be used in a descendant of VotingModuleAdapterProvider.'
    )
  }

  return context
}
