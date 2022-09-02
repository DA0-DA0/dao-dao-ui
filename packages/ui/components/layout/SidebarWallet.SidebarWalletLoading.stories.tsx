import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SidebarWalletLoading } from './SidebarWallet'

export default {
  title:
    'DAO DAO / packages / ui / components / layout / SidebarWalletLoading',
  component: SidebarWalletLoading,
} as ComponentMeta<typeof SidebarWalletLoading>

const Template: ComponentStory<typeof SidebarWalletLoading> = (_args) => (
  <SidebarWalletLoading />
)

export const Default = Template.bind({})
