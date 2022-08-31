import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Cw20StakedBalanceVotingProfileMembership } from 'components/profile/Cw20StakedBalanceVotingProfileMembership'

export default {
  title:
    'DAO DAO UI V2 / components / profile / Cw20StakedBalanceVotingProfileMembership',
  component: Cw20StakedBalanceVotingProfileMembership,
} as ComponentMeta<typeof Cw20StakedBalanceVotingProfileMembership>

const Template: ComponentStory<
  typeof Cw20StakedBalanceVotingProfileMembership
> = (args) => (
  <div className="max-w-[320px]">
    <Cw20StakedBalanceVotingProfileMembership {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  tokenSymbol: 'DOG',
  unstakedTokenBalance: 0,
  stakedTokenBalance: 0,
  junoswapHref: 'https://junoswap.com',
  children: <p>Explanatory text goes here.</p>,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14824',
  },
}
