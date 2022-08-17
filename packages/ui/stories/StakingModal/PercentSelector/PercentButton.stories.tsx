import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PercentButton } from 'components/StakingModal/PercentSelector'

export default {
  title: 'DAO DAO UI / StakingModal / PercentButton',
  component: PercentButton,
} as ComponentMeta<typeof PercentButton>

const Template: ComponentStory<typeof PercentButton> = (args) => <PercentButton {...args} />

export const Default = Template.bind({})
Default.args = {
  "label": null, // TODO: Fill in default value.
  "max": null, // TODO: Fill in default value.
  "percent": null, // TODO: Fill in default value.
  "amount": null, // TODO: Fill in default value.
  "setAmount": null, // TODO: Fill in default value.
  "tokenDecimals": null // TODO: Fill in default value.
}
