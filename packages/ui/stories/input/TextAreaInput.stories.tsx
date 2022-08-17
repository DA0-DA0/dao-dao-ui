import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { TextAreaInput } from 'components/input/TextAreaInput'
import { ReactHookFormStoryDecorator } from 'decorators'

export default {
  title: 'DAO DAO UI / input / TextAreaInput',
  component: TextAreaInput,
  decorators: [ReactHookFormStoryDecorator],
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
