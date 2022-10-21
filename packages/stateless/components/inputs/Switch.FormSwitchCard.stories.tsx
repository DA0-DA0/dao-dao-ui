import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { FormSwitchCard } from './Switch'

export default {
  title:
    'DAO DAO / packages / stateless / components / inputs / FormSwitchCard',
  component: FormSwitchCard,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof FormSwitchCard>

const Template: ComponentStory<typeof FormSwitchCard> = (args) => {
  const { watch, setValue } = useFormContext()
  return (
    <FormSwitchCard
      {...args}
      setValue={setValue}
      value={watch(args.fieldName)}
    />
  )
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
