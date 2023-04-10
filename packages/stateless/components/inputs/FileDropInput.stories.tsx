import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Trans } from '@dao-dao/stateful'

import { FileDropInput } from './FileDropInput'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / FileDropInput',
  component: FileDropInput,
} as ComponentMeta<typeof FileDropInput>

const Template: ComponentStory<typeof FileDropInput> = (args) => (
  <FileDropInput {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onSelect: (file) => alert('onSelect: ' + file.name),
  Trans,
}
