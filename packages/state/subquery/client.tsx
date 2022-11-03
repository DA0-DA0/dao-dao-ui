import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core'
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'
import { ChainInfoID } from '@noahsaso/cosmodal'

import { CHAIN_ID } from '@dao-dao/utils'

export const client = new ApolloClient({
  link: ApolloLink.from([
    new MultiAPILink({
      endpoints: {
        // Featured DAOs only exist on mainnet, so use this indexer for featured
        // DAOs even on testnet.
        mainnetDaos: 'https://index.daodao.zone/daos',
        // Switch indexer based on chain.
        daos:
          CHAIN_ID === ChainInfoID.Juno1
            ? 'https://index.daodao.zone/daos'
            : 'https://index.daodao.zone/testnet-daos',
        // Switch indexer based on chain.
        proposals:
          CHAIN_ID === ChainInfoID.Juno1
            ? 'https://index.daodao.zone/proposals'
            : 'https://index.daodao.zone/testnet-proposals',
        wasmswap: 'https://index.daodao.zone/wasmswap',
        // Juno Loop NFT Market
        loop: 'https://nft-juno-backend.loop.markets',
      },
      createHttpLink: () => createHttpLink(),
      httpSuffix: '',
    }),
  ]),
  cache: new InMemoryCache(),
})
