import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { NumberInput } from './NumberInput'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / NumberInput',
  component: NumberInput,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof NumberInput>

const Template: ComponentStory<typeof NumberInput> = (args) => {
  const { register, watch, setValue } = useFormContext()

  return (
    <NumberInput
      {...args}
      register={register}
      setValue={setValue}
      watch={watch}
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
