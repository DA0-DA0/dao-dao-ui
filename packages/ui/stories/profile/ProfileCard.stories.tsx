import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileCard } from 'components/profile/ProfileCard'

export default {
  title: 'DAO DAO UI V2 / profile / ProfileCard',
  component: ProfileCard,
} as ComponentMeta<typeof ProfileCard>

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
)

export const Default = Template.bind({})
Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=93%3A18610',
  },
}
