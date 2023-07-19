import { DecoratorFn } from '@storybook/react'

import { ChainProvider } from '@dao-dao/stateless'
import { ChainId } from '@dao-dao/types'

export const ChainDecorator: DecoratorFn = (Story) => (
  <ChainProvider chainId={ChainId.JunoMainnet}>
    <Story />
  </ChainProvider>
)
