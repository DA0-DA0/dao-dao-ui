import { ComponentMeta, ComponentStory } from '@storybook/react'

import { StakingMode } from 'components/StakingModal'
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
  loading: false,
  mode: StakingMode.Stake,
}
