import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TokenCard } from 'components/TokenCard'

export default {
  title: 'DAO DAO UI v2 / TokenCard',
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

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A15313',
  },
}
