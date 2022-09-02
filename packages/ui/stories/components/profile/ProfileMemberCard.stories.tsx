import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileMemberCardMembershipInfo } from '@dao-dao/voting-module-adapter/adapters/cw20-staked-balance-voting/ui'

import { UnstakingTask, UnstakingTaskStatus } from 'components'
import {
  ProfileMemberCard,
  ProfileMemberCardProps,
} from 'components/profile/ProfileMemberCard'
import { makeProps as makeUnstakingLineProps } from 'stories/components/UnstakingLine/UnstakingLine.stories'

export default {
  title: 'DAO DAO V2 / components / profile / ProfileMemberCard',
  component: ProfileMemberCard,
} as ComponentMeta<typeof ProfileMemberCard>

const Template: ComponentStory<typeof ProfileMemberCard> = (args) => (
  <div className="max-w-xs">
    <ProfileMemberCard {...args} />
  </div>
)

const makeProps = (
  unstakingTasks?: UnstakingTask[]
): ProfileMemberCardProps => ({
  daoName: 'Dog Dao',
  walletName: '@Modern-Edamame',
  profileImgUrl: '/dog_nft.png',
  openProposals: true,
  established: new Date(),
  membershipInfo: (
    <ProfileMemberCardMembershipInfo
      loadingClaiming={false}
      loadingManaging={false}
      onClaim={() => alert('claim')}
      stakedTokens={50}
      tokenDecimals={6}
      tokenSymbol="DOG"
      unstakedTokens={45.413}
      unstakingDuration="28 days"
      unstakingTasks={
        unstakingTasks ?? [
          makeUnstakingLineProps(UnstakingTaskStatus.ReadyToClaim, 'DOG').task,
          makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'DOG').task,
          makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'DOG').task,
          makeUnstakingLineProps(UnstakingTaskStatus.Unstaking, 'DOG').task,
        ]
      }
      votingPower={34.2}
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
