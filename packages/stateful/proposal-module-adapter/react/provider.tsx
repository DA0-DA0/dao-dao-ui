import { ReactNode, useMemo } from 'react'

import { useChain } from '@dao-dao/stateless'
import {
  IProposalModuleAdapterCommonInitialOptions,
  IProposalModuleAdapterInitialOptions,
  ProposalModule,
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
  proposalModules: ProposalModule[]
  proposalId: string
  children: ReactNode | ReactNode[]
} & Omit<IProposalModuleAdapterInitialOptions, 'chain'>

export const ProposalModuleAdapterProvider = ({
  coreAddress,
  proposalModules,
  proposalId,
  children,
}: ProposalModuleAdapterProviderProps) => {
  const chain = useChain()
  const { context, commonContext } = useMemo(() => {
    const context = matchAndLoadAdapter(proposalModules, proposalId, {
      coreAddress,
      chain,
    })
    const commonContext = commonContextFromAdapterContext(context)
    return {
      context,
      commonContext,
    }
  }, [chain, coreAddress, proposalId, proposalModules])

  return (
    <ProposalModuleAdapterCommonContext.Provider value={commonContext}>
      <ProposalModuleAdapterContext.Provider value={context}>
        {children}
      </ProposalModuleAdapterContext.Provider>
    </ProposalModuleAdapterCommonContext.Provider>
  )
}

export type ProposalModuleAdapterCommonProviderProps = {
  proposalModule: ProposalModule
  children: ReactNode | ReactNode[]
} & Omit<IProposalModuleAdapterCommonInitialOptions, 'chain'>

export const ProposalModuleAdapterCommonProvider = ({
  coreAddress,
  proposalModule,
  children,
}: ProposalModuleAdapterCommonProviderProps) => {
  const chain = useChain()
  const context = useMemo(
    () =>
      matchAndLoadCommonContext(proposalModule, {
        coreAddress,
        chain,
      }),
    [chain, coreAddress, proposalModule]
  )

  return (
    <ProposalModuleAdapterCommonContext.Provider value={context}>
      {children}
    </ProposalModuleAdapterCommonContext.Provider>
  )
}
