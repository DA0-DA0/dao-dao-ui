import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { HugeDecimalInput } from './HugeDecimalInput'

export default {
  title:
    'DAO DAO / packages / stateless / components / inputs / HugeDecimalInput',
  component: HugeDecimalInput,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof HugeDecimalInput>

const Template: ComponentStory<typeof HugeDecimalInput> = (args) => {
  const { register, setValue, getValues } = useFormContext()

  return (
    <HugeDecimalInput
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
