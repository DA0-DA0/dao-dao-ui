import { ReactNode, useMemo } from 'react'

import { makeChainContext } from '@dao-dao/utils'

import { ChainContext } from '../../contexts/Chain'

export type ChainProviderProps = {
  chainId: string
  children: ReactNode | ReactNode[]
}

export const ChainProvider = ({ chainId, children }: ChainProviderProps) => {
  const context = useMemo(() => makeChainContext(chainId), [chainId])
  return (
    <ChainContext.Provider value={context}>{children}</ChainContext.Provider>
  )
}
