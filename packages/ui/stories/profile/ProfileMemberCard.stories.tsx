import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileMemberCard } from 'components/profile/ProfileMemberCard'

export default {
  title: 'DAO DAO UI V2 / profile / ProfileMemberCard',
  component: ProfileMemberCard,
} as ComponentMeta<typeof ProfileMemberCard>

const Template: ComponentStory<typeof ProfileMemberCard> = (args) => (
  <div className="max-w-[320px]">
    <ProfileMemberCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  votingPower: 34.2,
  daoName: 'Dog Dao',
  walletName: '@Modern-Edamame',
  profileImgUrl: '/dog_nft.png',
  tokenSymbol: 'DOG',
  stakedTokens: 50,
  tokenDecimals: 1,
  unstakingTokensTranches: [
    {
      tokenSymbol: '$DOG',
      unstakingTokens: 50,
      available: new Date(),
    },
  ],
  unstakedTokens: 45,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14709',
  },
}
