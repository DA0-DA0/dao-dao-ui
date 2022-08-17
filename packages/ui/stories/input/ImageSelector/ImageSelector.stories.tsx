import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ImageSelector } from 'components/input/ImageSelector'

export default {
  title: 'DAO DAO UI / input / ImageSelector',
  component: ImageSelector,
} as ComponentMeta<typeof ImageSelector>

const Template: ComponentStory<typeof ImageSelector> = (args) => (
  <ImageSelector {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldName: null, // TODO: Fill in default value.
  register: null, // TODO: Fill in default value.
  watch: null, // TODO: Fill in default value.
}
