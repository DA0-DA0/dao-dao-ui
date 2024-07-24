import { ComponentPropsWithoutRef } from 'react'
import {
  FieldPathValue,
  FieldValues,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

export interface NumberInputProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> extends Omit<
    ComponentPropsWithoutRef<'input'>,
    'type' | 'required' | 'value'
  > {
  // The field name for the form.
  fieldName?: FieldName
  // Register function returned by `useForm`/`useFormContext`.
  register?: UseFormRegister<FV>
  // Validations to apply when registering this input.
  validation?: Validate<FieldPathValue<FV, FieldName>>[]
  // Applies to the input when registering with a form.
  required?: boolean
  // Transform the value displayed in the input by these decimals.
  transformDecimals?: number
  // If error present, outline input in red.
  error?: any
  // Hide plus/minus buttons
  hidePlusMinus?: boolean
  // Value passed to the input.
  value?: number
  // Used to get the value when the plus/minus buttons are clicked. Accepts the
  // react-hook-form `watch` function, or any custom function.
  watch?: (fieldName: any) => number | undefined
  // Used to set the value when the plus/minus buttons are clicked. Accepts the
  // react-hook-form `watch` function, or any custom function.
  setValue?: (
    fieldName: any,
    value: number,
    options?: { shouldValidate: boolean }
  ) => void
  // Applies to the outer-most container, which contains the plus/minus buttons,
  // the input, and the unit.
  containerClassName?: string
  // Size of the container.
  sizing?: 'sm' | 'md' | 'lg' | 'auto' | 'fill' | 'none'
  // Remove padding, rounded corners, and outline.
  ghost?: boolean
  // A unit to display to the right of the number.
  unit?: string
  // A unit icon URL that displays to the left of the unit.
  unitIconUrl?: string
  // Applies to both the input text and the unit.
  textClassName?: string
  // Applies to the unit only.
  unitClassName?: string
  // Applies to the unit icon only.
  unitIconClassName?: string
  // Applies to the unit container only.
  unitContainerClassName?: string
  // Size of the plus/minus buttons. Defaults to 'sm'.
  plusMinusButtonSize?: 'sm' | 'lg'
}
