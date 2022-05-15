import { createContext, useContext } from 'react'

export interface DAOInfo {
  name: string
  imageUrl: string | null
}

export const DefaultDAOInfo: DAOInfo = {
  name: '',
  imageUrl: null,
}

export const DAOInfoContext = createContext<DAOInfo>(DefaultDAOInfo)

export const useDAOInfoContext = () => useContext(DAOInfoContext)
