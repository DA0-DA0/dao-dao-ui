import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileCardMemberInfoTokens } from '@dao-dao/voting-module-adapter/components/ProfileCardMemberInfoTokens'
import {
  makeProps as makeProfileCardMemberInfoTokenProps,
  makeCantVoteOnProposalProps as makeProfileCardMemberInfoTokensCantVoteOnProposalProps,
} from '@dao-dao/voting-module-adapter/components/ProfileCardMemberInfoTokens.stories'

import { ProfileCantVoteCard } from './ProfileCantVoteCard'

export default {
  title:
    'DAO DAO / packages / stateless / components / profile / ProfileCantVoteCard',
  component: ProfileCantVoteCard,
} as ComponentMeta<typeof ProfileCantVoteCard>

const Template: ComponentStory<typeof ProfileCantVoteCard> = (args) => (
  <div className="max-w-xs">
    <ProfileCantVoteCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  daoName: 'Dog Dao',
  walletProfile: {
    loading: false,
    data: {
      nonce: 0,
      imageUrl: '/noah.jpg',
      name: 'wallet_name',
      nft: null,
    },
  },
  isMember: false,
  membershipInfo: (
    <ProfileCardMemberInfoTokens
      {...makeProfileCardMemberInfoTokenProps([], 0)}
    />
  ),
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A16344',
  },
}

export const CurrentMember = Template.bind({})
CurrentMember.args = {
  ...Default.args,
  isMember: true,
  membershipInfo: (
    <ProfileCardMemberInfoTokens
      {...makeProfileCardMemberInfoTokensCantVoteOnProposalProps()}
    />
  ),
}
