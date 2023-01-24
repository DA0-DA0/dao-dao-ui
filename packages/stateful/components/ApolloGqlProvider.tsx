import { ApolloProvider } from '@apollo/client'
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client/core'
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'
import { ReactNode } from 'react'

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    new MultiAPILink({
      endpoints: {
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
