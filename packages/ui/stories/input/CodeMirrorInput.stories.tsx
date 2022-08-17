import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CodeMirrorInput } from 'components/input/CodeMirrorInput'

export default {
  title: 'DAO DAO UI / input / CodeMirrorInput',
  component: CodeMirrorInput,
} as ComponentMeta<typeof CodeMirrorInput>

const Template: ComponentStory<typeof CodeMirrorInput> = (args) => (
  <CodeMirrorInput {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldName: null, // TODO: Fill in default value.
}
