import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { AddressInput } from './AddressInput'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / AddressInput',
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
