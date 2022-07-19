import { ComponentType, ReactNode, useEffect, useState } from 'react'

import { ProposalModule } from '@dao-dao/utils'

import { matchAndLoadAdapter } from '../core'
import {
  IProposalModuleAdapterInitialOptions,
  IProposalModuleContext,
} from '../types'
import { ProposalModuleAdapterContext } from './context'

export interface ProposalModuleAdapterProviderProps {
  proposalModules: ProposalModule[]
  proposalId: string
  children: ReactNode | ReactNode[]
  initialOptions: IProposalModuleAdapterInitialOptions
  // If passed, will replace the Loader passed to initialOptions while this
  // provider is matching and loading the correct adapter.
  ProviderLoader?: ComponentType
}

export const ProposalModuleAdapterProvider = ({
  proposalModules,
  proposalId,
  children,
  initialOptions,
  ProviderLoader,
}: ProposalModuleAdapterProviderProps) => {
  const [context, setContext] = useState<IProposalModuleContext>()

  useEffect(() => {
    matchAndLoadAdapter(proposalModules, proposalId, initialOptions).then(
      setContext
    )
  }, [initialOptions, proposalId, proposalModules])

  return context ? (
    <ProposalModuleAdapterContext.Provider value={context}>
      {children}
    </ProposalModuleAdapterContext.Provider>
  ) : ProviderLoader ? (
    <ProviderLoader />
  ) : (
    <initialOptions.Loader className="!fixed top-0 right-0 bottom-0 left-0" />
  )
}
