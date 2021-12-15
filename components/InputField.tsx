import { useThemeContext } from 'contexts/theme'
import React, { ChangeEventHandler } from 'react'
import {
  FieldErrors,
  FieldPath,
  FieldPathValue,
  RegisterOptions,
  UseFormRegister,
  Validate,
} from 'react-hook-form'
import HelpTooltip from './HelpTooltip'

export function makeFieldErrorMessage<
  TFieldValues,
  TFieldName extends FieldPath<TFieldValues>
>(errors: FieldErrors<TFieldValues>) {
  return function (fieldName: TFieldName, msg?: string): string {
    const err = (errors as any)[fieldName]
    if (err) {
      if (!msg) {
        if (err.type === 'required') {
          msg = `"${fieldName}" is required`
        } else {
          msg = `bad input for ${fieldName} (${err.type})`
        }
      }
      return msg
    }
    return ''
  }
}

export function InputFieldLabel({
  fieldName,
  errorText,
  showErrorMessage,
  toolTip,
  label,
}: {
  fieldName: any
  label?: string
  toolTip?: string
  errorText?: string
  showErrorMessage?: boolean
}) {
  if (!label) {
    return null
  }
  const errorComponent =
    errorText && !(showErrorMessage === false) ? (
      <span className="label-text text-error flex-1 text-right">
        {errorText}
      </span>
    ) : null
  const tooltipComponent = toolTip ? <HelpTooltip text={toolTip} /> : null
  return (
    <label className="label" htmlFor={fieldName}>
      <span className="label-text font-bold">{label || fieldName}</span>
      {errorComponent}
      {tooltipComponent}
    </label>
  )
}

// todo look at react-hook-form formcontext
export default function InputField<
  TFieldValues,
  TFieldName extends FieldPath<TFieldValues>
>({
  fieldName,
  label,
  toolTip,
  type = 'text',
  placeholder = '',
  readOnly,
  errorMessage,
  onChange,
  size,
  defaultValue,
  required = true,
  min,
  max,
  showErrorMessage,
  validate,
  register,
  fieldErrorMessage,
  autoComplete = 'false',
}: {
  fieldName: TFieldName
  label?: string
  toolTip?: string
  type?: string
  placeholder?: string
  readOnly?: boolean
  errorMessage?: string
  size?: number
  defaultValue?: string | number
  required?: boolean
  min?: number
  max?: number
  showErrorMessage?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  validate?:
    | Validate<FieldPathValue<TFieldValues, TFieldName>>
    | Record<string, Validate<FieldPathValue<TFieldValues, TFieldName>>>
  register: UseFormRegister<TFieldValues>
  fieldErrorMessage(a: any, b: any): string
  autoComplete?: string
}) {
  const options = { required, validate }
  const errorText = fieldErrorMessage(fieldName, errorMessage)
  const labelComponent = (
    <InputFieldLabel
      label={label}
      errorText={errorText}
      fieldName={fieldName}
      toolTip={toolTip}
      showErrorMessage={showErrorMessage}
    />
  )
  const inputComponent = (
    <input
      {...register(fieldName, options)}
      className={
        type === 'checkbox'
          ? 'toggle'
          : errorText
          ? `block box-border m-0 w-full rounded input input-bordered input-error`
          : `block box-border m-0 w-full rounded input input-bordered`
      }
      defaultValue={defaultValue}
      defaultChecked={
        type === 'checkbox' && defaultValue === 1 ? true : undefined
      }
      type={type}
      placeholder={placeholder}
      readOnly={readOnly}
      onChange={onChange}
      size={size}
      min={min}
      max={max}
      autoComplete={autoComplete}
    />
  )

  return (
    <div className="form-control">
      {labelComponent}
      {inputComponent}
    </div>
  )
}
