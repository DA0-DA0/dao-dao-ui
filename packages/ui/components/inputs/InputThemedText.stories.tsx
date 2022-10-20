import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InputThemedText } from './InputThemedText'

export default {
  title: 'DAO DAO / packages / ui / components / inputs / InputThemedText',
  component: InputThemedText,
} as ComponentMeta<typeof InputThemedText>

const Template: ComponentStory<typeof InputThemedText> = (args) => (
  <InputThemedText {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'This is some text',
}
