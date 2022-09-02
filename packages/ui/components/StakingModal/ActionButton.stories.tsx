import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ActionButton } from './ActionButton'
import { StakingMode } from './StakingModal'

export default {
  title: '(OLD DAO DAO) / components / StakingModal / ActionButton',
  component: ActionButton,
} as ComponentMeta<typeof ActionButton>

const Template: ComponentStory<typeof ActionButton> = (args) => (
  <ActionButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  loading: false,
  mode: StakingMode.Stake,
}
