import './DateTimePicker.css'

import { Today } from '@mui/icons-material'
import clsx from 'clsx'
import { useState } from 'react'
import ReactDateTimePicker from 'react-datetime-picker'
import {
  Control,
  Controller,
  FieldError,
  FieldPathValue,
  FieldValues,
  Path,
  Validate,
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { browserIs12Hour } from '@dao-dao/utils'

export type DateTimePickerProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> = {
  /**
   * The control value returned by `useForm`.
   */
  control: Control<FV>
  /**
   * The field name for the value this will contain.
   */
  fieldName: FieldName
  /**
   * A list of functions that, when given the current value of this field,
   * return true if the value is valid and an error message otherwise.
   */
  validation?: Validate<FieldPathValue<FV, FieldName>>[]
  /**
   * Any errors that have occured during validation of this input.
   */
  error?: FieldError
  /**
   * Whether or not the input is required.
   */
  required?: boolean
  /**
   * Whether or not the input is disabled.
   */
  disabled?: boolean
  /**
   * Minimum date.
   */
  minDate?: Date
  /**
   * Maximum date.
   */
  maxDate?: Date
  /**
   * Optional class names to apply to the input container.
   */
  className?: string
}

export const DateTimePicker = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
  control,
  fieldName,
  error,
  validation,
  required,
  disabled,
  minDate,
  maxDate,
  className,
}: DateTimePickerProps<FV, FieldName>) => {
  const { t } = useTranslation()
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )

  // Check if locale uses 12/24 hour format.
  const [is12HourFormat] = useState(browserIs12Hour)

  return (
    <Controller
      control={control}
      name={fieldName}
      render={({ field: { onChange, value } }) => (
        <ReactDateTimePicker
          autoFocus={false}
          calendarIcon={() => (
            <Today className="!text-icon-primary !w-5 !h-5 hover:opacity-80 active:opacity-70 transition-opacity" />
          )}
          className={clsx(
            'secondary-text text-text-body w-full appearance-none transition bg-transparent focus:outline-none rounded-md py-2 px-3 ring-1 focus:ring-2',
            // Outline color
            error
              ? 'ring-border-interactive-error'
              : 'ring-border-primary focus:ring-border-interactive-focus',
            className
          )}
          clearIcon={null}
          disableClock
          disabled={disabled}
          format={'y-MM-dd ' + (is12HourFormat ? `h:mm a` : 'HH:mm')}
          maxDate={maxDate}
          minDate={minDate}
          name={fieldName}
          onChange={(v) => onChange(v instanceof Date ? v.toISOString() : v)}
          value={value}
        />
      )}
    />
  )
}
