import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ProfileCardNoVoteBecomeMemberInfo,
  ProfileCardNoVoteBecomeMemberInfoProps,
} from './ProfileCardNoVoteBecomeMemberInfo'

export default {
  title:
    'DAO DAO / packages / voting-module-adapter / adapters / cw20-staked-balance-voting / ui / ProfileCardNoVoteBecomeMemberInfo',
  component: ProfileCardNoVoteBecomeMemberInfo,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof ProfileCardNoVoteBecomeMemberInfo>

const Template: ComponentStory<typeof ProfileCardNoVoteBecomeMemberInfo> = (
  args
) => (
  <div className="max-w-[320px]">
    <ProfileCardNoVoteBecomeMemberInfo {...args} />
  </div>
)

export const makeProps = (
  unstakedTokenBalance = 0,
  stakedTokenBalance = 0
): ProfileCardNoVoteBecomeMemberInfoProps => ({
  tokenSymbol: 'DOG',
  tokenDecimals: 6,
  unstakedTokenBalance,
  stakedTokenBalance,
  junoswapHref: 'https://junoswap.com',
  daoName: 'Dog Dao',
  onStake: () => alert('stake'),
})

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14824',
  },
}

export const HasUnstaked = Template.bind({})
HasUnstaked.args = makeProps(7.925)
HasUnstaked.parameters = Default.parameters

export const HasStaked = Template.bind({})
HasStaked.args = makeProps(undefined, 34.12968)
HasStaked.parameters = Default.parameters
