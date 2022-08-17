import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PercentSelector } from 'components/StakingModal/PercentSelector'

export default {
  title: 'DAO DAO UI / StakingModal / PercentSelector',
  component: PercentSelector,
} as ComponentMeta<typeof PercentSelector>

const Template: ComponentStory<typeof PercentSelector> = (args) => (
  <PercentSelector {...args} />
)

export const Default = Template.bind({})
Default.args = {
  max: null, // TODO: Fill in default value.
  amount: null, // TODO: Fill in default value.
  tokenDecimals: null, // TODO: Fill in default value.
  setAmount: null, // TODO: Fill in default value.
}
