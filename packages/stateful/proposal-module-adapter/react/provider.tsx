import { ReactNode, useState } from 'react'

import {
  IProposalModuleAdapterInitialOptions,
  IProposalModuleContext,
  ProposalModule,
} from '@dao-dao/types'

import { matchAndLoadAdapter } from '../core'
import { ProposalModuleAdapterContext } from './context'

export interface ProposalModuleAdapterProviderProps {
  proposalModules: ProposalModule[]
  proposalId: string
  children: ReactNode | ReactNode[]
  initialOptions: IProposalModuleAdapterInitialOptions
}

// Ensure this re-renders when the voting module contract name or options
// addresses change. You can do this by setting a `key` on this component or one
// of its ancestors. See DaoPageWrapper.tsx where this component is used.
export const ProposalModuleAdapterProvider = ({
  proposalModules,
  proposalId,
  children,
  initialOptions,
}: ProposalModuleAdapterProviderProps) => {
  const [context] = useState<IProposalModuleContext>(() =>
    matchAndLoadAdapter(proposalModules, proposalId, initialOptions)
  )

  return (
    <ProposalModuleAdapterContext.Provider value={context}>
      {children}
    </ProposalModuleAdapterContext.Provider>
  )
}
