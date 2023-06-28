import { ChainId } from '@dao-dao/types'

export const SUPPORTED_CHAINS: { id: ChainId; subdomain: string }[] = [
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
