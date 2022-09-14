import { Duration } from '../contracts/common'

export enum StakingMode {
  Stake = 'stake',
  Unstake = 'unstake',
  Claim = 'claim',
}

export interface StakingModalProps {
  // The mode to open the staking modal in.
  initialMode: StakingMode
  // The number of tokens in question.
  amount: number
  // Sets the number of tokens in question.
  setAmount: (newAmount: number) => void
  // Called when the staking modal is closed.
  onClose: () => void
  // The number of tokens that are currently claimable.
  claimableTokens: number
  // The number of tokens that are unstakable.
  unstakableTokens: number
  // The number of tokens that are stakable.
  stakableTokens: number
  // The duration for unstaking.
  unstakingDuration: Duration | null
  // Symbol for the token that is being staked.
  tokenSymbol: string
  // Decimals for the token that is being staked.
  tokenDecimals: number
  // Proposal deposit for the token that is being staked.
  proposalDeposit?: number
  // Is there an error?
  error?: string | undefined
  // Are we ready to stake? Ex: is wallet connected?
  loading: boolean
  // Triggered when the stake / unstake / claim button is pressed.
  onAction: (mode: StakingMode, amount: number) => void
}
