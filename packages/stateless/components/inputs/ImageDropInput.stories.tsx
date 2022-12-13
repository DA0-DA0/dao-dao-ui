import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ImageDropInput } from './ImageDropInput'

export default {
  title:
    'DAO DAO / packages / stateless / components / inputs / ImageDropInput',
  component: ImageDropInput,
} as ComponentMeta<typeof ImageDropInput>

const Template: ComponentStory<typeof ImageDropInput> = (args) => (
  <ImageDropInput {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onSelect: (file) => alert('onSelect: ' + file.name),
}
