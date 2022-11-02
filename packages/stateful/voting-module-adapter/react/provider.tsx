import { ReactNode, useState } from 'react'

import {
  IVotingModuleAdapterContext,
  IVotingModuleAdapterOptions,
} from '@dao-dao/types'

import { matchAndLoadAdapter } from '../core'
import { VotingModuleAdapterContext } from './context'

export interface VotingModuleAdapterProviderProps {
  contractName: string
  children: ReactNode | ReactNode[]
  options: IVotingModuleAdapterOptions
}

// Ensure this re-renders when the voting module contract name or options
// addresses change. You can do this by setting a `key` on this component or one
// of its ancestors. See DaoPageWrapper.tsx where this component is used.
export const VotingModuleAdapterProvider = ({
  contractName,
  children,
  options,
}: VotingModuleAdapterProviderProps) => {
  const [context] = useState<IVotingModuleAdapterContext>(() =>
    matchAndLoadAdapter(contractName, options)
  )

  return (
    <VotingModuleAdapterContext.Provider value={context}>
      {children}
    </VotingModuleAdapterContext.Provider>
  )
}
