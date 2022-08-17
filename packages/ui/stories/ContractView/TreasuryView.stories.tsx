import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TreasuryBalances } from 'components/ContractView/TreasuryView'

export default {
  title: 'DAO DAO UI / ContractView / TreasuryBalances',
  component: TreasuryBalances,
} as ComponentMeta<typeof TreasuryBalances>

const Template: ComponentStory<typeof TreasuryBalances> = (args) => (
  <TreasuryBalances {...args} />
)

export const Default = Template.bind({})
Default.args = {
  nativeTokens: null, // TODO: Fill in default value.
  cw20Tokens: null, // TODO: Fill in default value.
  usdcValue: null, // TODO: Fill in default value.
}
