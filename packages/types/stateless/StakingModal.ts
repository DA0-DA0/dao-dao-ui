import { GenericToken } from '..'
import { Duration } from '../contracts/common'
import { LoadingData } from './common'
import { ValidatorPickerProps } from './ValidatorPicker'

export enum StakingMode {
  Stake = 'stake',
  Unstake = 'unstake',
  Restake = 'restake',
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
  // The number of tokens that are unstakable. If undefined, will not be shown.
  // If `validatorPicker` is present, unstakable tokens will depend on the
  // chosen validator.
  loadingUnstakableTokens?: LoadingData<number>
  // The number of tokens that are stakable.
  loadingStakableTokens: LoadingData<number>
  // The duration for unstaking.
  unstakingDuration: Duration | null
  // Token that is being staked.
  token: GenericToken
  // Proposal deposit for the token that is being staked.
  proposalDeposit?: number
  // Is there an error?
  error?: string | undefined
  // Are we ready to stake? Ex: is wallet connected?
  loading: boolean
  // Triggered when the stake / unstake / claim button is pressed.
  onAction: (
    mode: StakingMode,
    amount: number,
    validator?: string,
    // If mode is `StakingMode.Restake`, this will be the validator to unstake
    // funds from.
    fromValidator?: string
  ) => void
  // If present, will control the visibility of the staking modal. If absent,
  // the modal will be visible always.
  visible?: boolean
  // If present, a validator picker will be shown in the header and the selected
  // validator address will be present in the `onAction` callback.
  validatorPicker?: Omit<
    ValidatorPickerProps,
    'selectedAddress' | 'onSelect' | 'readOnly' | 'token'
  >
  // Enable restaking. Validator picker must be present as well.
  enableRestaking?: boolean
}
