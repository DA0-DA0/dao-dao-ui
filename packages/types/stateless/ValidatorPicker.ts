import { GenericToken, TokenStake, Validator } from '@dao-dao/types'

export interface ValidatorPickerProps {
  validators: Validator[]
  stakes?: TokenStake[]
  selectedAddress?: string
  readOnly?: boolean
  onSelect: (validator: Validator) => void
  // Token being staked.
  token: GenericToken
  displayClassName?: string
}
