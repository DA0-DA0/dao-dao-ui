import { DecoratorFn } from '@storybook/react'

import { WalletActionsProvider } from '@dao-dao/stateful/actions'

export const WalletActionsProviderDecorator: DecoratorFn = (Story) => (
  <WalletActionsProvider>
    <Story />
  </WalletActionsProvider>
)
