import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BalanceListItem } from 'components/ContractView/BalanceListItem'

export default {
  title: 'DAO DAO UI / ContractView / BalanceListItem',
  component: BalanceListItem,
} as ComponentMeta<typeof BalanceListItem>

const Template: ComponentStory<typeof BalanceListItem> = (args) => (
  <BalanceListItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'Content',
}
