import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { FormSwitchCard } from 'components/input/Switch'
import { ReactHookFormStoryDecorator } from 'decorators'

export default {
  title: 'DAO DAO UI / input / FormSwitchCard',
  component: FormSwitchCard,
  decorators: [ReactHookFormStoryDecorator],
} as ComponentMeta<typeof FormSwitchCard>

const Template: ComponentStory<typeof FormSwitchCard> = (args) => {
  const { watch, setValue } = useFormContext()
  return <FormSwitchCard {...args} setValue={setValue} watch={watch} />
}

export const On = Template.bind({})
On.args = {
  fieldName: 'true' as any,
  onLabel: undefined,
  offLabel: undefined,
}

export const Off = Template.bind({})
Off.args = {
  fieldName: 'false' as any,
  onLabel: undefined,
  offLabel: undefined,
}
