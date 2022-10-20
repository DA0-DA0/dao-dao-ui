import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FollowingToggle } from './FollowingToggle'

export default {
  title: 'DAO DAO / packages / ui / components / buttons / FollowingToggle',
  component: FollowingToggle,
} as ComponentMeta<typeof FollowingToggle>

const Template: ComponentStory<typeof FollowingToggle> = (args) => (
  <FollowingToggle {...args} />
)

export const On = Template.bind({})
On.args = {
  following: true,
}
On.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A28668',
  },
}

export const Off = Template.bind({})
Off.args = {
  following: false,
}

On.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A28668',
  },
}
