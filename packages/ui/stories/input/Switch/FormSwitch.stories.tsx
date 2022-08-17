import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FormSwitch } from 'components/input/Switch'

export default {
  title: 'DAO DAO UI / input / FormSwitch',
  component: FormSwitch,
} as ComponentMeta<typeof FormSwitch>

const Template: ComponentStory<typeof FormSwitch> = (args) => (
  <FormSwitch {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldName: null, // TODO: Fill in default value.
  watch: null, // TODO: Fill in default value.
  setValue: null, // TODO: Fill in default value.
}
