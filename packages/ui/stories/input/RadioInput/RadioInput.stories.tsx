import { ComponentMeta, ComponentStory } from '@storybook/react'

import { RadioInput } from 'components/input/RadioInput'

export default {
  title: 'DAO DAO UI / input / RadioInput',
  component: RadioInput,
} as ComponentMeta<typeof RadioInput>

const Template: ComponentStory<typeof RadioInput> = (args) => (
  <RadioInput {...args} />
)

export const Default = Template.bind({})
Default.args = {
  options: null, // TODO: Fill in default value.
  fieldName: null, // TODO: Fill in default value.
  watch: null, // TODO: Fill in default value.
  setValue: null, // TODO: Fill in default value.
}
