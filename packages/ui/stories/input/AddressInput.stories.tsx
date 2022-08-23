import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from 'components/input/AddressInput'
import { ReactHookFormDecorator } from 'decorators'

export default {
  title: 'DAO DAO UI / input / AddressInput',
  component: AddressInput,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof AddressInput>

const Template: ComponentStory<typeof AddressInput> = (args) => (
  <AddressInput {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldName: 'fieldName' as any,
  placeholder: 'juno...',
}
