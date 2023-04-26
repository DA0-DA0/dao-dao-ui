import { DecoratorFn } from '@storybook/react'

import { ChainProvider } from '@dao-dao/stateless'
import { CHAIN_ID } from '@dao-dao/utils'

export const ChainDecorator: DecoratorFn = (Story) => (
  <ChainProvider chainId={CHAIN_ID}>
    <Story />
  </ChainProvider>
)
