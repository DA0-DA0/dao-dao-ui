import { ComponentMeta, ComponentStory } from '@storybook/react'

import { UnstakingTask, UnstakingTaskStatus } from '@dao-dao/tstypes'
import { makeProps as makeUnstakingLineProps } from '@dao-dao/ui/components/UnstakingLine.stories'

import {
  ProfileMemberCardMembershipInfo,
  ProfileMemberCardMembershipInfoProps,
} from './ProfileMemberCardMembershipInfo'

export default {
  title:
    'DAO DAO / packages / voting-module-adapter / adapters / cw20-staked-balance-voting / ui / ProfileMemberCardMembershipInfo',
  component: ProfileMemberCardMembershipInfo,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof ProfileMemberCardMembershipInfo>

const Template: ComponentStory<typeof ProfileMemberCardMembershipInfo> = (
  args
) => (
  <div className="max-w-xs">
    <ProfileMemberCardMembershipInfo {...args} />
  </div>
)

export const makeProps = (
  unstakingTasks?: UnstakingTask[]
): ProfileMemberCardMembershipInfoProps => ({
  claimingLoading: false,
  stakingLoading: false,
  onClaim: () => alert('claim'),
  onStake: () => alert('stake'),
  stakedTokens: 50,
  tokenDecimals: 6,
  tokenSymbol: 'DOG',
  unstakedTokens: 45.413,
  unstakingDurationSeconds: 28 * 24 * 3600,
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
