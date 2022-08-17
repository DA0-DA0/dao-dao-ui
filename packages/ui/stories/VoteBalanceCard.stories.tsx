import { ComponentMeta, ComponentStory } from '@storybook/react'

import { VoteBalanceCard } from 'components/VoteBalanceCard'

export default {
  title: 'DAO DAO UI / VoteBalanceCard',
  component: VoteBalanceCard,
} as ComponentMeta<typeof VoteBalanceCard>

const Template: ComponentStory<typeof VoteBalanceCard> = (args) => <VoteBalanceCard {...args} />

export const Default = Template.bind({})
Default.args = {
  "weight": null, // TODO: Fill in default value.
  "title": null, // TODO: Fill in default value.
  "weightTotal": null // TODO: Fill in default value.
}
