import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoNotFound } from 'components/not_found/DaoNotFound'

export default {
  title: 'DAO DAO UI / not_found / DaoNotFound',
  component: DaoNotFound,
} as ComponentMeta<typeof DaoNotFound>

const Template: ComponentStory<typeof DaoNotFound> = (args) => (
  <DaoNotFound {...args} />
)

export const Default = Template.bind({})
Default.args = {}

// TODO: Fix story.
