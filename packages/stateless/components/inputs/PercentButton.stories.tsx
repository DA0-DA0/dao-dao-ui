import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { HugeDecimal } from '@dao-dao/math'

import { PercentButton } from './PercentButton'

export default {
  title: 'DAO DAO / packages / stateless / components / inputs / PercentButton',
  component: PercentButton,
} as ComponentMeta<typeof PercentButton>

const Template: ComponentStory<typeof PercentButton> = (args) => {
  const [amount, setAmount] = useState(HugeDecimal.fromHumanReadable(50, 6))

  return <PercentButton {...args} amount={amount} setAmount={setAmount} />
}

export const Default = Template.bind({})
Default.args = {
  label: '25%',
  loadingMax: { loading: false, data: HugeDecimal.fromHumanReadable(1234, 6) },
  percent: 25,
}
