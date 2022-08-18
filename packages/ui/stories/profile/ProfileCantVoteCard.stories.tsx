import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileCantVoteCard } from 'components/profile/ProfileCantVoteCard'

export default {
  title: 'DAO DAO UI v2 / profile / ProfileCantVoteCard',
  component: ProfileCantVoteCard,
} as ComponentMeta<typeof ProfileCantVoteCard>

const Template: ComponentStory<typeof ProfileCantVoteCard> = (args) => (
  <ProfileCantVoteCard {...args} />
)

export const Default = Template.bind({})
Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A16344',
  },
}
