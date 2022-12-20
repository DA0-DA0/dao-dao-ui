import { ApolloProvider } from '@apollo/client'
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core'
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'
import { ChainInfoID } from '@noahsaso/cosmodal'
import { ReactNode } from 'react'

import { CHAIN_ID } from '@dao-dao/utils'

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    new MultiAPILink({
      endpoints: {
        // Switch indexer based on chain.
        proposals:
          CHAIN_ID === ChainInfoID.Juno1
            ? 'https://index.daodao.zone/proposals'
            : 'https://index.daodao.zone/testnet-proposals',
        // Juno Loop NFT Market
        loop: 'https://nft-juno-backend.loop.markets',
      },
      createHttpLink: () => createHttpLink(),
      httpSuffix: '',
    }),
  ]),
  cache: new InMemoryCache(),
})

export const ApolloGqlProvider = ({ children }: { children: ReactNode }) => (
  <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
)
