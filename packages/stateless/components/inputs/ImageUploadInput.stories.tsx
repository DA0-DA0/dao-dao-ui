import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ImageUploadInput } from './ImageUploadInput'

export default {
  title:
    'DAO DAO / packages / stateless / components / inputs / ImageUploadInput',
  component: ImageUploadInput,
} as ComponentMeta<typeof ImageUploadInput>

const Template: ComponentStory<typeof ImageUploadInput> = (args) => (
  <ImageUploadInput {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onChange: (url) => alert('onChange: ' + url),
}
