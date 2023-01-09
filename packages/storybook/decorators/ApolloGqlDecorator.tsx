import { DecoratorFn } from '@storybook/react'

import { ApolloGqlProvider } from '@dao-dao/stateful'

export const ApolloGqlDecorator: DecoratorFn = (Story) => (
  <ApolloGqlProvider>
    <Story />
  </ApolloGqlProvider>
)
