import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Logo } from './Logo'

export default {
  title: 'DAO DAO / packages / stateless / components / Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />

export const Default = Template.bind({})
Default.args = {}
