import { ReactNode, useMemo } from 'react'

import {
  getChainForChainId,
  getConfiguredChainConfig,
  getSupportedChainConfig,
  maybeGetNativeTokenForChainId,
} from '@dao-dao/utils'

import { ChainContext } from '../../contexts/Chain'

export type ChainProviderProps = {
  chainId: string
  children: ReactNode | ReactNode[]
}

export const ChainProvider = ({ chainId, children }: ChainProviderProps) => {
  const context = useMemo(
    () => ({
      chainId,
      chain: getChainForChainId(chainId),
      nativeToken: maybeGetNativeTokenForChainId(chainId),
      base: getConfiguredChainConfig(chainId),
      config: getSupportedChainConfig(chainId),
    }),
    [chainId]
  )

  return (
    <ChainContext.Provider value={context}>{children}</ChainContext.Provider>
  )
}
