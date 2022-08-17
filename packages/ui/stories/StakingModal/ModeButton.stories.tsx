import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ModeButton } from 'components/StakingModal/ModeButton'

export default {
  title: 'DAO DAO UI / StakingModal / ModeButton',
  component: ModeButton,
} as ComponentMeta<typeof ModeButton>

const Template: ComponentStory<typeof ModeButton> = (args) => (
  <ModeButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  onClick: null, // TODO: Fill in default value.
  active: null, // TODO: Fill in default value.
  children: null, // TODO: Fill in default value.
}
