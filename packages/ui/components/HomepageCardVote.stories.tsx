import { ComponentMeta, ComponentStory } from '@storybook/react'

import { HomepageCardVote } from './HomepageCardVote'

export default {
  title: 'DAO DAO / packages / ui / components / HomepageCardVote',
  component: HomepageCardVote,
} as ComponentMeta<typeof HomepageCardVote>

const Template: ComponentStory<typeof HomepageCardVote> = (_args) => (
  <HomepageCardVote />
)

export const Default = Template.bind({})
Default.args = {}
