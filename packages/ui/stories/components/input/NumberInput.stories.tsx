import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { NumberInput } from 'components/input/NumberInput'
import { ReactHookFormDecorator } from 'decorators'

export default {
  title: 'DAO DAO UI / components / input / NumberInput',
  component: NumberInput,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof NumberInput>

const Template: ComponentStory<typeof NumberInput> = (args) => {
  const { register, watch, setValue } = useFormContext()
  return (
    <NumberInput
      {...args}
      onMinus={() => {
        setValue(args.fieldName, watch(args.fieldName) - 1)
        // Report interaction to storybook.
        args.onMinus?.()
      }}
      onPlus={() => {
        setValue(args.fieldName, watch(args.fieldName) + 1)
        // Report interaction to storybook.
        args.onPlus?.()
      }}
      register={register}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  fieldName: 'fieldName' as any,
  placeholder: 'Enter a number',
}
