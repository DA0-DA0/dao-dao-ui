import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WalletConnect } from 'components/WalletConnect'

export default {
  title: 'DAO DAO UI / WalletConnect',
  component: WalletConnect,
} as ComponentMeta<typeof WalletConnect>

const Template: ComponentStory<typeof WalletConnect> = (args) => (
  <WalletConnect {...args} />
)

export const Default = Template.bind({})
Default.args = {
  connected: null, // TODO: Fill in default value.
  walletAddress: null, // TODO: Fill in default value.
  walletName: null, // TODO: Fill in default value.
  walletBalance: null, // TODO: Fill in default value.
  walletBalanceDenom: null, // TODO: Fill in default value.
  onConnect: null, // TODO: Fill in default value.
}
