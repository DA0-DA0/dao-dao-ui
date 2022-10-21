import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { FormSwitch } from './Switch'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / FormSwitch',
  component: FormSwitch,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof FormSwitch>

const Template: ComponentStory<typeof FormSwitch> = (args) => {
  const { watch, setValue } = useFormContext()
  return (
    <FormSwitch {...args} setValue={setValue} value={watch(args.fieldName)} />
  )
}

export const On = Template.bind({})
On.args = {
  fieldName: 'true' as any,
}

export const Off = Template.bind({})
Off.args = {
  fieldName: 'false' as any,
}
