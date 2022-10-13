import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ApolloProvider as OriginalApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'
import { ChainInfoID } from '@noahsaso/cosmodal'
import { ReactNode } from 'react'

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
      },
      createHttpLink: () => createHttpLink(),
      httpSuffix: '',
    }),
  ]),
  cache: new InMemoryCache(),
})

export const SubQueryProvider = ({ children }: { children: ReactNode }) => (
  <OriginalApolloProvider client={client}>{children}</OriginalApolloProvider>
)
