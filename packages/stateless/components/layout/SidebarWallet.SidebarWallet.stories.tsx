import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SidebarWallet } from './SidebarWallet'

export default {
  title: 'DAO DAO / packages / stateless / components / layout / SidebarWallet',
  component: SidebarWallet,
} as ComponentMeta<typeof SidebarWallet>

const Template: ComponentStory<typeof SidebarWallet> = (args) => (
  <SidebarWallet {...args} />
)

export const Connected = Template.bind({})
Connected.args = {
  connected: true,
  walletProviderImageUrl: '/daodao.png',
  walletAddress: 'juno123abc987zyx',
  walletName: 'my_wallet',
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
