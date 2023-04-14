import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PostMarkdown } from './PostMarkdown'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / Press / components / PostMarkdown',
  component: PostMarkdown,
} as ComponentMeta<typeof PostMarkdown>

const Template: ComponentStory<typeof PostMarkdown> = (args) => (
  <PostMarkdown {...args} />
)

const now = new Date()

export const Default = Template.bind({})
Default.args = {
  post: {
    id: '1',
    title: 'This is a post',
    content: '## Hello!\n\nI am a post.',
    image: 'ipfs://',
    created: now,
    pastVersions: [],
    initiallyCreated: now,
  },
}
