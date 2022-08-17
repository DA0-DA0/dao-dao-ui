import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InputErrorMessage } from 'components/input/InputErrorMessage'

export default {
  title: 'DAO DAO UI / input / InputErrorMessage',
  component: InputErrorMessage,
} as ComponentMeta<typeof InputErrorMessage>

const Template: ComponentStory<typeof InputErrorMessage> = (args) => <InputErrorMessage {...args} />

export const Default = Template.bind({})
Default.args = {
  "error": null // TODO: Fill in default value.
}
