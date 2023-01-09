import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ProfileDisplay } from '@dao-dao/stateful'
import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { AddressInput } from './AddressInput'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / AddressInput',
  component: AddressInput,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof AddressInput>

const Template: ComponentStory<typeof AddressInput> = (args) => {
  const { register } = useFormContext()
  args.register = register
  return <AddressInput {...args} />
}

export const Default = Template.bind({})
Default.args = {
  fieldName: 'fieldName' as any,
  placeholder: 'juno...',
  ProfileDisplay,
}
