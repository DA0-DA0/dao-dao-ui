import { ChainId, HostChainSubdomain } from '@dao-dao/types'

export const HOST_CHAIN_SUBDOMAINS: HostChainSubdomain[] = [
  {
    id: ChainId.JunoMainnet,
    subdomain: 'juno',
  },
  {
    id: ChainId.OsmosisMainnet,
    subdomain: 'osmosis',
  },
  {
    id: ChainId.JunoTestnet,
    subdomain: 'juno-testnet',
  },
  {
    id: ChainId.OsmosisTestnet,
    subdomain: 'osmosis-testnet',
  },
]
