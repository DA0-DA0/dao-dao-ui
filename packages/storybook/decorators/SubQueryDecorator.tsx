import { DecoratorFn } from '@storybook/react'

import { SubQueryProvider } from '@dao-dao/state'

export const SubQueryDecorator: DecoratorFn = (Story) => (
  <SubQueryProvider>
    <Story />
  </SubQueryProvider>
)
