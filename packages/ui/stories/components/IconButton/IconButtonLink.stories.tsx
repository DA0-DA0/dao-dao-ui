import { PlusIcon } from '@heroicons/react/outline'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { IconButtonLink } from 'components/IconButton/IconButtonLink'

export default {
  title: 'DAO DAO UI V2 / components / IconButton / IconButtonLink',
  component: IconButtonLink,
} as ComponentMeta<typeof IconButtonLink>

const Template: ComponentStory<typeof IconButtonLink> = (args) => (
  <IconButtonLink {...args} />
)

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  Icon: PlusIcon,
  href: '#',
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
  href: '#',
}
Secondary.parameters = Primary.parameters

export const Ghost = Template.bind({})
Ghost.args = {
  variant: 'ghost',
  Icon: PlusIcon,
  href: '#',
}
Ghost.parameters = Primary.parameters
