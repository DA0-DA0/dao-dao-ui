import { ComponentMeta, ComponentStory } from '@storybook/react'

import { LinkText } from './LinkText'

export default {
  title: '(OLD DAO DAO) / components / LinkText',
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
