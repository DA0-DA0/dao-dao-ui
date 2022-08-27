import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SidebarWallet } from 'components/layout/SidebarWallet'
import { Default as ProfileHomeCardStory } from 'stories/components/profile/ProfileHomeCard.stories'

export default {
  title: 'DAO DAO UI V2 / components / layout / SidebarWallet',
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
