import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileHomeDisconnectedCardProps } from 'components/profile/ProfileHomeDisconnectedCard'
import { WalletConnectProps } from 'components/WalletConnect'
import { makeAppLayoutDecorator } from 'decorators'
import { HomeDisconnected } from 'pages/HomeDisconnected'
import { Default as FeaturedDaos } from 'stories/components/dao/FeaturedDaos.stories'
import { Default as ProfileHomeDisconnectedCard } from 'stories/components/profile/ProfileHomeDisconnectedCard.stories'
import { Default as WalletConnect } from 'stories/components/WalletConnect.stories'

export default {
  title: 'DAO DAO UI V2 / pages / HomeDisconnected',
  component: HomeDisconnected,
  decorators: [
    makeAppLayoutDecorator({
      rightCard: (
        <>
          <WalletConnect
            {...(WalletConnect.args as WalletConnectProps)}
            className="self-end"
          />

          <ProfileHomeDisconnectedCard
            {...(ProfileHomeDisconnectedCard.args as ProfileHomeDisconnectedCardProps)}
          />
        </>
      ),
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
}
