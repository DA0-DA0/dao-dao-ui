import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileMemberCard } from 'components/profile/ProfileMemberCard'

export default {
  title: 'DAO DAO UI V2 / profile / ProfileMemberCard',
  component: ProfileMemberCard,
} as ComponentMeta<typeof ProfileMemberCard>

const Template: ComponentStory<typeof ProfileMemberCard> = (args) => (
  <ProfileMemberCard {...args} />
)

export const Default = Template.bind({})
Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=94%3A14709',
  },
}
