import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WalletConnect } from './WalletConnect'

export default {
  title: '(OLD DAO DAO) / components / WalletConnect',
  component: WalletConnect,
} as ComponentMeta<typeof WalletConnect>

const Template: ComponentStory<typeof WalletConnect> = (args) => (
  <WalletConnect {...args} />
)

export const Default = Template.bind({})
Default.args = {
  connected: false,
  walletBalanceDenom: 'DENOM',
}
