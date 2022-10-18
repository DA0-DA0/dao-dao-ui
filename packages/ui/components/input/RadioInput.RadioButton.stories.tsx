import { ComponentMeta, ComponentStory } from '@storybook/react'

import { RadioButton } from './RadioInput'

export default {
  title: 'DAO DAO / packages / ui / components / input / RadioButton',
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
