import { Chain } from '@chain-registry/types'
import { SigningCosmWasmClientOptions } from '@cosmjs/cosmwasm-stargate'
import { QueryClient } from '@tanstack/react-query'

import { getAminoTypes, getTypesRegistry } from '@dao-dao/types'
import { getChainForChainName } from '@dao-dao/utils'

import { DynamicGasPrice } from './DynamicGasPrice'

/**
 * Fetch the signer options for the given chain ID. getSignerOptions function
 * signature is defined by cosmos-kit.
 */
export const makeGetSignerOptions =
  (queryClient: QueryClient) =>
  (chainOrName: Chain | string): SigningCosmWasmClientOptions => {
    const chain =
      typeof chainOrName === 'string'
        ? getChainForChainName(chainOrName)
        : getChainForChainName(chainOrName.chain_name)

    // Chains without fee tokens configured will error.
    let gasPrice
    try {
      gasPrice = new DynamicGasPrice(queryClient, chain)
    } catch {}

    return {
      gasPrice,
      registry: getTypesRegistry(),
      aminoTypes: getAminoTypes(),
    }
  }
