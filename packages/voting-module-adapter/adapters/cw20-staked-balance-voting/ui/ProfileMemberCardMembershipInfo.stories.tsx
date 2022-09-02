import { ComponentMeta, ComponentStory } from '@storybook/react'

import { UnstakingTask, UnstakingTaskStatus } from '@dao-dao/ui'
import { makeProps as makeUnstakingLineProps } from '@dao-dao/ui/components/UnstakingLine.stories'

import { ProfileMemberCardMembershipInfo } from './ProfileMemberCardMembershipInfo'

export default {
  title:
    'DAO DAO / packages / voting-module-adapter / adapters / cw20-staked-balance-voting / ui / ProfileMemberCardMembershipInfo',
  component: ProfileMemberCardMembershipInfo,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof ProfileMemberCardMembershipInfo>

const Template: ComponentStory<typeof ProfileMemberCardMembershipInfo> = (
  args
) => <ProfileMemberCardMembershipInfo {...args} />

export const makeProps = (unstakingTasks?: UnstakingTask[]) => ({
  loadingClaiming: false,
  loadingManaging: false,
  onClaim: () => alert('claim'),
  stakedTokens: 50,
  tokenDecimals: 6,
  tokenSymbol: 'DOG',
  unstakedTokens: 45.413,
  unstakingDuration: '28 days',
  unstakingTasks: unstakingTasks ?? [
    makeUnstakingLineProps(UnstakingTaskStatus.ReadyToClaim, 'DOG').task,
    makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'DOG').task,
    makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'DOG').task,
    makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'DOG').task,
  ],
  votingPower: 34.2,
})

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14709',
  },
}
