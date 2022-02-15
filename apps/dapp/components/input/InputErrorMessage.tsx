import { FieldError } from 'react-hook-form'

export function InputErrorMessage({
  error,
}: {
  error: FieldError | undefined
}) {
  if (error && error.message) {
    return <span className="text-xs text-error mt-1 ml-1">{error.message}</span>
  }
  return null
}
