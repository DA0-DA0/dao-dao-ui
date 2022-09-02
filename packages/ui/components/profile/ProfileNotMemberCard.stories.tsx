import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileCardNoVoteBecomeMemberInfo } from '@dao-dao/voting-module-adapter/adapters/cw20-staked-balance-voting/ui'
import { makeProps as makeProfileCardNoVoteBecomeMemberInfoProps } from '@dao-dao/voting-module-adapter/adapters/cw20-staked-balance-voting/ui/ProfileCardNoVoteBecomeMemberInfo.stories'

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
  walletName: '@Modern-Edamame',
  profileImgUrl: '/dog_nft.png',
  established: new Date(),
  becomeMemberInfo: (
    <ProfileCardNoVoteBecomeMemberInfo
      {...makeProfileCardNoVoteBecomeMemberInfoProps()}
    />
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
  becomeMemberInfo: (
    <ProfileCardNoVoteBecomeMemberInfo
      {...makeProfileCardNoVoteBecomeMemberInfoProps(1600.5432)}
    />
  ),
}
HaveTokensToStake.parameters = Default.parameters
