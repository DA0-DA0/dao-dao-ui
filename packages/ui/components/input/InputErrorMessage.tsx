import { FC } from 'react'
import { FieldError } from 'react-hook-form'

interface InputErrorMessageProps {
  error: FieldError | undefined
}

export const InputErrorMessage: FC<InputErrorMessageProps> = ({ error }) =>
  error?.message ? (
    <span className="mt-1 ml-1 text-xs text-error">{error.message}</span>
  ) : null
