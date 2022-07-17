import { ReactNode, useEffect, useState } from 'react'

import { ProposalModule } from '@dao-dao/utils'

import { matchAndLoadAdapter } from '../core'
import {
  IProposalModuleAdapterAdapterWithOptions,
  IProposalModuleAdapterInitialOptions,
} from '../types'
import { ProposalModuleAdapterContext } from './context'

export interface ProposalModuleAdapterProviderProps {
  proposalModules: ProposalModule[]
  proposalId: string
  children: ReactNode | ReactNode[]
  initialOptions: IProposalModuleAdapterInitialOptions
}

export const ProposalModuleAdapterProvider = ({
  proposalModules,
  proposalId,
  children,
  initialOptions,
}: ProposalModuleAdapterProviderProps) => {
  const [adapterWithOptions, setAdapterWithOptions] =
    useState<IProposalModuleAdapterAdapterWithOptions>()

  useEffect(() => {
    matchAndLoadAdapter(proposalModules, proposalId, initialOptions).then(
      setAdapterWithOptions
    )
  }, [initialOptions, proposalId, proposalModules])

  return adapterWithOptions ? (
    <ProposalModuleAdapterContext.Provider value={adapterWithOptions}>
      {children}
    </ProposalModuleAdapterContext.Provider>
  ) : (
    <initialOptions.Loader className="!fixed top-0 right-0 bottom-0 left-0" />
  )
}
