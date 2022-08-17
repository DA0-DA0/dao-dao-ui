import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { TextInput } from 'components/input/TextInput'
import { ReactHookFormStoryDecorator } from 'decorators'

export default {
  title: 'DAO DAO UI / input / TextInput',
  component: TextInput,
  decorators: [ReactHookFormStoryDecorator],
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
