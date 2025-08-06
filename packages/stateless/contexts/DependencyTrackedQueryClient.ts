import { createContext, useContext } from 'react'

import { DependencyTrackedQueryClient } from '@dao-dao/utils'

/**
 * Context for the dependency tracked query client.
 */
export const DependencyTrackedQueryClientContext =
  createContext<DependencyTrackedQueryClient | null>(null)

export const useDependencyTrackedQueryClient = () => {
  const client = useContext(DependencyTrackedQueryClientContext)
  if (!client) {
    throw new Error(
      'No DependencyTrackedQueryClient found. Did you forget to wrap your component in a DependencyTrackedQueryClientContext.Provider?'
    )
  }

  return client
}
