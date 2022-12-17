import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProfileDisconnectedCard } from './ProfileDisconnectedCard'

export default {
  title:
    'DAO DAO / packages / stateless / components / profile / ProfileDisconnectedCard',
  component: ProfileDisconnectedCard,
} as ComponentMeta<typeof ProfileDisconnectedCard>

const Template: ComponentStory<typeof ProfileDisconnectedCard> = (args) => (
  <div className="max-w-xs">
    <ProfileDisconnectedCard {...args} />
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
