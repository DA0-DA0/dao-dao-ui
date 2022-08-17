import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MarkdownPreview } from 'components/MarkdownPreview'

export default {
  title: 'DAO DAO UI / MarkdownPreview',
  component: MarkdownPreview,
} as ComponentMeta<typeof MarkdownPreview>

const Template: ComponentStory<typeof MarkdownPreview> = (args) => (
  <MarkdownPreview {...args} />
)

const markdown = `# This is a title
## A subtitle

Some normal text.

![moonphase](https://moonphase.is/image.svg)`

export const Default = Template.bind({})
Default.args = {
  markdown,
}
