import { ReactNode } from 'react'

import { getChainForChainId, getNativeTokenForChainId } from '@dao-dao/utils'

import { ChainContext } from '../hooks/useChainContext'

export type ChainProviderProps = {
  chainId: string
  children: ReactNode | ReactNode[]
}

export const ChainProvider = ({ chainId, children }: ChainProviderProps) => (
  <ChainContext.Provider
    value={{
      chainId,
      chain: getChainForChainId(chainId),
      nativeToken: getNativeTokenForChainId(chainId),
    }}
  >
    {children}
  </ChainContext.Provider>
)
