import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ActionSelector } from 'components/ActionSelector'

export default {
  title: 'DAO DAO UI / ActionSelector',
  component: ActionSelector,
} as ComponentMeta<typeof ActionSelector>

const Template: ComponentStory<typeof ActionSelector> = (args) => (
  <ActionSelector {...args} />
)

export const Default = Template.bind({})
Default.args = {
  actions: null, // TODO: Fill in default value.
  onClose: null, // TODO: Fill in default value.
  onSelectAction: null, // TODO: Fill in default value.
}
