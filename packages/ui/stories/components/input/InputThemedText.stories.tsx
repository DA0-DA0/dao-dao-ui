import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InputThemedText } from 'components/input/InputThemedText'

export default {
  title: 'DAO DAO UI / components / input / InputThemedText',
  component: InputThemedText,
} as ComponentMeta<typeof InputThemedText>

const Template: ComponentStory<typeof InputThemedText> = (args) => (
  <InputThemedText {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: 'This is some text',
}
