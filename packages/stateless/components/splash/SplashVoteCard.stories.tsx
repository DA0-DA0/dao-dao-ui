import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SplashVoteCard } from './SplashVoteCard'

export default {
  title:
    'DAO DAO / packages / stateless / components / splash / SplashVoteCard',
  component: SplashVoteCard,
} as ComponentMeta<typeof SplashVoteCard>

const Template: ComponentStory<typeof SplashVoteCard> = (_args) => (
  <SplashVoteCard />
)

export const Default = Template.bind({})
Default.args = {}
