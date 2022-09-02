import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SidebarWalletLoading } from 'components/layout/SidebarWallet'

export default {
  title: 'DAO DAO V2 / components / layout / SidebarWalletLoading',
  component: SidebarWalletLoading,
} as ComponentMeta<typeof SidebarWalletLoading>

const Template: ComponentStory<typeof SidebarWalletLoading> = (_args) => (
  <SidebarWalletLoading />
)

export const Default = Template.bind({})
