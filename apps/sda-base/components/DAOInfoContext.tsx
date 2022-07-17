import { createContext, useContext } from 'react'

export interface DAOInfo {
  votingModuleAddress: string
  votingModuleContractName: string
  name: string
  imageUrl: string | null
}

const FallbackDAOInfo: DAOInfo = {
  votingModuleAddress: 'error not loaded',
  votingModuleContractName: 'Error',
  name: 'Error',
  imageUrl: null,
}

export const DAOInfoContext = createContext<DAOInfo | null>(null)

export const useDAOInfoContext = () =>
  useContext(DAOInfoContext) ?? FallbackDAOInfo
