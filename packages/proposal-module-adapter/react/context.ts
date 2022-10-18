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

export const useProposalModuleAdapterContext = (): IProposalModuleContext => {
  const context = useContext(ProposalModuleAdapterContext)

  if (!context) {
    throw new Error(
      'Proposal module adapter hooks can only be used in a descendant of ProposalModuleAdapterProvider.'
    )
  }

  return context
}

export const useProposalModuleAdapter = (): IProposalModuleAdapter =>
  useProposalModuleAdapterContext().adapter

export const useProposalModuleAdapterIfAvailable = ():
  | IProposalModuleAdapter
  | undefined => useContext(ProposalModuleAdapterContext)?.adapter

// For internal use to pass around options.
export const useProposalModuleAdapterOptions =
  (): IProposalModuleAdapterOptions => useProposalModuleAdapterContext().options

export const useProposalModuleAdapterCommon =
  (): IProposalModuleAdapterCommon => useProposalModuleAdapterContext().common
