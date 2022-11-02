import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { RadioInput } from './RadioInput'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / RadioInput',
  component: RadioInput,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof RadioInput>

const Template: ComponentStory<typeof RadioInput> = (args) => {
  const { watch, setValue } = useFormContext()
  return <RadioInput {...args} setValue={setValue} watch={watch} />
}

export const Default = Template.bind({})
Default.args = {
  fieldName: 'two' as any,
  options: [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ],
}
