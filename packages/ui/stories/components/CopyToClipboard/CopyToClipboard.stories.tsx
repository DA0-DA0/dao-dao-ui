import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CopyToClipboard } from 'components/CopyToClipboard'

export default {
  title: 'DAO DAO UI / components / CopyToClipboard',
  component: CopyToClipboard,
} as ComponentMeta<typeof CopyToClipboard>

const Template: ComponentStory<typeof CopyToClipboard> = (args) => (
  <CopyToClipboard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  value: 'Click me to copy me.',
}
