import { createContext, useContext, useMemo } from 'react'

import {
  ConfiguredChainContext,
  IChainContext,
  SupportedChainContext,
} from '@dao-dao/types'

export const ChainContext = createContext<IChainContext | null>(null)

export const useChainContextIfAvailable = (): IChainContext | null =>
  useContext(ChainContext)

export const useChainContext = (): IChainContext => {
  const context = useChainContextIfAvailable()
  if (!context) {
    throw new Error(
      'useChainContext can only be used in a descendant of ChainContext.Provider.'
    )
  }

  return context
}

export const useConfiguredChainContext = (): ConfiguredChainContext => {
  const context = useChainContext()

  // Make sure this is a configured chain.
  if (!context.base) {
    throw new Error('Unconfigured chain context.')
  }

  return useMemo(
    (): ConfiguredChainContext => ({
      ...context,
      config: context.base!,
    }),
    [context]
  )
}

export const useSupportedChainContext = (): SupportedChainContext => {
  const context = useChainContext()

  // Make sure this is a supported chain.
  if (!context.config) {
    throw new Error('Unsupported chain context.')
  }

  return context as SupportedChainContext
}

export const useChain = () => useChainContext().chain
