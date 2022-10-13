import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ApolloProvider as OriginalApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { MultiAPILink } from '@habx/apollo-multi-endpoint-link'
import { ReactNode } from 'react'

export const client = new ApolloClient({
  link: ApolloLink.from([
    new MultiAPILink({
      endpoints: {
        daos: 'https://index.daodao.zone/daos',
        testnetDaos: 'https://index.daodao.zone/testnet-daos',
        proposals: 'https://index.daodao.zone/proposals',
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
