import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoMemberCardProps } from '@dao-dao/types/stateless/DaoMemberCard'

import { DaoMemberCard } from './DaoMemberCard'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / DaoMemberCard',
  component: DaoMemberCard,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof DaoMemberCard>

const Template: ComponentStory<typeof DaoMemberCard> = (args) => (
  <div className="max-w-xs">
    <DaoMemberCard {...args} />
  </div>
)

export const makeProps = (): DaoMemberCardProps => ({
  address: 'juno1abczhsdyechxcjz90y',
  // Random number between 0 and 31 with 2 decimals.
  votingPowerPercent: Math.floor(Math.random() * (30 * 1e2) + 1e2) / 1e2,
  profile: {
    loading: false,
    data: {
      name: 'Modern-Edamame',
      imageUrl: '/noah.jpg',
      nft: null,
      nonce: 0,
    },
  },
})

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=984%3A45779',
  },
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  profile: { loading: true },
}
