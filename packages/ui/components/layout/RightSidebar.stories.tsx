import { ComponentMeta, ComponentStory } from '@storybook/react'

import { RightSidebar, RightSidebarProps } from './RightSidebar'
import { SidebarWallet, SidebarWalletProps } from './SidebarWallet'
import { Connected as ConnectedSidebarWalletStory } from './SidebarWallet.SidebarWallet.stories'

export default {
  title: 'DAO DAO / packages / ui / components / layout / RightSidebar',
  component: RightSidebar,
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof RightSidebar>

const Template: ComponentStory<typeof RightSidebar> = (args) => (
  <RightSidebar {...args} />
)

export const DefaultArgs: RightSidebarProps = {
  wallet: (
    <SidebarWallet
      {...(ConnectedSidebarWalletStory.args as SidebarWalletProps)}
    />
  ),
  children: <p>Right sidebar content</p>,
  profileImageUrl: '/noah.jpg',
}

export const Default = Template.bind({})
Default.args = DefaultArgs
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
