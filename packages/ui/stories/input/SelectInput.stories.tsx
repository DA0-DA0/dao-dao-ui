import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SelectInput } from 'components/input/SelectInput'

export default {
  title: 'DAO DAO UI / input / SelectInput',
  component: SelectInput,
} as ComponentMeta<typeof SelectInput>

const Template: ComponentStory<typeof SelectInput> = (args) => <SelectInput {...args} />

export const Default = Template.bind({})
Default.args = {}
