import clsx from 'clsx'
import { FieldError } from 'react-hook-form'

export interface InputErrorMessageProps {
  error?: FieldError
  className?: string
}

export const InputErrorMessage = ({
  error,
  className,
}: InputErrorMessageProps) =>
  error?.message ? (
    <span
      className={clsx(
        'mt-1 ml-1 inline-block max-w-prose break-words text-xs text-error',
        className
      )}
    >
      {error.message}
    </span>
  ) : null
