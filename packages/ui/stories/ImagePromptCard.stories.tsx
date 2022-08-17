import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ImagePromptCard } from 'components/ImagePromptCard'

export default {
  title: 'DAO DAO UI / ImagePromptCard',
  component: ImagePromptCard,
} as ComponentMeta<typeof ImagePromptCard>

const Template: ComponentStory<typeof ImagePromptCard> = (args) => <ImagePromptCard {...args} />

export const Default = Template.bind({})
Default.args = {
  "title": null, // TODO: Fill in default value.
  "description": null, // TODO: Fill in default value.
  "backgroundUrl": null, // TODO: Fill in default value.
  "href": null // TODO: Fill in default value.
}
