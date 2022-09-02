import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CopyToClipboardUnderline } from './CopyToClipboard'

export default {
  title: 'DAO DAO / packages / ui / components / CopyToClipboardUnderline',
  component: CopyToClipboardUnderline,
} as ComponentMeta<typeof CopyToClipboardUnderline>

const Template: ComponentStory<typeof CopyToClipboardUnderline> = (args) => (
  <CopyToClipboardUnderline {...args} />
)

export const Default = Template.bind({})
Default.args = {
  value: 'Click me to copy me.',
}
