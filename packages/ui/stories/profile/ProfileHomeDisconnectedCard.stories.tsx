import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileHomeDisconnectedCard } from 'components/profile/ProfileHomeDisconnectedCard'

export default {
  title: 'DAO DAO UI V2 / components / profile / ProfileHomeDisconnectedCard',
  component: ProfileHomeDisconnectedCard,
} as ComponentMeta<typeof ProfileHomeDisconnectedCard>

const Template: ComponentStory<typeof ProfileHomeDisconnectedCard> = (args) => (
  <div className="max-w-xs">
    <ProfileHomeDisconnectedCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=272%3A64810',
  },
}
