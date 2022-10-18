import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileCardMemberInfoTokens } from '@dao-dao/voting-module-adapter/components/ProfileCardMemberInfoTokens'
import { makeProps as makeProfileCardMemberInfoTokensProps } from '@dao-dao/voting-module-adapter/components/ProfileCardMemberInfoTokens.stories'

import { ProfileNotMemberCard } from './ProfileNotMemberCard'

export default {
  title:
    'DAO DAO / packages / ui / components / profile / ProfileNotMemberCard',
  component: ProfileNotMemberCard,
} as ComponentMeta<typeof ProfileNotMemberCard>

const Template: ComponentStory<typeof ProfileNotMemberCard> = (args) => (
  <div className="max-w-xs">
    <ProfileNotMemberCard {...args} />
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
      name: '@Modern-Edamame',
      nft: null,
    },
  },
  established: new Date(),
  membershipInfo: (
    <ProfileCardMemberInfoTokens {...makeProfileCardMemberInfoTokensProps()} />
  ),
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14852',
  },
}

export const HaveTokensToStake = Template.bind({})
HaveTokensToStake.args = {
  ...Default.args,
  membershipInfo: (
    <ProfileCardMemberInfoTokens
      {...makeProfileCardMemberInfoTokensProps([], 1600.5432)}
    />
  ),
}
HaveTokensToStake.parameters = Default.parameters
