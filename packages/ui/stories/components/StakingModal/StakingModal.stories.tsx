import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { StakingModal, StakingMode } from 'components/StakingModal/StakingModal'

export default {
  title: 'DAO DAO UI / components / StakingModal / StakingModal',
  component: StakingModal,
} as ComponentMeta<typeof StakingModal>

const Template: ComponentStory<typeof StakingModal> = (args) => {
  const [amount, setAmount] = useState(50)

  return <StakingModal {...args} amount={amount} setAmount={setAmount} />
}

export const Default = Template.bind({})
Default.args = {
  claimableTokens: 20,
  loading: false,
  mode: StakingMode.Stake,
  proposalDeposit: 5,
  stakableTokens: 23456,
  tokenDecimals: 6,
  tokenSymbol: 'TOKEN',
  unstakableTokens: 65432,
  unstakingDuration: null,
}
