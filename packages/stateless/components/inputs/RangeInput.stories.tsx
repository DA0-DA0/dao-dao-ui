import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'

import { RangeInput } from './RangeInput'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / RangeInput',
  component: RangeInput,
  decorators: [
    makeReactHookFormDecorator({
      value: 50,
    }),
  ],
} as ComponentMeta<typeof RangeInput>

const Template: ComponentStory<typeof RangeInput> = (args) => (
  <RangeInput
    {...args}
    setValue={useFormContext().setValue}
    watch={useFormContext().watch}
  />
)

export const Default = Template.bind({})
Default.args = {
  className: 'max-w-xs',
  fieldName: 'value' as any,
  min: 0,
  max: 100,
}
