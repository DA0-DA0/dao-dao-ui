import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { PercentSelector } from 'components/StakingModal/PercentSelector'

export default {
  title: 'DAO DAO UI / components / StakingModal / PercentSelector',
  component: PercentSelector,
} as ComponentMeta<typeof PercentSelector>

const Template: ComponentStory<typeof PercentSelector> = (args) => {
  const [amount, setAmount] = useState(50)

  return <PercentSelector {...args} amount={amount} setAmount={setAmount} />
}

export const Default = Template.bind({})
Default.args = {
  max: 1234,
  tokenDecimals: 6,
}
