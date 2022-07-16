import { createContext, useContext } from 'react'

export interface DAOInfo {
  votingModuleContractName: string
  name: string
  imageUrl: string | null
}

const FallbackDAOInfo: DAOInfo = {
  votingModuleContractName: 'Error',
  name: 'Error',
  imageUrl: null,
}

export const DAOInfoContext = createContext<DAOInfo | null>(null)

export const useDAOInfoContext = () =>
  useContext(DAOInfoContext) ?? FallbackDAOInfo
