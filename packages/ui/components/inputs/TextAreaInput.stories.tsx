import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { TextAreaInput } from './TextAreaInput'

export default {
  title: 'DAO DAO / packages / ui / components / inputs / TextAreaInput',
  component: TextAreaInput,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof TextAreaInput>

const Template: ComponentStory<typeof TextAreaInput> = (args) => {
  const { register } = useFormContext()
  return <TextAreaInput {...args} register={register} />
}

export const Default = Template.bind({})
Default.args = {
  fieldName: 'fieldName' as any,
  placeholder: 'Enter some text',
}
