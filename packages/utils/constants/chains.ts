import { ChainInfoID } from '@noahsaso/cosmodal'

export const OSMOSIS_TESTNET_CHAIN_ID = 'osmo-test-5'

export const SUPPORTED_CHAINS: { id: string; subdomain: string }[] = [
  {
    id: ChainInfoID.Juno1,
    subdomain: 'juno',
  },
  {
    id: ChainInfoID.Osmosis1,
    subdomain: 'osmosis',
  },
  {
    id: ChainInfoID.Uni6,
    subdomain: 'juno-testnet',
  },
  {
    id: OSMOSIS_TESTNET_CHAIN_ID,
    subdomain: 'osmosis-testnet',
  },
]
