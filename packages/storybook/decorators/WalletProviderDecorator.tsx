import { DecoratorFn } from '@storybook/react'

import { WalletProvider } from '@dao-dao/stateful'

export const WalletProviderDecorator: DecoratorFn = (Story) => (
  <WalletProvider
    setWeb3AuthPrompt={(value) => alert(JSON.stringify(value, null, 2))}
  >
    <Story />
  </WalletProvider>
)
