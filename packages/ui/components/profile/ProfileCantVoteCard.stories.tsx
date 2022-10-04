import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileCardNotMemberInfo } from '@dao-dao/voting-module-adapter/adapters/cw20-staked-balance-voting/ui'
import { makeProps as makeProfileCardNotMemberInfoProps } from '@dao-dao/voting-module-adapter/adapters/cw20-staked-balance-voting/ui/ProfileCardNotMemberInfo.stories'

import { ProfileCantVoteCard } from './ProfileCantVoteCard'

export default {
  title: 'DAO DAO / packages / ui / components / profile / ProfileCantVoteCard',
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
  walletAddress: 'wallet',
  walletName: '@Modern-Edamame',
  profileImageUrl: '/noah.jpg',
  isMember: false,
  notMemberInfo: (
    <ProfileCardNotMemberInfo {...makeProfileCardNotMemberInfoProps(2.34)} />
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
  notMemberInfo: (
    <ProfileCardNotMemberInfo
      {...makeProfileCardNotMemberInfoProps(34, 791.386)}
    />
  ),
}
CurrentMember.parameters = Default.parameters
