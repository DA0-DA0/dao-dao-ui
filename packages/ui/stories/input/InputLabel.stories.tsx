import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InputLabel } from 'components/input/InputLabel'

export default {
  title: 'DAO DAO UI / input / InputLabel',
  component: InputLabel,
} as ComponentMeta<typeof InputLabel>

const Template: ComponentStory<typeof InputLabel> = (args) => (
  <InputLabel {...args} />
)

export const Default = Template.bind({})
Default.args = {
  name: null, // TODO: Fill in default value.
}
