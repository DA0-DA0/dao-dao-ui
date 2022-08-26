import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from 'components/Button/Button'

export default {
  title: 'DAO DAO UI / Button / Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  variant: 'primary',
  children: 'Connect wallet',
  disabled: false,
}
Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/XNQp9ODFr22gkxg1HR92wS/%E2%99%A3%EF%B8%8E--Components?node-id=499%3A4831',
  },
}

export const Secondary = Template.bind({})
Secondary.args = {
  ...Primary.args,
  variant: 'secondary',
}
Secondary.parameters = Primary.parameters

export const Ghost = Template.bind({})
Ghost.args = {
  ...Primary.args,
  variant: 'ghost',
}
Ghost.parameters = Primary.parameters
