import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeAppLayoutDecorator } from '@dao-dao/storybook/decorators'

import { ProfileHomeDisconnectedCard, SidebarWallet } from '../components'
import { Default as FeaturedDaos } from '../components/dao/FeaturedDaos.stories'
import { HomeDisconnected } from './HomeDisconnected'

export default {
  title: 'DAO DAO / packages / ui / pages / HomeDisconnected',
  component: HomeDisconnected,
  decorators: [
    makeAppLayoutDecorator({
      navigationProps: {
        hideInbox: true,
      },
      rightSidebarProps: {
        wallet: <SidebarWallet connected={false} onConnect={() => {}} />,
      },
    }),
  ],
} as ComponentMeta<typeof HomeDisconnected>

const Template: ComponentStory<typeof HomeDisconnected> = (args) => (
  <HomeDisconnected {...args} />
)

export const Default = Template.bind({})
Default.args = {
  featuredDaos: FeaturedDaos.args?.featuredDaos,
  rightSidebarContent: <ProfileHomeDisconnectedCard />,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=272%3A64768',
  },
  nextRouter: {
    asPath: '/home',
  },
}
