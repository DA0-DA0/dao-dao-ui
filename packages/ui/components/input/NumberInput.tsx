import { Add, Remove } from '@mui/icons-material'
import clsx from 'clsx'
import { ComponentProps } from 'react'
import {
  FieldError,
  FieldPathValue,
  FieldValues,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

import { IconButton, IconButtonProps } from '../IconButton'

export interface NumberInputProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> extends Omit<ComponentProps<'input'>, 'type' | 'required'> {
  fieldName?: FieldName
  register?: UseFormRegister<FV>
  validation?: Validate<FieldPathValue<FV, FieldName>>[]
  error?: FieldError
  onMinus?: () => void
  onPlus?: () => void
  containerClassName?: string
  sizing?: 'sm' | 'md' | 'auto'
  required?: boolean
  setValueAs?: (value: any) => any
  ghost?: boolean
  unit?: string
  textClassName?: string
  unitClassName?: string
  iconClassName?: string
  iconContainerClassName?: string
  iconSize?: IconButtonProps['size']
}

/**
 * @param fieldName  - the field name for the value that this will contain.
 * @param register   - the register function returned by `useForm`.
 * @param error      - any errors that have occured during validation of this
 *                     input.
 * @param validation - a list of functions that, when given the current value
 *                     of this field, return true if the value is valid and an
 *                     error message otherwise.
 */
export const NumberInput = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
  fieldName,
  register,
  error,
  validation,
  onMinus,
  onPlus,
  disabled,
  sizing,
  className,
  containerClassName,
  required,
  setValueAs,
  ghost,
  unit,
  textClassName,
  unitClassName,
  iconClassName,
  iconContainerClassName,
  iconSize = 'sm',
  ...props
}: NumberInputProps<FV, FieldName>) => {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  return (
    <div
      className={clsx(
        'flex flex-row gap-2 items-center bg-transparent transition',
        // Padding and outline
        !ghost && 'py-3 px-4 rounded-md ring-1 focus-within:ring-2',
        // Outline color
        error
          ? 'ring-border-interactive-error'
          : 'ring-border-primary focus-within:ring-border-interactive-focus',
        // Sizing
        {
          'w-28': sizing === 'sm',
          'w-40': sizing === 'md',
          'w-28 md:w-32 lg:w-40': sizing === 'auto',
        },
        containerClassName
      )}
    >
      <div
        className={clsx('flex flex-row items-center', iconContainerClassName)}
      >
        {onMinus && (
          <IconButton
            Icon={Remove}
            disabled={disabled}
            iconClassName={clsx('text-icon-secondary', iconClassName)}
            onClick={onMinus}
            size={iconSize}
            variant="ghost"
          />
        )}
        {onPlus && (
          <IconButton
            Icon={Add}
            disabled={disabled}
            iconClassName={clsx('text-icon-secondary', iconClassName)}
            onClick={onPlus}
            size={iconSize}
            variant="ghost"
          />
        )}
      </div>

      <input
        className={clsx(
          'grow w-full text-right text-text-body bg-transparent border-none outline-none ring-none secondary-text',
          className,
          textClassName
        )}
        disabled={disabled}
        type="number"
        {...props}
        {...(register &&
          fieldName &&
          register(fieldName, {
            required: required && 'Required',
            validate,
            ...(setValueAs ? { setValueAs } : { valueAsNumber: true }),
          }))}
      />

      {unit && (
        <p
          className={clsx(
            'shrink-0 text-right text-text-tertiary secondary-text',
            textClassName,
            unitClassName
          )}
        >
          {unit}
        </p>
      )}
    </div>
  )
}
