import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InputErrorMessage } from './InputErrorMessage'

export default {
  title: 'DAO DAO / packages / ui / components / inputs / InputErrorMessage',
  component: InputErrorMessage,
} as ComponentMeta<typeof InputErrorMessage>

const Template: ComponentStory<typeof InputErrorMessage> = (args) => (
  <InputErrorMessage {...args} />
)

export const Default = Template.bind({})
Default.args = {
  error: {
    type: 'validate',
    message: 'Validation error.',
  },
}
