import { ComponentType, ReactNode, useEffect, useState } from 'react'

import { ProposalModule } from '@dao-dao/tstypes'

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
  const [state, setState] = useState<{
    proposalId: string
    proposalModules: ProposalModule[]
    context: IProposalModuleContext
  }>()

  useEffect(() => {
    setState({
      proposalId,
      proposalModules,
      context: matchAndLoadAdapter(proposalModules, proposalId, initialOptions),
    })
  }, [initialOptions, proposalId, proposalModules])

  // If `proposalId` or `proposalModules` changes and state has not yet been
  // updated with the newly loaded adapter, do not render the components that
  // expect the correct proposal module. Load instead.
  return state &&
    state.proposalId === proposalId &&
    state.proposalModules === proposalModules ? (
    <ProposalModuleAdapterContext.Provider value={state.context}>
      {children}
    </ProposalModuleAdapterContext.Provider>
  ) : ProviderLoader ? (
    <ProviderLoader />
  ) : (
    <initialOptions.Loader className="!fixed top-0 right-0 bottom-0 left-0" />
  )
}
