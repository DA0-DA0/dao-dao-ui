import { ComponentMeta, ComponentStory } from '@storybook/react'

import { TextAreaInput } from 'components/input/TextAreaInput'

export default {
  title: 'DAO DAO UI / input / TextAreaInput',
  component: TextAreaInput,
} as ComponentMeta<typeof TextAreaInput>

const Template: ComponentStory<typeof TextAreaInput> = (args) => <TextAreaInput {...args} />

export const Default = Template.bind({})
Default.args = {
  "fieldName": null, // TODO: Fill in default value.
  "register": null // TODO: Fill in default value.
}
