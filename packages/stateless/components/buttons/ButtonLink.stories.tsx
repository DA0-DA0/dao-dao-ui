import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ButtonLink } from './ButtonLink'

export default {
  title: 'DAO DAO / packages / stateless / components / buttons / ButtonLink',
  component: ButtonLink,
} as ComponentMeta<typeof ButtonLink>

const Template: ComponentStory<typeof ButtonLink> = (args) => (
  <ButtonLink {...args} />
)

export const Default = Template.bind({})
Default.args = {
  variant: 'primary',
  children: 'Go home',
  href: '/home',
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/Suewv4vPJeJSzAa5aI1sOv/Light-Jun%C3%B8?node-id=18%3A260',
  },
}
