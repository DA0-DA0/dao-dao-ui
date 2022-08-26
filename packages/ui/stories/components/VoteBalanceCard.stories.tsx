import { ComponentMeta, ComponentStory } from '@storybook/react'

import { VoteBalanceCard } from 'components/VoteBalanceCard'

export default {
  title: 'DAO DAO UI / components / VoteBalanceCard',
  component: VoteBalanceCard,
} as ComponentMeta<typeof VoteBalanceCard>

const Template: ComponentStory<typeof VoteBalanceCard> = (args) => (
  <VoteBalanceCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  weight: 123,
  title: 'junoabcdef...xyz',
  weightTotal: 4321,
}
