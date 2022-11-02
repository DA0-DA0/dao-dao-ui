import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TopGradient } from './TopGradient'

export default {
  title: 'DAO DAO / packages / stateless / components / TopGradient',
  component: TopGradient,
} as ComponentMeta<typeof TopGradient>

const Template: ComponentStory<typeof TopGradient> = (args) => (
  <TopGradient {...args} />
)

export const Default = Template.bind({})
Default.args = {}
