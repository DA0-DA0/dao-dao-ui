import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SplashStatsCard } from './SplashStatsCard'

export default {
  title:
    'DAO DAO / packages / stateless / components / splash / SplashStatsCard',
  component: SplashStatsCard,
} as ComponentMeta<typeof SplashStatsCard>

const Template: ComponentStory<typeof SplashStatsCard> = (args) => (
  <SplashStatsCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: <p>Content!</p>,
}
