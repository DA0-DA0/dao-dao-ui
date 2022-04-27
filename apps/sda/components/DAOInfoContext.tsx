import { createContext, useContext } from 'react'

export interface DAOInfo {
  name: string
  imageUrl?: string | null
}

export const DAOInfoContext = createContext<DAOInfo>({
  name: '',
  imageUrl: null,
})

export const useDAOInfoContext = () => useContext(DAOInfoContext)
