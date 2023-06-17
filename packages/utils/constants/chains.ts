import { ChainInfoID } from '@noahsaso/cosmodal'

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
]
