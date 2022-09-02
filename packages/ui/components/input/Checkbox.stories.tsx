import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { Checkbox } from './Checkbox'

export default {
  title: 'DAO DAO / packages / ui / components / input / Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>

const Template: ComponentStory<typeof Checkbox> = ({
  checked: initialChecked,
}) => {
  const [checked, setChecked] = useState(initialChecked)

  return <Checkbox checked={checked} onClick={() => setChecked((c) => !c)} />
}

export const Unchecked = Template.bind({})
Unchecked.args = {
  checked: false,
}
Unchecked.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/XNQp9ODFr22gkxg1HR92wS/%E2%99%A3%EF%B8%8E--Components?node-id=499%3A7076',
  },
}

export const Checked = Template.bind({})
Checked.args = {
  checked: true,
}
Checked.parameters = Unchecked.parameters
