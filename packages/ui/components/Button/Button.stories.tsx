import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from './Button'

export default {
  title: 'DAO DAO UI / Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const Default = Template.bind({})
Default.args = {
  variant: 'primary',
  children: 'Connect wallet',
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/Suewv4vPJeJSzAa5aI1sOv/Light-Jun%C3%B8?node-id=18%3A260',
  },
}
