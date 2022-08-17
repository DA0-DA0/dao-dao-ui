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
  tokenName: 'Juno Network',
  tokenSymbol: 'JUNO',
  tokenBalance: '5',
}
