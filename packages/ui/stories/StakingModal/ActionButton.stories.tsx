import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ActionButton } from 'components/StakingModal/ActionButton'

export default {
  title: 'DAO DAO UI / StakingModal / ActionButton',
  component: ActionButton,
} as ComponentMeta<typeof ActionButton>

const Template: ComponentStory<typeof ActionButton> = (args) => (
  <ActionButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  error: null, // TODO: Fill in default value.
  loading: null, // TODO: Fill in default value.
  mode: null, // TODO: Fill in default value.
  onClick: null, // TODO: Fill in default value.
}
