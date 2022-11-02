import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ErrorPage500 } from './ErrorPage500'

export default {
  title: 'DAO DAO / packages / stateless / components / ErrorPage500',
  component: ErrorPage500,
} as ComponentMeta<typeof ErrorPage500>

const Template: ComponentStory<typeof ErrorPage500> = (args) => (
  <ErrorPage500 {...args} />
)

export const Default = Template.bind({})
Default.args = {
  error: 'Error!!!!!',
}
