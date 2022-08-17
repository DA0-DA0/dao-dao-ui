import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TextInput } from 'components/input/TextInput'

export default {
  title: 'DAO DAO UI / input / TextInput',
  component: TextInput,
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => (
  <TextInput {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldName: null, // TODO: Fill in default value.
  register: null, // TODO: Fill in default value.
}
