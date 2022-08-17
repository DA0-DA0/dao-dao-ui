import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { CodeMirrorInput } from 'components/input/CodeMirrorInput'
import { ReactHookFormDecorator } from 'decorators'

export default {
  title: 'DAO DAO UI / input / CodeMirrorInput',
  component: CodeMirrorInput,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof CodeMirrorInput>

const Template: ComponentStory<typeof CodeMirrorInput> = (args) => {
  const { control } = useFormContext()
  return <CodeMirrorInput {...args} control={control} />
}

export const Default = Template.bind({})
Default.args = {
  fieldName: 'fieldName' as any,
}
