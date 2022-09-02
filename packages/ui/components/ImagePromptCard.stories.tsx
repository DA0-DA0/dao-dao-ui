import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ImagePromptCard } from './ImagePromptCard'

export default {
  title: '(OLD DAO DAO) / components / ImagePromptCard',
  component: ImagePromptCard,
} as ComponentMeta<typeof ImagePromptCard>

const Template: ComponentStory<typeof ImagePromptCard> = (args) => (
  <ImagePromptCard {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'Do a thing',
  description: 'This lets you do a thing.',
  backgroundUrl: '/empty-state-proposal.jpeg',
  href: '#',
}

// TODO: Fix outline.
