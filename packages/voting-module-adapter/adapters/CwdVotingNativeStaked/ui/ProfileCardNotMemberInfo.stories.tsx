import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ProfileCardNotMemberInfo,
  ProfileCardNotMemberInfoProps,
} from './ProfileCardNotMemberInfo'

export default {
  title:
    'DAO DAO / packages / voting-module-adapter / adapters / CwdVotingCw20Staked / ui / ProfileCardNotMemberInfo',
  component: ProfileCardNotMemberInfo,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof ProfileCardNotMemberInfo>

const Template: ComponentStory<typeof ProfileCardNotMemberInfo> = (args) => (
  <div className="max-w-[320px]">
    <ProfileCardNotMemberInfo {...args} />
  </div>
)

export const makeProps = (
  unstakedTokenBalance = 0,
  stakedTokenBalance = 0
): ProfileCardNotMemberInfoProps => ({
  tokenSymbol: 'JUNOX',
  tokenDecimals: 6,
  unstakedTokenBalance,
  stakedTokenBalance,
  daoName: 'JUNOX Governance',
  onStake: () => alert('stake'),
  proposalContext: true,
  deposit: undefined,
})

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14824',
  },
}

export const DefaultDao = Template.bind({})
DefaultDao.args = {
  ...Default.args,
  proposalContext: false,
}

export const HasUnstaked = Template.bind({})
HasUnstaked.args = makeProps(7.925)
HasUnstaked.parameters = Default.parameters

export const HasStaked = Template.bind({})
HasStaked.args = makeProps(undefined, 34.12968)
HasStaked.parameters = Default.parameters
