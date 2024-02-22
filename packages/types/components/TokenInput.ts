import { ReactNode } from 'react'
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  Validate,
} from 'react-hook-form'

import { LoadingData } from '../misc'
import { GenericToken, TokenType } from '../token'

export type TokenInputOption = Omit<GenericToken, 'type' | 'decimals'> & {
  type: TokenType | string
  description?: string
  // Only necessary if `convertMicroDenom` is true so the input can
  // intelligently convert the value. 0 will be used if not provided.
  decimals?: number
}

export type TokenInputProps<
  T extends TokenInputOption,
  FV extends FieldValues = FieldValues,
  FieldName extends Path<FV> = Path<FV>
> = {
  amount?: {
    register: UseFormRegister<FV>
    watch: UseFormWatch<FV>
    setValue: UseFormSetValue<FV>
    fieldName: FieldName
    error?: FieldError
    min?: number
    max?: number
    step?: number
    unit?: string
    validations?: Validate<number>[]
    // If true, will convert the amount to micro-denom using the token's
    // decimals value for the form. Thus, the input will display the macro-denom
    // amount, but the form will receive the micro-denom amount. Default is
    // false.
    convertMicroDenom?: boolean
  }
  // The pair of `type` and `denomOrAddress` must be unique for each token.
  tokens: LoadingData<T[]>
  onSelectToken: (token: T) => void
  selectedToken: Pick<T, 'chainId' | 'type' | 'denomOrAddress'> | undefined
  tokenFallback?: ReactNode
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  containerClassName?: string
  /**
   * Optionally show the chain image over the token image.
   */
  showChainImage?: boolean
}
