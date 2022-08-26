import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TreasuryBalances } from 'components/ContractView/TreasuryBalances'

export default {
  title: 'DAO DAO UI / components / ContractView / TreasuryBalances',
  component: TreasuryBalances,
} as ComponentMeta<typeof TreasuryBalances>

const Template: ComponentStory<typeof TreasuryBalances> = (args) => (
  <TreasuryBalances {...args} />
)

export const Default = Template.bind({})
Default.args = {
  nativeTokens: [
    {
      denom: 'ujuno',
      amount: '12345',
      decimals: 6,
    },
  ],
  cw20Tokens: [
    {
      symbol: 'TOKEN',
      amount: '67890',
      decimals: 6,
      imageUrl: '/juno-symbol.png',
    },
  ],
  usdcValue: 9876543.21,
}
