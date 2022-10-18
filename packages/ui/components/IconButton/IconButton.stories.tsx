import { PlusIcon } from '@heroicons/react/outline'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { IconButton } from './IconButton'

export default {
  title: 'DAO DAO / packages / ui / components / IconButton / IconButton',
  component: IconButton,
} as ComponentMeta<typeof IconButton>

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  Icon: PlusIcon,
}
Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/XNQp9ODFr22gkxg1HR92wS/%E2%99%A3%EF%B8%8E--Components?node-id=958%3A6871',
  },
}

export const Secondary = Template.bind({})
Secondary.args = {
  variant: 'secondary',
  Icon: PlusIcon,
}
Secondary.parameters = Primary.parameters

export const Ghost = Template.bind({})
Ghost.args = {
  variant: 'ghost',
  Icon: PlusIcon,
}
Ghost.parameters = Primary.parameters
