import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ImageSelectorModal } from 'components/input/ImageSelector'

export default {
  title: 'DAO DAO UI / input / ImageSelectorModal',
  component: ImageSelectorModal,
} as ComponentMeta<typeof ImageSelectorModal>

const Template: ComponentStory<typeof ImageSelectorModal> = (args) => <ImageSelectorModal {...args} />

export const Default = Template.bind({})
Default.args = {
  "fieldName": null, // TODO: Fill in default value.
  "register": null, // TODO: Fill in default value.
  "watch": null, // TODO: Fill in default value.
  "onClose": null // TODO: Fill in default value.
}
