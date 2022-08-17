import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AmountSelector } from 'components/StakingModal/AmountSelector'

export default {
  title: 'DAO DAO UI / StakingModal / AmountSelector',
  component: AmountSelector,
} as ComponentMeta<typeof AmountSelector>

const Template: ComponentStory<typeof AmountSelector> = (args) => <AmountSelector {...args} />

export const Default = Template.bind({})
Default.args = {
  "setAmount": null, // TODO: Fill in default value.
  "amount": null, // TODO: Fill in default value.
  "max": null // TODO: Fill in default value.
}
