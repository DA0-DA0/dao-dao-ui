import { ComponentMeta, ComponentStory } from '@storybook/react'
import { BigNumber } from 'bignumber.js'
import { useState } from 'react'

import { CHAIN_ID } from '@dao-dao/storybook'
import { getNativeTokenForChainId } from '@dao-dao/utils'

import { StakingModal, StakingMode } from './StakingModal'

export default {
  title: 'DAO DAO / packages / stateless / components / token / StakingModal',
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
  loadingStakableTokens: { loading: false, data: BigNumber(23456) },
  token: getNativeTokenForChainId(CHAIN_ID),
  loadingUnstakableTokens: { loading: false, data: BigNumber(65432) },
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
  loadingStakableTokens: { loading: false, data: BigNumber(23456) },
  token: getNativeTokenForChainId(CHAIN_ID),
  loadingUnstakableTokens: { loading: false, data: BigNumber(65432) },
  unstakingDuration: {
    time: 86400,
  },
}
