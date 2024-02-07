import { DecoratorFn } from '@storybook/react'

import { WalletProvider } from '@dao-dao/stateful'

export const WalletProviderDecorator: DecoratorFn = (Story) => (
  <WalletProvider>
    <Story />
  </WalletProvider>
)
