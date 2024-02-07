import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NavWallet } from './NavWallet'

export default {
  title: 'DAO DAO / packages / stateless / components / layout / NavWallet',
  component: NavWallet,
} as ComponentMeta<typeof NavWallet>

const Template: ComponentStory<typeof NavWallet> = (args) => (
  <NavWallet {...args} />
)

export const Connected = Template.bind({})
Connected.args = {
  connected: true,
  walletAddress: 'juno123abc987zyx',
}

export const Connecting = Template.bind({})
Connecting.args = {
  connected: false,
  loading: true,
}

export const Disconnected = Template.bind({})
Disconnected.args = {
  connected: false,
}
