import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useFormContext } from 'react-hook-form'

import { ReactHookFormDecorator } from '@dao-dao/storybook/decorators'

import { CodeMirrorInput } from './CodeMirrorInput'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / CodeMirrorInput',
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
