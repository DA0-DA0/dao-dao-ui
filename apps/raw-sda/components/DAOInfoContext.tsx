import { createContext, useContext } from 'react'

export interface DAOInfo {
  votingModuleAddress: string
  name: string
  imageUrl: string | null
}

export const DefaultDAOInfo: DAOInfo = {
  votingModuleAddress: '',
  name: '',
  imageUrl: null,
}

export const DAOInfoContext = createContext<DAOInfo>(DefaultDAOInfo)

export const useDAOInfoContext = () => useContext(DAOInfoContext)
