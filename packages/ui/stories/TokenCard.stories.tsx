import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TokenCard } from 'components/TokenCard'

export default {
  title: 'DAO DAO UI / TokenCard',
  component: TokenCard,
} as ComponentMeta<typeof TokenCard>

const Template: ComponentStory<typeof TokenCard> = (args) => (
  <TokenCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  tokenImageUrl: '/placeholders/3.svg',
  tokenSymbol: 'JUNO',
  tokenBalance: '5',
  tokenBalanceUSDCEquivalent: '55.12',
  tokenUSDCPrice: '5.12',
}
