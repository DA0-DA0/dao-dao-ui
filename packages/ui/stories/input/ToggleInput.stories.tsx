import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ToggleInput } from 'components/input/ToggleInput'

export default {
  title: 'DAO DAO UI / input / ToggleInput',
  component: ToggleInput,
} as ComponentMeta<typeof ToggleInput>

const Template: ComponentStory<typeof ToggleInput> = (args) => (
  <ToggleInput {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldName: null, // TODO: Fill in default value.
  register: null, // TODO: Fill in default value.
}
