import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from 'components/input/AddressInput'

export default {
  title: 'DAO DAO UI / input / AddressInput',
  component: AddressInput,
} as ComponentMeta<typeof AddressInput>

const Template: ComponentStory<typeof AddressInput> = (args) => <AddressInput {...args} />

export const Default = Template.bind({})
Default.args = {
  "fieldName": null, // TODO: Fill in default value.
  "register": null // TODO: Fill in default value.
}
