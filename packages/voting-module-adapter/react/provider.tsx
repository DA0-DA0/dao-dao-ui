import { ReactNode, useEffect, useState } from 'react'

import { matchAdapter } from '../core'
import { IVotingModuleAdapter, IVotingModuleAdapterOptions } from '../types'
import { VotingModuleAdapterContext } from './context'

export interface VotingModuleAdapterProviderProps {
  contractName: string
  children: ReactNode | ReactNode[]
  options: IVotingModuleAdapterOptions
}

export const VotingModuleAdapterProvider = ({
  contractName,
  children,
  options,
}: VotingModuleAdapterProviderProps) => {
  const [adapter, setAdapter] = useState<IVotingModuleAdapter>()

  useEffect(() => {
    matchAdapter(contractName).then(({ adapter }) => setAdapter(adapter))
  }, [contractName, options])

  return adapter ? (
    <VotingModuleAdapterContext.Provider
      value={{
        adapter,
        options,
      }}
    >
      {children}
    </VotingModuleAdapterContext.Provider>
  ) : (
    <options.Loader className="!fixed top-0 right-0 bottom-0 left-0" />
  )
}
