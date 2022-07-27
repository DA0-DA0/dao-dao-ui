import { createContext, useContext } from 'react'

import {
  IProposalModuleAdapter,
  IProposalModuleAdapterCommon,
  IProposalModuleAdapterOptions,
  IProposalModuleContext,
} from '../types'

// External API

export const ProposalModuleAdapterContext =
  createContext<IProposalModuleContext | null>(null)

export const useProposalModuleAdapter = (): IProposalModuleAdapter => {
  const context = useContext(ProposalModuleAdapterContext)

  if (!context) {
    throw new Error(
      'useProposalModuleAdapter can only be used in a descendant of ProposalModuleAdapterProvider.'
    )
  }

  return context.adapter
}

export const useProposalModuleAdapterIfAvailable = ():
  | IProposalModuleAdapter
  | undefined => {
  const context = useContext(ProposalModuleAdapterContext)
  return context?.adapter
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

export const useProposalModuleAdapterCommon =
  (): IProposalModuleAdapterCommon => {
    const context = useContext(ProposalModuleAdapterContext)

    if (!context) {
      throw new Error(
        'useProposalModuleAdapterCommon can only be used in a descendant of ProposalModuleAdapterProvider.'
      )
    }

    return context.common
  }
