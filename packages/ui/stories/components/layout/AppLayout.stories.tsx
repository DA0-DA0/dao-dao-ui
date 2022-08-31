import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SidebarWallet, SidebarWalletProps } from 'components'
import { AppLayout } from 'components/layout/AppLayout'
import { NavigationProps } from 'components/layout/Navigation'
import { Default as NavigatonStory } from 'stories/components/layout/Navigation.stories'
import { Connected as ConnectedSidebarWalletStory } from 'stories/components/layout/SidebarWallet/SidebarWallet.stories'

export default {
  title: 'DAO DAO UI V2 / components / layout / AppLayout',
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
