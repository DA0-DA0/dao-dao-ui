import { createContext, useContext } from 'react'

import { VotingModuleType } from '@dao-dao/utils'

export interface DAOInfo {
  votingModuleType: VotingModuleType
  name: string
  imageUrl: string | null
}

export const DefaultDAOInfo: DAOInfo = {
  votingModuleType: VotingModuleType.Cw4Voting,
  name: '',
  imageUrl: null,
}

export const DAOInfoContext = createContext<DAOInfo>(DefaultDAOInfo)

export const useDAOInfoContext = () => useContext(DAOInfoContext)
