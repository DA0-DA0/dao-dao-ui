import { ReactNode, useMemo } from 'react'

import { useDao } from '@dao-dao/stateless'
import {
  IProposalModuleCommonContext,
  IProposalModuleContext,
} from '@dao-dao/types'

import {
  commonContextFromAdapterContext,
  matchAndLoadAdapter,
  matchAndLoadCommonContext,
} from '../core'
import {
  ProposalModuleAdapterCommonContext,
  ProposalModuleAdapterContext,
} from './context'

export type ProposalModuleAdapterProviderProps = {
  proposalId: string
  children: ReactNode | ReactNode[]
}

export const ProposalModuleAdapterProvider = ({
  proposalId,
  children,
}: ProposalModuleAdapterProviderProps) => {
  const dao = useDao()
  const { context, commonContext } = useMemo(() => {
    const context = matchAndLoadAdapter(dao, proposalId)
    const commonContext = commonContextFromAdapterContext(context)
    return {
      context,
      commonContext,
    }
  }, [dao, proposalId])

  return (
    <ProposalModuleAdapterBothProviders
      commonContext={commonContext}
      context={context}
    >
      {children}
    </ProposalModuleAdapterBothProviders>
  )
}

export type ProposalModuleAdapterCommonProviderProps = {
  proposalModuleAddress: string
  children: ReactNode | ReactNode[]
}

export const ProposalModuleAdapterCommonProvider = ({
  proposalModuleAddress,
  children,
}: ProposalModuleAdapterCommonProviderProps) => {
  const dao = useDao()
  const context = useMemo(
    () => matchAndLoadCommonContext(dao, proposalModuleAddress),
    [dao, proposalModuleAddress]
  )

  return (
    <ProposalModuleAdapterCommonContext.Provider value={context}>
      {children}
    </ProposalModuleAdapterCommonContext.Provider>
  )
}

export type ProposalModuleAdapterBothProvidersProps = {
  commonContext: IProposalModuleCommonContext
  context: IProposalModuleContext
  children: ReactNode | ReactNode[]
}

/**
 * Wrapper around both proposal module adapter contexts.
 */
export const ProposalModuleAdapterBothProviders = ({
  commonContext,
  context,
  children,
}: ProposalModuleAdapterBothProvidersProps) => (
  <ProposalModuleAdapterCommonContext.Provider value={commonContext}>
    <ProposalModuleAdapterContext.Provider value={context}>
      {children}
    </ProposalModuleAdapterContext.Provider>
  </ProposalModuleAdapterCommonContext.Provider>
)
