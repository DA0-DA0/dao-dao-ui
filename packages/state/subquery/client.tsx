import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as OriginalApolloProvider,
} from '@apollo/client'
import { ReactNode } from 'react'

export const client = new ApolloClient({
  // uri: 'https://api.subquery.network/sq/NoahSaso/dao-dao-v2-inbox',
  uri: 'http://localhost:3001',
  cache: new InMemoryCache(),
})

export const SubQueryProvider = ({ children }: { children: ReactNode }) => (
  <OriginalApolloProvider client={client}>{children}</OriginalApolloProvider>
)
