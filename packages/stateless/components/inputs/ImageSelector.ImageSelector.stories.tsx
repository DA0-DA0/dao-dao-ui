import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { ImageSelector } from './ImageSelector'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / ImageSelector',
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
