import {
  DateTimePicker as DateTimePickerComponet,
  DateTimePickerProps as DateTimePickerComponetProps,
} from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import clsx from 'clsx'
import dayjs from 'dayjs'
import {
  Control,
  Controller,
  FieldError,
  FieldPathValue,
  FieldValues,
  Path,
  Validate,
} from 'react-hook-form'
import './DateTimePicker.css'

interface DateTimePickerProps<
  FV extends FieldValues,
  FieldName extends Path<FV>
> extends DateTimePickerComponetProps<dayjs.Dayjs> {
  fieldName: FieldName
  control: Control<FV>
  validation?: Validate<FieldPathValue<FV, FieldName>>[]
  error?: FieldError
  required?: boolean
}

export const DateTimePicker = <
  FV extends FieldValues,
  FieldName extends Path<FV>
>({
  fieldName,
  control,
  error,
  validation,
  required,
  className,
  ...props
}: DateTimePickerProps<FV, FieldName>) => {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        control={control}
        name={fieldName}
        render={({ field: { onChange, value } }) => (
          <DateTimePickerComponet
            {...props}
            className={clsx(error && 'Mui-error', className)}
            onChange={(date) => {
              // Only propagate valid date inputs 
              if (date?.isValid()) {
                onChange(date?.toISOString())
              }
            }}
            value={dayjs(value)}
          />
        )}
        rules={{ required: required && 'Required', validate }}
      />
    </LocalizationProvider>
  )
}
