import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileVoteCard } from './ProfileVoteCard'

export default {
  title: 'DAO DAO / packages / ui / components / profile / ProfileVoteCard',
  component: ProfileVoteCard,
} as ComponentMeta<typeof ProfileVoteCard>

const Template: ComponentStory<typeof ProfileVoteCard> = (args) => (
  <div className="max-w-xs">
    <ProfileVoteCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  votingPower: 32.4,
  daoName: 'Dog Dao',
  walletName: '@Modern-Edamame',
  profileImgUrl: '/dog_nft.png',
  loading: false,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A16292',
  },
}
