import { ComponentMeta, ComponentStory } from '@storybook/react'

import { LinkText } from 'components/LinkText'

export default {
  title: 'DAO DAO UI / components / LinkText',
  component: LinkText,
} as ComponentMeta<typeof LinkText>

const Template: ComponentStory<typeof LinkText> = (args) => (
  <LinkText {...args} />
)

export const Default = Template.bind({})
Default.args = {
  href: '#',
  children: 'Click me',
}
