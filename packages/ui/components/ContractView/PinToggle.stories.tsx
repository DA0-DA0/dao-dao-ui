import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PinToggle } from './PinToggle'

export default {
  title: 'DAO DAO / packages / ui / components / ContractView / PinToggle',
  component: PinToggle,
} as ComponentMeta<typeof PinToggle>

const Template: ComponentStory<typeof PinToggle> = (args) => (
  <PinToggle {...args} />
)

export const On = Template.bind({})
On.args = {
  pinned: true,
}
On.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A28668',
  },
}

export const Off = Template.bind({})
Off.args = {
  pinned: false,
}

On.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A28668',
  },
}
