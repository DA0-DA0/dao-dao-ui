import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoMemberCard, DaoMemberCardProps } from 'components/dao/DaoMemberCard'

export default {
  title: 'DAO DAO UI V2 / components / dao / DaoMemberCard',
  component: DaoMemberCard,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof DaoMemberCard>

const Template: ComponentStory<typeof DaoMemberCard> = (args) => (
  <div className="max-w-xs">
    <DaoMemberCard {...args} />
  </div>
)

export const makeProps = (): DaoMemberCardProps => ({
  imageUrl: '/edamame.png',
  name: 'Modern-Edamame',
  address: 'juno1abczhsdyechxcjz90y',
  // Random number between 0 and 31 with 2 decimals.
  votingPowerPercent: Math.floor(Math.random() * (30 * 1e2) + 1e2) / 1e2,
})

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=984%3A45779',
  },
}
