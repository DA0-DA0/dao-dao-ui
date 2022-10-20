import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { SelectInput } from './SelectInput'

export default {
  title: 'DAO DAO / packages / ui / components / inputs / SelectInput',
  component: SelectInput,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof SelectInput>

const Template: ComponentStory<typeof SelectInput> = (args) => {
  const { register } = useFormContext()
  return <SelectInput {...args} register={register} />
}

export const Default = Template.bind({})
Default.args = {
  fieldName: 'two' as any,
  placeholder: 'Enter some text',
  children: (
    <>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </>
  ),
}
