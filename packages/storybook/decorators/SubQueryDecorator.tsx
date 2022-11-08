import { DecoratorFn } from '@storybook/react'

import { SubQueryProvider } from '@dao-dao/stateful'

export const SubQueryDecorator: DecoratorFn = (Story) => (
  <SubQueryProvider>
    <Story />
  </SubQueryProvider>
)
