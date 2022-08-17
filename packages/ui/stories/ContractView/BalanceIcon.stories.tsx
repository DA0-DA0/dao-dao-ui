import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BalanceIcon } from 'components/ContractView/BalanceIcon'

export default {
  title: 'DAO DAO UI / ContractView / BalanceIcon',
  component: BalanceIcon,
} as ComponentMeta<typeof BalanceIcon>

const Template: ComponentStory<typeof BalanceIcon> = (args) => (
  <BalanceIcon {...args} />
)

export const Default = Template.bind({})
Default.args = {}
