import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ConnectedWallet } from 'components/ConnectedWallet'
import {
  ProfileHomeCard,
  ProfileHomeCardProps,
} from 'components/profile/ProfileHomeCard'
import { makeAppLayoutDecorator } from 'decorators'
import { HomeConnected } from 'pages/HomeConnected'
import { Default as FeaturedDaosStory } from 'stories/components/dao/FeaturedDaos.stories'
import { Default as ProfileHomeCardStory } from 'stories/components/profile/ProfileHomeCard.stories'

export default {
  title: 'DAO DAO UI V2 / pages / HomeConnected',
  component: HomeConnected,
  decorators: [
    makeAppLayoutDecorator({
      navigationProps: {
        hideInbox: true,
      },
      rightSidebar: (
        <>
          <ConnectedWallet
            onDisconnect={() => {}}
            tokenBalance={ProfileHomeCardStory.args!.unstakedBalance!}
            tokenSymbol={ProfileHomeCardStory.args!.tokenSymbol!}
            walletAddress="juno123xyz"
            walletName={ProfileHomeCardStory.args!.walletName!}
          />

          <ProfileHomeCard
            {...(ProfileHomeCardStory.args as ProfileHomeCardProps)}
          />
        </>
      ),
    }),
  ],
} as ComponentMeta<typeof HomeConnected>

const Template: ComponentStory<typeof HomeConnected> = (args) => (
  <HomeConnected {...args} />
)

export const Default = Template.bind({})
Default.args = {
  featuredDaos: FeaturedDaosStory.args!.featuredDaos,
  pinnedDaos: FeaturedDaosStory.args!.featuredDaos,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=272%3A64674',
  },
  nextRouter: {
    asPath: '/home',
  },
}
