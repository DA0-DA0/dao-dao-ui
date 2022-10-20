import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { TextInput } from './TextInput'

export default {
  title: 'DAO DAO / packages / ui / components / inputs / TextInput',
  component: TextInput,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof TextInput>

const Template: ComponentStory<typeof TextInput> = (args) => {
  const { register } = useFormContext()
  return <TextInput {...args} register={register} />
}

export const Default = Template.bind({})
Default.args = {
  fieldName: 'fieldName' as any,
  placeholder: 'Enter some text',
}
