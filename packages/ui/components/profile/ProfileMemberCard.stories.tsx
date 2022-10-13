import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileMemberCardMembershipInfo } from '@dao-dao/voting-module-adapter/adapters/CwdVotingCw20Staked/ui'
import { makeProps as makeProfileMemberCardMembershipInfoProps } from '@dao-dao/voting-module-adapter/adapters/CwdVotingCw20Staked/ui/ProfileMemberCardMembershipInfo.stories'

import { makeProps as makeUnstakingLineProps } from '../UnstakingLine.stories'
import { UnstakingTaskStatus } from '../UnstakingStatus'
import { ProfileMemberCard, ProfileMemberCardProps } from './ProfileMemberCard'

export default {
  title: 'DAO DAO / packages / ui / components / profile / ProfileMemberCard',
  component: ProfileMemberCard,
} as ComponentMeta<typeof ProfileMemberCard>

const Template: ComponentStory<typeof ProfileMemberCard> = (args) => (
  <div className="max-w-xs">
    <ProfileMemberCard {...args} />
  </div>
)

const makeProps = (
  ...args: Parameters<typeof makeProfileMemberCardMembershipInfoProps>
): ProfileMemberCardProps => ({
  daoName: 'Dog Dao',
  walletProfile: {
    loading: false,
    data: {
      nonce: 0,
      imageUrl: '/noah.jpg',
      name: '@Modern-Edamame',
      nft: null,
    },
  },
  walletAddress: 'wallet',
  openProposals: true,
  established: new Date(),
  membershipInfo: (
    <ProfileMemberCardMembershipInfo
      {...makeProfileMemberCardMembershipInfoProps(...args)}
    />
  ),
})

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14709',
  },
}

export const NothingToClaim = Template.bind({})
NothingToClaim.args = makeProps([
  makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'DOG').task,
  makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'DOG').task,
  makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'DOG').task,
])

export const NoOpenProposals = Template.bind({})
NoOpenProposals.args = {
  ...makeProps(),
  openProposals: false,
}

export const NothingUnstaking = Template.bind({})
NothingUnstaking.args = makeProps([])
