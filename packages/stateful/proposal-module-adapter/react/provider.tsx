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
  initialOptions: Omit<IProposalModuleAdapterInitialOptions, 'chain'>
}

export const ProposalModuleAdapterProvider = ({
  proposalModules,
  proposalId,
  children,
  initialOptions,
}: ProposalModuleAdapterProviderProps) => {
  const chain = useChain()
  const { context, commonContext } = useMemo(() => {
    const context = matchAndLoadAdapter(proposalModules, proposalId, {
      ...initialOptions,
      chain,
    })
    const commonContext = commonContextFromAdapterContext(context)
    return {
      context,
      commonContext,
    }
  }, [chain, initialOptions, proposalId, proposalModules])

  return (
    <ProposalModuleAdapterCommonContext.Provider value={commonContext}>
      <ProposalModuleAdapterContext.Provider value={context}>
        {children}
      </ProposalModuleAdapterContext.Provider>
    </ProposalModuleAdapterCommonContext.Provider>
  )
}

export interface ProposalModuleAdapterCommonProviderProps {
  proposalModule: ProposalModule
  children: ReactNode | ReactNode[]
  initialOptions: Omit<IProposalModuleAdapterCommonInitialOptions, 'chain'>
}

export const ProposalModuleAdapterCommonProvider = ({
  proposalModule,
  children,
  initialOptions,
}: ProposalModuleAdapterCommonProviderProps) => {
  const chain = useChain()
  const context = useMemo(
    () =>
      matchAndLoadCommonContext(proposalModule, {
        ...initialOptions,
        chain,
      }),
    [chain, initialOptions, proposalModule]
  )

  return (
    <ProposalModuleAdapterCommonContext.Provider value={context}>
      {children}
    </ProposalModuleAdapterCommonContext.Provider>
  )
}
