import { createContext, useContext } from 'react'

import {
  IVotingModuleAdapter,
  IVotingModuleAdapterContext,
  IVotingModuleAdapterOptions,
} from '../types'

// External API

export const VotingModuleAdapterContext =
  createContext<IVotingModuleAdapterContext | null>(null)

export const useVotingModuleAdapter = (): IVotingModuleAdapter => {
  const context = useContext(VotingModuleAdapterContext)

  if (!context) {
    throw new Error(
      'useVotingModuleAdapter can only be used in a descendant of VotingModuleAdapterProvider.'
    )
  }

  return context.adapter
}

// For internal use to pass around options.
export const useVotingModuleAdapterOptions =
  (): IVotingModuleAdapterOptions => {
    const context = useContext(VotingModuleAdapterContext)

    if (!context) {
      throw new Error(
        'useVotingModuleAdapterOptions can only be used in a descendant of VotingModuleAdapterProvider.'
      )
    }

    return context.options
  }
