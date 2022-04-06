import {
  FieldError,
  FieldPathValue,
  Path,
  UseFormRegister,
  Validate,
} from 'react-hook-form'

export function TextareaInput<
  FieldValues,
  FieldName extends Path<FieldValues>
>({
  label,
  register,
  error,
  validation,
  border = true,
}: {
  label: FieldName
  register: UseFormRegister<FieldValues>
  validation?: Validate<FieldPathValue<FieldValues, FieldName>>[]
  error?: FieldError
  border?: boolean
}) {
  const validate = validation?.reduce(
    (a, v) => ({ ...a, [v.toString()]: v }),
    {}
  )
  return (
    <textarea
      className={`bg-transparent rounded-lg px-3 py-2 transition focus:ring-1 focus:outline-none ring-brand ring-offset-0 border-default border border-default w-full body-text
        ${error ? ' ring-error ring-1' : ''}`}
      {...register(label, { validate })}
    ></textarea>
  )
}
