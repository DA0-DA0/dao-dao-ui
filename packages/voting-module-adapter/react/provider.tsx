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
  const [state, setState] = useState<{
    contractName: string
    context: IVotingModuleAdapterContext
  }>()

  useEffect(() => {
    setState({
      contractName,
      context: matchAndLoadAdapter(contractName, options),
    })
  }, [contractName, options])

  // If `contractName` changes and state has not yet been updated with the newly
  // loaded adapter, do not render the components that expect the correct voting
  // module. Load instead.
  return state && state.contractName === contractName ? (
    <VotingModuleAdapterContext.Provider value={state.context}>
      {children}
    </VotingModuleAdapterContext.Provider>
  ) : (
    <options.Loader className="!fixed top-0 right-0 bottom-0 left-0" />
  )
}
