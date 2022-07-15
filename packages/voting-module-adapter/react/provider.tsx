import { ReactNode, useMemo } from 'react'

import { matchAdapter } from '../core'
import { VotingModuleAdapterContext } from './context'

export interface VotingModuleAdapterProviderProps {
  contractName: string
  children: ReactNode | ReactNode[]
}

export const VotingModuleAdapterProvider = ({
  contractName,
  children,
}: VotingModuleAdapterProviderProps) => {
  const adapter = useMemo(() => matchAdapter(contractName), [contractName])

  return (
    <VotingModuleAdapterContext.Provider value={adapter}>
      {children}
    </VotingModuleAdapterContext.Provider>
  )
}
