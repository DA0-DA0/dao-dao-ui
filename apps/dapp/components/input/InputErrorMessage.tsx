import { FieldError } from 'react-hook-form'

export function InputErrorMessage({
  error,
}: {
  error: FieldError | undefined
}) {
  if (error && error.message) {
    return <span className="mt-1 ml-1 text-xs text-error">{error.message}</span>
  }
  return null
}
