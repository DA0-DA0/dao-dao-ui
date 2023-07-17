import { ChainId, SupportedChain } from '@dao-dao/types'

// Chains which DAO DAO DAOs exist on.
export const SUPPORTED_CHAINS: SupportedChain[] = [
  {
    id: ChainId.JunoMainnet,
    mainnet: true,
  },
  {
    id: ChainId.OsmosisMainnet,
    mainnet: true,
  },
  {
    id: ChainId.JunoTestnet,
    mainnet: false,
  },
  {
    id: ChainId.OsmosisTestnet,
    mainnet: false,
  },
]

export const CHAIN_ENDPOINTS: Partial<
  Record<
    ChainId,
    {
      rpc: string
      rest: string
    }
  >
> = {
  [ChainId.JunoMainnet]: {
    rpc: 'https://juno-rpc.reece.sh',
    rest: 'https://juno-api.reece.sh',
  },
  [ChainId.JunoTestnet]: {
    rpc: 'https://uni-rpc.reece.sh',
    rest: 'https://uni-api.reece.sh',
  },
  [ChainId.OsmosisMainnet]: {
    rpc: 'https://rpc.osmosis.zone',
    rest: 'https://lcd.osmosis.zone',
  },
  [ChainId.OsmosisTestnet]: {
    rpc: 'https://rpc.testnet.osmosis.zone',
    rest: 'https://lcd.testnet.osmosis.zone',
  },
  [ChainId.StargazeMainnet]: {
    rpc: 'https://rpc.stargaze-apis.com',
    rest: 'https://rest.stargaze-apis.com',
  },
}
