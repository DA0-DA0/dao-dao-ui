import { ComponentMeta, ComponentStory } from '@storybook/react'

import { HugeDecimal } from '@dao-dao/math'
import { makeProps as makeUnstakingLineProps } from '@dao-dao/stateless/components/token/UnstakingLine.stories'
import { CHAIN_ID } from '@dao-dao/storybook'
import { TokenType, UnstakingTask, UnstakingTaskStatus } from '@dao-dao/types'

import {
  ProfileCardMemberInfoTokens,
  ProfileCardMemberInfoTokensProps,
} from './ProfileCardMemberInfoTokens'

export default {
  title:
    'DAO DAO / packages / stateful / voting-module-adapter / components / ProfileCardMemberInfoTokens',
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
  daoName: 'A Very Real DAO',
  claimingLoading: false,
  stakingLoading: false,
  onClaim: () => alert('claim'),
  onStake: () => alert('stake'),
  loadingTokens: {
    loading: false,
    data: [
      {
        token: {
          source: {
            chainId: CHAIN_ID,
            type: TokenType.Native,
            denomOrAddress: 'ureal',
          },
          chainId: CHAIN_ID,
          type: TokenType.Native,
          denomOrAddress: 'ureal',
          symbol: 'REAL',
          decimals: 6,
          imageUrl: undefined,
        },
        staked: HugeDecimal.fromHumanReadable(stakedTokens ?? 50, 6),
        unstaked: HugeDecimal.fromHumanReadable(45.413, 6),
      },
    ],
  },
  unstakingDurationSeconds: 28 * 24 * 3600,
  unstakingTasks: unstakingTasks ?? [
    makeUnstakingLineProps(UnstakingTaskStatus.ReadyToClaim, 'REAL').task,
    makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'REAL').task,
    makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'REAL').task,
    makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'REAL').task,
  ],
  loadingVotingPower: { loading: false, data: 34.2 },
  refreshUnstakingTasks: () => console.log('refresh unstaking tasks'),
})

export const makeCantVoteOnProposalProps = (
  ...params: Parameters<typeof makeProps>
): ProfileCardMemberInfoTokensProps => ({
  ...makeProps(...params),
  loadingTokens: {
    loading: false,
    data: [
      {
        token: {
          source: {
            chainId: CHAIN_ID,
            type: TokenType.Native,
            denomOrAddress: 'ureal',
          },
          chainId: CHAIN_ID,
          type: TokenType.Native,
          denomOrAddress: 'ureal',
          symbol: 'REAL',
          decimals: 6,
          imageUrl: undefined,
        },
        staked: HugeDecimal.zero,
        unstaked: HugeDecimal.fromHumanReadable(45.413, 6),
      },
    ],
  },
  loadingVotingPower: { loading: false, data: 0 },
  cantVoteOnProposal: true,
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
  loadingTokens: {
    loading: true,
  },
  loadingVotingPower: { loading: true },
}

export const NotMember = Template.bind({})
NotMember.args = {
  ...makeCantVoteOnProposalProps(),
  cantVoteOnProposal: false,
}
NotMember.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14824',
  },
}

export const CantVoteOnProposal = Template.bind({})
CantVoteOnProposal.args = makeCantVoteOnProposalProps()
