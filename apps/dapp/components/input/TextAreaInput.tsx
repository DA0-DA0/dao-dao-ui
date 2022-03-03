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
      className={`textarea
        ${error ? ' textarea-error' : ''}
        ${border ? ' textarea-bordered' : ''}`}
      {...register(label, { validate })}
    ></textarea>
  )
}
