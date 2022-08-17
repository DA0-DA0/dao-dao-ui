import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NumberInput } from 'components/input/NumberInput'

export default {
  title: 'DAO DAO UI / input / NumberInput',
  component: NumberInput,
} as ComponentMeta<typeof NumberInput>

const Template: ComponentStory<typeof NumberInput> = (args) => <NumberInput {...args} />

export const Default = Template.bind({})
Default.args = {
  "fieldName": null, // TODO: Fill in default value.
  "register": null // TODO: Fill in default value.
}
