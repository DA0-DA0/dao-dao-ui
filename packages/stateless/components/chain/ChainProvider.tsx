import { ReactNode } from 'react'

import {
  getChainForChainId,
  getConfiguredChainConfig,
  getSupportedChainConfig,
  maybeGetNativeTokenForChainId,
} from '@dao-dao/utils'

import { ChainContext } from '../../hooks/useChainContext'

export type ChainProviderProps = {
  chainId: string
  children: ReactNode | ReactNode[]
}

export const ChainProvider = ({ chainId, children }: ChainProviderProps) => (
  <ChainContext.Provider
    value={{
      chainId,
      chain: getChainForChainId(chainId),
      nativeToken: maybeGetNativeTokenForChainId(chainId),
      base: getConfiguredChainConfig(chainId),
      config: getSupportedChainConfig(chainId),
    }}
  >
    {children}
  </ChainContext.Provider>
)
