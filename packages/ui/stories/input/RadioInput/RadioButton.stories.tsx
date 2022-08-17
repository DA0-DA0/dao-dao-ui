import { ComponentMeta, ComponentStory } from '@storybook/react'

import { RadioButton } from 'components/input/RadioInput'

export default {
  title: 'DAO DAO UI / input / RadioButton',
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>

const Template: ComponentStory<typeof RadioButton> = (args) => (
  <RadioButton {...args} />
)

export const On = Template.bind({})
On.args = {
  selected: true,
  label: 'An option',
}

export const Off = Template.bind({})
Off.args = {
  selected: false,
  label: 'An option',
}
