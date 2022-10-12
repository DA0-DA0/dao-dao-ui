import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Default as ProfileHomeCardStory } from '../profile/ProfileHomeCard.stories'
import { SidebarWallet } from './SidebarWallet'

export default {
  title: 'DAO DAO / packages / ui / components / layout / SidebarWallet',
  component: SidebarWallet,
} as ComponentMeta<typeof SidebarWallet>

const Template: ComponentStory<typeof SidebarWallet> = (args) => (
  <SidebarWallet {...args} />
)

export const Connected = Template.bind({})
Connected.args = {
  connectedOrConnecting: true,
  data: {
    loading: false,
    data: {
      tokenBalance: 2400.111111,
      walletAddress: 'juno123abc987zyx',
      walletName: 'my_wallet',
    },
  },
  tokenSymbol: ProfileHomeCardStory.args!.tokenSymbol!,
}

export const Connecting = Template.bind({})
Connecting.args = {
  connectedOrConnecting: true,
  data: {
    loading: true,
  },
  tokenSymbol: ProfileHomeCardStory.args!.tokenSymbol!,
}

export const Disconnected = Template.bind({})
Disconnected.args = {
  connectedOrConnecting: false,
}
