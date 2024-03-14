import { Validator } from '../chain'
import { GenericToken, TokenStake } from '../token'

export type ValidatorPickerProps = {
  validators: Validator[]
  stakes?: TokenStake[]
  selectedAddress?: string
  readOnly?: boolean
  onSelect: (validator: Validator) => void
  // Token being staked.
  token: GenericToken
  displayClassName?: string
}
