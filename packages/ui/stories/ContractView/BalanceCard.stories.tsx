import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BalanceCard } from 'components/ContractView/BalanceCard'

export default {
  title: 'DAO DAO UI / ContractView / BalanceCard',
  component: BalanceCard,
} as ComponentMeta<typeof BalanceCard>

const Template: ComponentStory<typeof BalanceCard> = (args) => <BalanceCard {...args} />

export const Default = Template.bind({})
Default.args = {
  "title": null, // TODO: Fill in default value.
  "buttonLabel": null, // TODO: Fill in default value.
  "loading": null, // TODO: Fill in default value.
  "onClick": null // TODO: Fill in default value.
}
