import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileCardNotMemberInfo } from '@dao-dao/voting-module-adapter/adapters/CwdVotingCw20Staked/ui'
import { makeProps as makeProfileCardNotMemberInfoProps } from '@dao-dao/voting-module-adapter/adapters/CwdVotingCw20Staked/ui/ProfileCardNotMemberInfo.stories'

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
  walletAddress: 'wallet',
  established: new Date(),
  notMemberInfo: (
    <ProfileCardNotMemberInfo {...makeProfileCardNotMemberInfoProps()} />
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
  notMemberInfo: (
    <ProfileCardNotMemberInfo
      {...makeProfileCardNotMemberInfoProps(1600.5432)}
    />
  ),
}
HaveTokensToStake.parameters = Default.parameters
