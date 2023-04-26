import { createContext, useContext } from 'react'

import { IChainContext } from '@dao-dao/types'

export const ChainContext = createContext<IChainContext | null>(null)

export const useChainContext = () => {
  const context = useContext(ChainContext)
  if (!context) {
    throw new Error(
      'useChainContext can only be used in a descendant of ChainContext.Provider.'
    )
  }

  return context
}

export const useChain = () => useChainContext().chain
