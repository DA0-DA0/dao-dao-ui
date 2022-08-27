import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ConnectWallet } from 'components/ConnectWallet'
import { ProfileHomeDisconnectedCardProps } from 'components/profile/ProfileHomeDisconnectedCard'
import { makeAppLayoutDecorator } from 'decorators'
import { HomeDisconnected } from 'pages/HomeDisconnected'
import { Default as FeaturedDaos } from 'stories/components/dao/FeaturedDaos.stories'
import { Default as ProfileHomeDisconnectedCard } from 'stories/components/profile/ProfileHomeDisconnectedCard.stories'

export default {
  title: 'DAO DAO UI V2 / pages / HomeDisconnected',
  component: HomeDisconnected,
  decorators: [
    makeAppLayoutDecorator({
      rightCard: (
        <>
          <ConnectWallet className="self-end" onConnect={() => {}} />

          <ProfileHomeDisconnectedCard
            {...(ProfileHomeDisconnectedCard.args as ProfileHomeDisconnectedCardProps)}
          />
        </>
      ),
      navigationProps: {
        hideInbox: true,
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
