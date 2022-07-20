import { createContext, useContext } from 'react'

import { ProposalModule } from '@dao-dao/utils'

export interface DAOInfo {
  votingModuleAddress: string
  votingModuleContractName: string
  proposalModules: ProposalModule[]
  name: string
  imageUrl: string | null
}

const FallbackDAOInfo: DAOInfo = {
  votingModuleAddress: 'error not loaded',
  votingModuleContractName: 'Error',
  proposalModules: [],
  name: 'Error',
  imageUrl: null,
}

export const DAOInfoContext = createContext<DAOInfo | null>(null)

export const useDAOInfoContext = () =>
  useContext(DAOInfoContext) ?? FallbackDAOInfo
