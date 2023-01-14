import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { Trans } from '@dao-dao/stateful'
import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { ImageSelectorModal } from './ImageSelector'

export default {
  title:
    'DAO DAO / packages / stateless / components / inputs / ImageSelectorModal',
  component: ImageSelectorModal,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ImageSelectorModal>

const Template: ComponentStory<typeof ImageSelectorModal> = (args) => {
  const { watch, register, setValue } = useFormContext()
  return (
    <ImageSelectorModal
      {...args}
      register={register}
      setValue={setValue}
      watch={watch}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  fieldName: 'moonphaseImageUrl' as any,
  Trans,
}
