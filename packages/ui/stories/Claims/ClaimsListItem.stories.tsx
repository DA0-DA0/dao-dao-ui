import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ClaimsListItem } from 'components/Claims/ClaimsListItem'

export default {
  title: 'DAO DAO UI / Claims / ClaimsListItem',
  component: ClaimsListItem,
} as ComponentMeta<typeof ClaimsListItem>

const Template: ComponentStory<typeof ClaimsListItem> = (args) => (
  <ClaimsListItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
  claim: {
    amount: '1000000',
    release_at: { at_time: (Date.now() + 60 * 1000).toString() },
  },
  blockHeight: 4396540,
  tokenInfo: {
    name: 'Token',
    symbol: 'TOKEN',
    decimals: 6,
    total_supply: '100000000',
  },
}
