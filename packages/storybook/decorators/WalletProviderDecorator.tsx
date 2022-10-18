// Inspired by https://storybook.js.org/addons/storybook-dark-mode README

import { DecoratorFn } from '@storybook/react'

import { WalletProvider } from '@dao-dao/common'

export const WalletProviderDecorator: DecoratorFn = (Story) => (
  <WalletProvider>
    <Story />
  </WalletProvider>
)
