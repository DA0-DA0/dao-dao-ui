import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeAppLayoutDecorator } from '@dao-dao/storybook/decorators'

import { Default as FeaturedDaosStory } from 'components/dao/FeaturedDaos.stories'
import {
  ProfileHomeCard,
  ProfileHomeCardProps,
} from 'components/profile/ProfileHomeCard'
import { Default as ProfileHomeCardStory } from 'components/profile/ProfileHomeCard.stories'

import { HomeConnected } from './HomeConnected'

export default {
  title: 'DAO DAO / packages / ui / pages / HomeConnected',
  component: HomeConnected,
  decorators: [
    makeAppLayoutDecorator({
      rightSidebar: (
        <ProfileHomeCard
          {...(ProfileHomeCardStory.args as ProfileHomeCardProps)}
        />
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
