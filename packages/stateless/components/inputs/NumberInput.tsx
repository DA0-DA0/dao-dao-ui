import { Add, Remove } from '@mui/icons-material'
import clsx from 'clsx'
import { FieldValues, Path } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { HugeDecimal } from '@dao-dao/math'
import { NumberInputProps } from '@dao-dao/types'
import { toAccessibleImageUrl } from '@dao-dao/utils'

import { IconButton } from '../icon_buttons'

// To show plus/minus buttons, make sure to provide (`value` or
// `watch`+`fieldName`) in addition to `setValue`. When using a react-hook-form
// form, `setValue`, `watch`, and `fieldName` already exist. When not using a
// react-hook-form form, the `setValue` function can easily be mocked, and the
// first fieldName argument (which will be an empty string) can be ignored.

export const NumberInput = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
  fieldName,
  register,
  error,
  validation,
  hidePlusMinus,
  value: _value,
  watch,
  setValue,
  disabled,
  sizing,
  className,
  containerClassName,
  required,
  transformDecimals,
  ghost,
  unit,
  unitIconUrl,
  textClassName,
  unitClassName,
  unitIconClassName,
  unitContainerClassName,
  plusMinusButtonSize = 'sm',
  ...props
}: NumberInputProps<FV, FieldName>) => {
  const { t } = useTranslation()
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  const watchedField = watch && fieldName ? watch(fieldName) : _value
  const untransformedValue =
    !watchedField && watchedField !== 0 ? watchedField : Number(watchedField)
  const value =
    untransformedValue && transformDecimals
      ? HugeDecimal.from(untransformedValue).toHumanReadableNumber(
          transformDecimals
        )
      : untransformedValue

  return (
    <div
      className={clsx(
        'flex flex-row items-center gap-2 bg-transparent transition',
        // Padding and outline
        !ghost && 'rounded-md py-3 px-4 ring-1 ring-inset focus-within:ring-2',
        // Outline color
        error
          ? 'ring-border-interactive-error'
          : 'ring-border-primary focus-within:ring-border-interactive-focus',
        // Sizing
        {
          'w-28': sizing === 'sm',
          'w-40': sizing === 'md',
          'w-56': sizing === 'lg',
          'w-28 md:w-32 lg:w-40': sizing === 'auto',
          'w-full': sizing === 'fill',
        },
        containerClassName
      )}
    >
      {/* Do not require `fieldName` to be set in case a form is not being used. As long as `setValue` and `value` are present, these buttons will work. `value` is present if `watch`+`fieldName` are defined, or `value` is set directly. */}
      {!hidePlusMinus && !disabled && setValue && value !== undefined && (
        <div
          className={clsx(
            'flex flex-row items-center gap-1',
            // Add small gap between buttons when larger buttons are used.
            plusMinusButtonSize === 'lg' && 'gap-1'
          )}
        >
          {/* Minus button */}
          <IconButton
            Icon={Remove}
            disabled={disabled}
            iconClassName="text-icon-secondary"
            onClick={() =>
              setValue(
                fieldName ?? '',
                Math.min(
                  Math.max(
                    // Subtract 1 whole number.
                    Number(((value || 0) - 1).toFixed(0)),
                    typeof props.min === 'number' ? props.min : -Infinity
                  ),
                  typeof props.max === 'number' ? props.max : Infinity
                ),
                {
                  shouldValidate: true,
                }
              )
            }
            size={
              // The larger button size for this NumberInput corresponds to the
              // default icon button size.
              plusMinusButtonSize === 'lg' ? 'default' : plusMinusButtonSize
            }
            variant="ghost"
          />

          <IconButton
            Icon={Add}
            disabled={disabled}
            iconClassName="text-icon-secondary"
            onClick={() =>
              setValue(
                fieldName ?? '',
                Math.min(
                  Math.max(
                    // Add 1 whole number.
                    Number(((value || 0) + 1).toFixed(0)),
                    typeof props.min === 'number' ? props.min : -Infinity
                  ),
                  typeof props.max === 'number' ? props.max : Infinity
                ),
                {
                  shouldValidate: true,
                }
              )
            }
            size={
              // The larger button size for this NumberInput corresponds to the
              // default icon button size.
              plusMinusButtonSize === 'lg' ? 'default' : plusMinusButtonSize
            }
            variant="ghost"
          />
        </div>
      )}

      <input
        className={clsx(
          'ring-none secondary-text w-full grow appearance-none border-none bg-transparent text-right text-text-body outline-none',
          className,
          textClassName
        )}
        disabled={disabled}
        type="number"
        value={value}
        {...props}
        {...(register &&
          fieldName &&
          register(fieldName, {
            required: required && t('info.required'),
            validate,
            setValueAs: (value) => {
              // If not a number AND not a string or an empty string, set NaN.
              // Empty strings get converted to 0 with the Number constructor,
              // which we don't want, because then the input can't be cleared.
              const newValue =
                typeof value !== 'number' &&
                (typeof value !== 'string' || value.trim() === '')
                  ? NaN
                  : // On first load, setValueAs seems to be called with the first value, which is probably default loaded from a save. We don't want to transform this first value.
                  transformDecimals && value !== untransformedValue
                  ? HugeDecimal.fromHumanReadable(
                      value,
                      transformDecimals
                    ).toNumber()
                  : Number(value)

              return newValue
            },
          }))}
      />

      {(unit || unitIconUrl) && (
        <div
          className={clsx(
            'flex flex-row items-center gap-1.5 max-w-[10rem] shrink-0 min-w-0',
            unitContainerClassName
          )}
        >
          {unitIconUrl && (
            <div
              className={clsx(
                'h-5 w-5 shrink-0 bg-cover bg-center rounded-full ml-1',
                unitIconClassName
              )}
              style={{
                backgroundImage: `url(${toAccessibleImageUrl(unitIconUrl)})`,
              }}
            />
          )}

          <p
            className={clsx(
              'secondary-text max-w-[10rem] shrink-0 truncate text-right text-text-tertiary',
              textClassName,
              unitClassName
            )}
          >
            {unit}
          </p>
        </div>
      )}
    </div>
  )
}
