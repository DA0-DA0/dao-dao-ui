import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WrapprMarkdown } from './WrapprMarkdown'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / Wrappr / components / WrapprMarkdown',
  component: WrapprMarkdown,
} as ComponentMeta<typeof WrapprMarkdown>

const Template: ComponentStory<typeof WrapprMarkdown> = (args) => (
  <WrapprMarkdown {...args} />
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
