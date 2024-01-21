import { createContext, useContext } from 'react'

import {
  IProposalModuleAdapter,
  IProposalModuleAdapterCommon,
  IProposalModuleAdapterOptions,
  IProposalModuleCommonContext,
  IProposalModuleContext,
} from '@dao-dao/types'

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

// Common

export const ProposalModuleAdapterCommonContext =
  createContext<IProposalModuleCommonContext | null>(null)

export const useProposalModuleAdapterCommonContextIfAvailable = ():
  | IProposalModuleCommonContext
  | undefined => useContext(ProposalModuleAdapterCommonContext) || undefined

export const useProposalModuleAdapterCommonContext =
  (): IProposalModuleCommonContext => {
    const context = useProposalModuleAdapterCommonContextIfAvailable()

    if (!context) {
      throw new Error(
        'Proposal module adapter common hooks can only be used in a descendant of ProposalModuleAdapterCommonProvider.'
      )
    }

    return context
  }

export const useProposalModuleAdapterCommon =
  (): IProposalModuleAdapterCommon =>
    useProposalModuleAdapterCommonContext().common
