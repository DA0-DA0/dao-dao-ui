import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileVoteCard } from 'components/profile/ProfileVoteCard'

export default {
  title: 'DAO DAO UI V2 / profile / ProfileVoteCard',
  component: ProfileVoteCard,
} as ComponentMeta<typeof ProfileVoteCard>

const Template: ComponentStory<typeof ProfileVoteCard> = (args) => (
  <ProfileVoteCard {...args} />
)

export const Default = Template.bind({})
Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A16292',
  },
}
