import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { FormSwitch } from 'components/input/Switch'
import { ReactHookFormStoryDecorator } from 'decorators'

export default {
  title: 'DAO DAO UI / input / FormSwitch',
  component: FormSwitch,
  decorators: [ReactHookFormStoryDecorator],
} as ComponentMeta<typeof FormSwitch>

const Template: ComponentStory<typeof FormSwitch> = (args) => {
  const { watch, setValue } = useFormContext()
  return <FormSwitch {...args} setValue={setValue} watch={watch} />
}

export const On = Template.bind({})
On.args = {
  fieldName: 'true' as any,
}

export const Off = Template.bind({})
Off.args = {
  fieldName: 'false' as any,
}
