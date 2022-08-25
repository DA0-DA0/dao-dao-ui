import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileCantVoteCard } from 'components/profile/ProfileCantVoteCard'

export default {
  title: 'DAO DAO UI V2 / profile / ProfileCantVoteCard',
  component: ProfileCantVoteCard,
} as ComponentMeta<typeof ProfileCantVoteCard>

const Template: ComponentStory<typeof ProfileCantVoteCard> = (args) => (
  <div className="max-w-[320px]">
    <ProfileCantVoteCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  daoName: 'Dog Dao',
  walletName: '@Modern-Edamame',
  profileImgUrl: '/dog_nft.png',
  tokenSymbol: 'DOG',
  unstakedTokenBalance: 2.34,
  stakedTokenBalance: 0,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A16344',
  },
}
