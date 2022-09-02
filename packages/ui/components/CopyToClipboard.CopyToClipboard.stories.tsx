import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CopyToClipboard } from './CopyToClipboard'

export default {
  title: 'DAO DAO / packages / ui / components / CopyToClipboard',
  component: CopyToClipboard,
} as ComponentMeta<typeof CopyToClipboard>

const Template: ComponentStory<typeof CopyToClipboard> = (args) => (
  <CopyToClipboard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  value: 'Click me to copy me.',
}
