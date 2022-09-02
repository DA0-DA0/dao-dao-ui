import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Default as ProfileHomeCardStory } from 'components/profile/ProfileHomeCard.stories'

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
  connected: true,
  tokenBalance: ProfileHomeCardStory.args!.unstakedBalance!,
  tokenSymbol: ProfileHomeCardStory.args!.tokenSymbol!,
  walletAddress: 'juno123abc987zyx',
  walletName: ProfileHomeCardStory.args!.walletName!,
}

export const Disconnected = Template.bind({})
Disconnected.args = {
  connected: false,
}
