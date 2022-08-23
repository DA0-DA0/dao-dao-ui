import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ImageSelector } from 'components/input/ImageSelector'
import { ReactHookFormDecorator } from 'decorators'

export default {
  title: 'DAO DAO UI / input / ImageSelector',
  component: ImageSelector,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ImageSelector>

const Template: ComponentStory<typeof ImageSelector> = (args) => {
  const { watch, register } = useFormContext()
  return <ImageSelector {...args} register={register} watch={watch} />
}

export const Default = Template.bind({})
Default.args = {
  fieldName: 'fieldName' as any,
}
