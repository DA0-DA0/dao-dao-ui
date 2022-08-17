import { ComponentMeta, ComponentStory } from '@storybook/react'

import { StakingModal } from 'components/StakingModal/StakingModal'

export default {
  title: 'DAO DAO UI / StakingModal / StakingModal',
  component: StakingModal,
} as ComponentMeta<typeof StakingModal>

const Template: ComponentStory<typeof StakingModal> = (args) => (
  <StakingModal {...args} />
)

export const Default = Template.bind({})
Default.args = {
  mode: null, // TODO: Fill in default value.
  amount: null, // TODO: Fill in default value.
  setAmount: null, // TODO: Fill in default value.
  onClose: null, // TODO: Fill in default value.
  claimableTokens: null, // TODO: Fill in default value.
  unstakableTokens: null, // TODO: Fill in default value.
  stakableTokens: null, // TODO: Fill in default value.
  unstakingDuration: null, // TODO: Fill in default value.
  tokenSymbol: null, // TODO: Fill in default value.
  tokenDecimals: null, // TODO: Fill in default value.
  loading: null, // TODO: Fill in default value.
  onAction: null, // TODO: Fill in default value.
}
