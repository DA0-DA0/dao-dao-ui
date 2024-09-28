import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { HugeDecimal } from '@dao-dao/math'
import { CHAIN_ID } from '@dao-dao/storybook'
import { StakingMode } from '@dao-dao/types'
import { getNativeTokenForChainId } from '@dao-dao/utils'

import { StakingModal } from './StakingModal'

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
  proposalDeposit: HugeDecimal.fromHumanReadable(5, 6),
  loadingStakableTokens: {
    loading: false,
    data: HugeDecimal.fromHumanReadable(23456, 6),
  },
  token: getNativeTokenForChainId(CHAIN_ID),
  loadingUnstakableTokens: {
    loading: false,
    data: HugeDecimal.fromHumanReadable(65432, 6),
  },
  unstakingDuration: {
    time: 86400,
  },
}

export const Claim = Template.bind({})
Claim.args = {
  claimableTokens: 20,
  loading: false,
  initialMode: StakingMode.Claim,
  proposalDeposit: HugeDecimal.fromHumanReadable(5, 6),
  loadingStakableTokens: {
    loading: false,
    data: HugeDecimal.fromHumanReadable(23456, 6),
  },
  token: getNativeTokenForChainId(CHAIN_ID),
  loadingUnstakableTokens: {
    loading: false,
    data: HugeDecimal.fromHumanReadable(65432, 6),
  },
  unstakingDuration: {
    time: 86400,
  },
}
