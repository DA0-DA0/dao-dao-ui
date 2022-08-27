import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileHomeCard } from 'components/profile/ProfileHomeCard'

export default {
  title: 'DAO DAO UI V2 / components / profile / ProfileHomeCard',
  component: ProfileHomeCard,
} as ComponentMeta<typeof ProfileHomeCard>

const Template: ComponentStory<typeof ProfileHomeCard> = (args) => (
  <div className="max-w-xs">
    <ProfileHomeCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  walletName: '@Modern-Edamame',
  profileImgUrl: '/dog_nft.png',
  established: new Date(),
  tokenSymbol: 'JUNO',
  unstakedBalance: 2400.111111,
  stakedBalance: 1603,
  numDaos: 23,
  numVotes: 234,
  inboxProposalCount: 5,
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=93%3A18610',
  },
}
