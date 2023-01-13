import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MarkdownRenderer } from './MarkdownRenderer'

export default {
  title: 'DAO DAO / packages / stateless / components / MarkdownRenderer',
  component: MarkdownRenderer,
} as ComponentMeta<typeof MarkdownRenderer>

const Template: ComponentStory<typeof MarkdownRenderer> = (args) => (
  <MarkdownRenderer {...args} />
)

const markdown = `# This is a title
## A subtitle

Some normal text.

![moonphase](https://moonphase.is/image.svg)`

export const Default = Template.bind({})
Default.args = {
  markdown,
}
