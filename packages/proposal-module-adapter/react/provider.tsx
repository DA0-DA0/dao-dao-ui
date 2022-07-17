import { ReactNode, useEffect, useState } from 'react'

import { matchAndLoadAdapter } from '../core'
import { IProposalModuleAdapter, IProposalModuleAdapterOptions } from '../types'
import { ProposalModuleAdapterContext } from './context'

export interface ProposalModuleAdapterProviderProps {
  proposalModules: ProposalModule[]
  proposalId: string
  children: ReactNode | ReactNode[]
  options: IProposalModuleAdapterOptions
}

export const ProposalModuleAdapterProvider = ({
  proposalModules,
  proposalId,
  children,
  options,
}: ProposalModuleAdapterProviderProps) => {
  const [adapter, setAdapter] = useState<IProposalModuleAdapter>()

  const proposalModule = proposalModules[0]
  useEffect(() => {
    matchAndLoadAdapter(proposalModule.contractName).then(({ adapter }) =>
      setAdapter(adapter)
    )
  }, [options, proposalModule])

  return adapter ? (
    <ProposalModuleAdapterContext.Provider
      value={{
        adapter,
        options,
      }}
    >
      {children}
    </ProposalModuleAdapterContext.Provider>
  ) : (
    <options.Loader className="!fixed top-0 right-0 bottom-0 left-0" />
  )
}
