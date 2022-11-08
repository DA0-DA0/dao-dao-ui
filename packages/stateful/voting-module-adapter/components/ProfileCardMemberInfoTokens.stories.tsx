import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeProps as makeUnstakingLineProps } from '@dao-dao/stateless/components/token/UnstakingLine.stories'
import { UnstakingTask, UnstakingTaskStatus } from '@dao-dao/types'

import {
  ProfileCardMemberInfoTokens,
  ProfileCardMemberInfoTokensProps,
} from './ProfileCardMemberInfoTokens'

export default {
  title:
    'DAO DAO / packages / voting-module-adapter / components / ProfileCardMemberInfoTokens',
  component: ProfileCardMemberInfoTokens,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof ProfileCardMemberInfoTokens>

const Template: ComponentStory<typeof ProfileCardMemberInfoTokens> = (args) => (
  <div className="max-w-xs">
    <ProfileCardMemberInfoTokens {...args} />
  </div>
)

export const makeProps = (
  unstakingTasks?: UnstakingTask[],
  stakedTokens?: number
): ProfileCardMemberInfoTokensProps => ({
  daoName: 'Dog Dao',
  claimingLoading: false,
  stakingLoading: false,
  onClaim: () => alert('claim'),
  onStake: () => alert('stake'),
  loadingStakedTokens: { loading: false, data: stakedTokens ?? 50 },
  tokenDecimals: 6,
  tokenSymbol: 'DOG',
  loadingUnstakedTokens: { loading: false, data: 45.413 },
  unstakingDurationSeconds: 28 * 24 * 3600,
  unstakingTasks: unstakingTasks ?? [
    makeUnstakingLineProps(UnstakingTaskStatus.ReadyToClaim, 'DOG').task,
    makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'DOG').task,
    makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'DOG').task,
    makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'DOG').task,
  ],
  loadingVotingPower: { loading: false, data: 34.2 },
  refreshUnstakingTasks: () => console.log('refresh unstaking tasks'),
})

export const makeCantVoteOnProposalProps = (
  ...params: Parameters<typeof makeProps>
): ProfileCardMemberInfoTokensProps => ({
  ...makeProps(...params),
  loadingStakedTokens: { loading: false, data: 0 },
  loadingVotingPower: { loading: false, data: 0 },
  cantVoteOnProposal: true,
  junoswapHref: 'https://junoswap.com',
})

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14709',
  },
}

export const Loading = Template.bind({})
Loading.args = {
  ...makeProps(),
  loadingStakedTokens: { loading: true },
  loadingUnstakedTokens: { loading: true },
  loadingVotingPower: { loading: true },
}

export const NotMember = Template.bind({})
NotMember.args = {
  ...makeProps(),
  loadingStakedTokens: { loading: false, data: 0 },
  loadingVotingPower: { loading: false, data: 0 },
  junoswapHref: 'https://junoswap.com',
}
NotMember.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14824',
  },
}

export const CantVoteOnProposal = Template.bind({})
CantVoteOnProposal.args = makeCantVoteOnProposalProps()
