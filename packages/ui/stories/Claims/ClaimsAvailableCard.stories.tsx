import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ClaimsAvailableCard } from 'components/Claims/ClaimsAvailableCard'

export default {
  title: 'DAO DAO UI / Claims / ClaimsAvailableCard',
  component: ClaimsAvailableCard,
} as ComponentMeta<typeof ClaimsAvailableCard>

const Template: ComponentStory<typeof ClaimsAvailableCard> = (args) => (
  <ClaimsAvailableCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  available: 1000,
  tokenInfo: {
    name: 'Token',
    symbol: 'TOKEN',
    decimals: 6,
    total_supply: '100000000',
  },
  loading: false,
}
