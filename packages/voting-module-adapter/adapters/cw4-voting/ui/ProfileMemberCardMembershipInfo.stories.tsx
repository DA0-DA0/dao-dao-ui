import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ProfileMemberCardMembershipInfo,
  ProfileMemberCardMembershipInfoProps,
} from './ProfileMemberCardMembershipInfo'

export default {
  title:
    'DAO DAO / packages / voting-module-adapter / adapters / cw4-voting / ui / ProfileMemberCardMembershipInfo',
  component: ProfileMemberCardMembershipInfo,
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof ProfileMemberCardMembershipInfo>

const Template: ComponentStory<typeof ProfileMemberCardMembershipInfo> = (
  args
) => (
  <div className="max-w-xs">
    <ProfileMemberCardMembershipInfo {...args} />
  </div>
)

export const DefaultArgs: ProfileMemberCardMembershipInfoProps = {
  votingPower: 34.2,
}

export const Default = Template.bind({})
Default.args = DefaultArgs
