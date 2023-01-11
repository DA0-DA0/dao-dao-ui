import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  ComponentType,
} from 'react'
import {
  FieldError,
  FieldPathValue,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  Validate,
} from 'react-hook-form'

import { ProfileSearchHit } from '../profile'
import { StatefulProfileDisplayProps } from './ProfileDisplay'

export interface AddressInputProps<
  FV extends FieldValues = FieldValues,
  FieldName extends Path<FV> = Path<FV>
> extends Omit<ComponentPropsWithoutRef<'input'>, 'required'> {
  fieldName: FieldName
  register: UseFormRegister<FV>
  watch?: UseFormWatch<FV>
  setValue?: UseFormSetValue<FV>
  onChange?: ChangeEventHandler<HTMLInputElement>
  validation?: Validate<FieldPathValue<FV, FieldName>>[]
  error?: FieldError | string
  disabled?: boolean
  required?: boolean
  containerClassName?: string
  type?: 'wallet' | 'contract'
  ProfileDisplay?: ComponentType<StatefulProfileDisplayProps>
  autofillProfiles?: {
    hits: ProfileSearchHit[]
    loading: boolean
  }
}
