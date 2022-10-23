import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SplashAnnouncementCard } from './SplashAnnouncementCard'

export default {
  title:
    'DAO DAO / packages / stateless / components / splash / SplashAnnouncementCard',
  component: SplashAnnouncementCard,
} as ComponentMeta<typeof SplashAnnouncementCard>

const Template: ComponentStory<typeof SplashAnnouncementCard> = (_args) => (
  <SplashAnnouncementCard />
)

export const Default = Template.bind({})
Default.args = {}
