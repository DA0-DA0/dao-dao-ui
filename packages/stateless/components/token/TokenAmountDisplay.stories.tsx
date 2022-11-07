import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TokenAmountDisplay } from './TokenAmountDisplay'

export default {
  title:
    'DAO DAO / packages / stateless / components / token / TokenAmountDisplay',
  component: TokenAmountDisplay,
} as ComponentMeta<typeof TokenAmountDisplay>

const Template: ComponentStory<typeof TokenAmountDisplay> = (args) => (
  <TokenAmountDisplay className="inline-block" {...args} />
)

export const Default = Template.bind({})
Default.args = {
  amount: 951284124,
  symbol: 'USDC',
  decimals: 3,
}

export const Small = Template.bind({})
Small.args = {
  amount: 156,
  symbol: 'USDC',
  decimals: 3,
}
