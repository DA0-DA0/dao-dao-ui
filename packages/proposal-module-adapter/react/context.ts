import { createContext, useContext } from 'react'

import {
  IProposalModuleAdapter,
  IProposalModuleAdapterAdapterWithOptions,
  IProposalModuleAdapterOptions,
} from '../types'

// External API

export const ProposalModuleAdapterContext =
  createContext<IProposalModuleAdapterAdapterWithOptions | null>(null)

export const useProposalModuleAdapter = (): IProposalModuleAdapter => {
  const context = useContext(ProposalModuleAdapterContext)

  if (!context) {
    throw new Error(
      'useProposalModuleAdapter can only be used in a descendant of ProposalModuleAdapterProvider.'
    )
  }

  return context.adapter
}

// For internal use to pass around options.
export const useProposalModuleAdapterOptions =
  (): IProposalModuleAdapterOptions => {
    const context = useContext(ProposalModuleAdapterContext)

    if (!context) {
      throw new Error(
        'useProposalModuleAdapterOptions can only be used in a descendant of ProposalModuleAdapterProvider.'
      )
    }

    return context.options
  }
