import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AppLayout } from './AppLayout'
import { NavigationProps } from './Navigation'
import { Default as NavigatonStory } from './Navigation.stories'
import { SidebarWallet, SidebarWalletProps } from './SidebarWallet'
import { Connected as ConnectedSidebarWalletStory } from './SidebarWallet.SidebarWallet.stories'

export default {
  title: 'DAO DAO / packages / ui / components / layout / AppLayout',
  component: AppLayout,
} as ComponentMeta<typeof AppLayout>

const Template: ComponentStory<typeof AppLayout> = (args) => (
  <AppLayout {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: (
    <div className="flex justify-center items-center h-full">
      <p>App content</p>
    </div>
  ),
  rightSidebar: <p>Right sidebar content</p>,
  navigationProps: NavigatonStory.args as NavigationProps,
  wallet: (
    <SidebarWallet
      {...(ConnectedSidebarWalletStory.args as SidebarWalletProps)}
    />
  ),
}
