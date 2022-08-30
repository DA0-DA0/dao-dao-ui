import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TokenCard, TokenCardProps } from 'components/TokenCard'

export default {
  title: 'DAO DAO UI V2 / components / TokenCard',
  component: TokenCard,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof TokenCard>

const Template: ComponentStory<typeof TokenCard> = (args) => (
  <div className="max-w-xs">
    <TokenCard {...args} />
  </div>
)

export const makeProps = (crown = false): TokenCardProps => {
  // Random price between 0 and 10000 with up to 6 decimals.
  const unstaked = Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6
  const stakes: TokenCardProps['stakes'] = [
    {
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
      validator: 'Stakefish',
      rewards: 1.23,
    },
    {
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
      validator: '2x4 Ben',
      rewards: 4.56,
    },
    {
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
      validator: 'Cosmostation',
      rewards: 7.89,
    },
    {
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
      validator: 'SG-1',
      rewards: 10.11,
    },
  ]

  return {
    crown,
    imageUrl: `/placeholders/${Math.floor(Math.random() * 5) + 1}.svg`,
    tokenSymbol: 'JUNO',
    subtitle: 'Juno Network',
    totalBalance:
      unstaked + stakes.reduce((acc, stake) => acc + stake.amount, 0),
    tokenDecimals: 6,
    usdcUnitPrice: 5.38,
    stakes,
  }
}

export const Default = Template.bind({})
Default.args = makeProps()

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A15313',
  },
}
