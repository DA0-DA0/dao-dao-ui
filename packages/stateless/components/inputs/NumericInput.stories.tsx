import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { NumericInput } from './NumericInput'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / NumericInput',
  component: NumericInput,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof NumericInput>

const Template: ComponentStory<typeof NumericInput> = (args) => {
  const { register, setValue, getValues } = useFormContext()

  return (
    <NumericInput
      {...args}
      getValues={getValues}
      register={register}
      setValue={setValue}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  containerClassName: 'max-w-xs',
  fieldName: 'fieldName' as any,
  placeholder: 'Enter a number',
}

export const Ghost = Template.bind({})
Ghost.args = {
  ...Default.args,
  ghost: true,
}
