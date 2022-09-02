import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ThemeToggle } from './ThemeToggle'

export default {
  title: 'DAO DAO / packages / ui / components / ThemeToggle',
  component: ThemeToggle,
} as ComponentMeta<typeof ThemeToggle>

const Template: ComponentStory<typeof ThemeToggle> = (_args) => <ThemeToggle />

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=376%3A57214',
  },
}
