import { ChainInfoID } from '@noahsaso/cosmodal'

import { SupportedChain } from '@dao-dao/types'

export const SupportedChains: SupportedChain[] = [
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
