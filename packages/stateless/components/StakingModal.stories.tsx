import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { StakingModal, StakingMode } from './StakingModal'

export default {
  title: 'DAO DAO / packages / stateless / components / StakingModal',
  component: StakingModal,
} as ComponentMeta<typeof StakingModal>

const Template: ComponentStory<typeof StakingModal> = (args) => {
  const [amount, setAmount] = useState(50)

  return <StakingModal {...args} amount={amount} setAmount={setAmount} />
}

export const StakeUnstake = Template.bind({})
StakeUnstake.args = {
  claimableTokens: 20,
  loading: false,
  initialMode: StakingMode.Stake,
  proposalDeposit: 5,
  loadingStakableTokens: { loading: false, data: 23456 },
  tokenDecimals: 6,
  tokenSymbol: 'TOKEN',
  loadingUnstakableTokens: { loading: false, data: 65432 },
  unstakingDuration: {
    time: 86400,
  },
}

export const Claim = Template.bind({})
Claim.args = {
  claimableTokens: 20,
  loading: false,
  initialMode: StakingMode.Claim,
  proposalDeposit: 5,
  loadingStakableTokens: { loading: false, data: 23456 },
  tokenDecimals: 6,
  tokenSymbol: 'TOKEN',
  loadingUnstakableTokens: { loading: false, data: 65432 },
  unstakingDuration: {
    time: 86400,
  },
}
