import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { ImageSelectorModal } from './ImageSelector'

export default {
  title: 'DAO DAO / packages / ui / components / input / ImageSelectorModal',
  component: ImageSelectorModal,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ImageSelectorModal>

const Template: ComponentStory<typeof ImageSelectorModal> = (args) => {
  const { watch, register } = useFormContext()
  return <ImageSelectorModal {...args} register={register} watch={watch} />
}

export const Default = Template.bind({})
Default.args = {
  fieldName: 'moonphaseImageUrl' as any,
}
