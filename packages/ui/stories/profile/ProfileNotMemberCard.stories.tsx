import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileNotMemberCard } from 'components/profile/ProfileNotMemberCard'

export default {
  title: 'DAO DAO UI v2 / profile / ProfileNotMemberCard',
  component: ProfileNotMemberCard,
} as ComponentMeta<typeof ProfileNotMemberCard>

const Template: ComponentStory<typeof ProfileNotMemberCard> = (args) => (
  <ProfileNotMemberCard {...args} />
)

export const Default = Template.bind({})
Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14852',
  },
}
