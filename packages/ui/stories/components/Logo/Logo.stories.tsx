import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Logo } from 'components/Logo'

export default {
  title: 'DAO DAO UI / components / Logo',
  component: Logo,
} as ComponentMeta<typeof Logo>

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />

export const Default = Template.bind({})
Default.args = {}
