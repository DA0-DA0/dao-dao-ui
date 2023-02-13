import { TokenStake, Validator } from '@dao-dao/types'

export interface ValidatorPickerProps {
  validators: Validator[]
  stakes?: TokenStake[]
  selectedAddress?: string
  readOnly?: boolean
  onSelect: (validator: Validator) => void
  // Denom and decimals that correspond with validator.tokens (likely the native
  // token on the chain).
  nativeDenom: string
  nativeDecimals: number
  displayClassName?: string
}
