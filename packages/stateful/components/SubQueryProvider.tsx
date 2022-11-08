import { ApolloProvider } from '@apollo/client'
import { ReactNode } from 'react'

import { client } from '@dao-dao/state/subquery/client'

export const SubQueryProvider = ({ children }: { children: ReactNode }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
)
