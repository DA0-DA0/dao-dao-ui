import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CopyToClipboardMobile } from './CopyToClipboard'

export default {
  title: 'DAO DAO / packages / ui / components / CopyToClipboardMobile',
  component: CopyToClipboardMobile,
} as ComponentMeta<typeof CopyToClipboardMobile>

const Template: ComponentStory<typeof CopyToClipboardMobile> = (args) => (
  <CopyToClipboardMobile {...args} />
)

export const Default = Template.bind({})
Default.args = {
  value: 'Click me to copy me.',
}
