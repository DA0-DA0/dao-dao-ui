import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ProfileCardMemberInfo,
  ProfileCardMemberInfoProps,
} from './ProfileCardMemberInfo'

export default {
  title:
    'DAO DAO / packages / voting-module-adapter / adapters / CwdVotingCw4 / ui / ProfileCardMemberInfo',
  component: ProfileCardMemberInfo,
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof ProfileCardMemberInfo>

const Template: ComponentStory<typeof ProfileCardMemberInfo> = (args) => (
  <div className="max-w-xs">
    <ProfileCardMemberInfo {...args} />
  </div>
)

export const DefaultArgs: ProfileCardMemberInfoProps = {
  daoName: 'DAO Name',
  votingPower: 34.2,
}

export const Default = Template.bind({})
Default.args = DefaultArgs

export const NotMember = Template.bind({})
NotMember.args = {
  ...DefaultArgs,
  votingPower: 0,
}

export const NotMemberProposal = Template.bind({})
NotMemberProposal.args = {
  ...NotMember.args,
  votingPower: 0,
  cantVoteOnProposal: true,
}
