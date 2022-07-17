import { ReactNode, useEffect, useMemo, useState } from 'react'

import { ProposalModule } from '@dao-dao/utils'

import { matchAndLoadAdapter } from '../core'
import { IProposalModuleAdapter, IProposalModuleAdapterOptions } from '../types'
import { ProposalModuleAdapterContext } from './context'

export interface ProposalModuleAdapterProviderProps {
  proposalModules: ProposalModule[]
  proposalId: string
  children: ReactNode | ReactNode[]
  options: Omit<
    IProposalModuleAdapterOptions,
    'proposalModuleAddress' | 'proposalId' | 'proposalNumber'
  >
}

export const ProposalModuleAdapterProvider = ({
  proposalModules,
  proposalId,
  children,
  options,
}: ProposalModuleAdapterProviderProps) => {
  const [adapter, setAdapter] = useState<IProposalModuleAdapter>()

  const { proposalModule, proposalNumber } = useMemo(() => {
    // Non-numeric sequence followed by numeric sequence.
    const proposalIdParts = proposalId.match(/^([^\d]*)(\d+)$/)
    if (proposalIdParts?.length !== 3) {
      throw new Error('Failed to parse proposal ID.')
    }

    const proposalPrefix = proposalIdParts[1]

    const proposalNumber = Number(proposalIdParts[2])
    if (isNaN(proposalNumber)) {
      throw new Error(`Invalid proposal number "${proposalNumber}".`)
    }

    const proposalModule = proposalModules.find(
      ({ prefix }) => prefix === proposalPrefix
    )
    if (!proposalModule) {
      throw new Error(
        `Failed to find proposal module for prefix "${proposalPrefix}".`
      )
    }

    return {
      proposalNumber,
      proposalModule,
    }
  }, [proposalModules, proposalId])

  useEffect(() => {
    matchAndLoadAdapter(proposalModule.contractName).then(({ adapter }) =>
      setAdapter(adapter)
    )
  }, [options, proposalModule])

  return adapter ? (
    <ProposalModuleAdapterContext.Provider
      value={{
        adapter,
        options: {
          ...options,
          proposalModuleAddress: proposalModule.address,
          proposalId,
          proposalNumber,
        },
      }}
    >
      {children}
    </ProposalModuleAdapterContext.Provider>
  ) : (
    <options.Loader className="!fixed top-0 right-0 bottom-0 left-0" />
  )
}
