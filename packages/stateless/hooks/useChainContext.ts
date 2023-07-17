import { createContext, useContext } from 'react'

import { IChainContext, SupportedChainContext } from '@dao-dao/types'

export const ChainContext = createContext<IChainContext | null>(null)

export const useChainContext = (): IChainContext => {
  const context = useContext(ChainContext)
  if (!context) {
    throw new Error(
      'useChainContext can only be used in a descendant of ChainContext.Provider.'
    )
  }

  return context
}

export const useSupportedChainContext = (): SupportedChainContext => {
  const context = useContext(ChainContext)
  if (!context) {
    throw new Error(
      'useChainContext can only be used in a descendant of ChainContext.Provider.'
    )
  }

  // Make sure this is a supported chain.
  if (!context.config) {
    throw new Error('Unsupported chain context.')
  }

  return context as SupportedChainContext
}

export const useChain = () => useChainContext().chain
