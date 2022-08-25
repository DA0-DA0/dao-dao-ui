import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileVotedCard } from 'components/profile/ProfileVotedCard'

export default {
  title: 'DAO DAO UI V2 / profile / ProfileVotedCard',
  component: ProfileVotedCard,
} as ComponentMeta<typeof ProfileVotedCard>

const Template: ComponentStory<typeof ProfileVotedCard> = (args) => (
  <div className="max-w-xs">
    <ProfileVotedCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  votingPower: 32.4,
  daoName: 'Dog Dao',
  walletName: '@Modern-Edamame',
  profileImgUrl: '/dog_nft.png',
  vote: 'yes',
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A31004',
  },
}
