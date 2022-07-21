import { ReactNode, useEffect, useState } from 'react'

import { matchAndLoadAdapter } from '../core'
import {
  IVotingModuleAdapterContext,
  IVotingModuleAdapterOptions,
} from '../types'
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
  const [context, setContext] = useState<IVotingModuleAdapterContext>()

  useEffect(() => {
    matchAndLoadAdapter(contractName, options).then(({ adapter }) =>
      setContext({
        adapter,
        options,
      })
    )
  }, [contractName, options])

  return context ? (
    <VotingModuleAdapterContext.Provider value={context}>
      {children}
    </VotingModuleAdapterContext.Provider>
  ) : (
    <options.Loader className="!fixed top-0 right-0 bottom-0 left-0" />
  )
}
