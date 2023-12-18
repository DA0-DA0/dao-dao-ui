import clsx from 'clsx'
import { FieldError } from 'react-hook-form'

export interface InputErrorMessageProps {
  error?: FieldError | string | Error | unknown
  className?: string
}

export const InputErrorMessage = ({
  error,
  className,
}: InputErrorMessageProps) => {
  const message =
    error &&
    (typeof error === 'string'
      ? error
      : error instanceof Error ||
        (typeof error === 'object' &&
          'message' in error &&
          typeof (error as { message: string }).message === 'string')
      ? (error as { message: string }).message
      : `${error}`)

  return message ? (
    <span
      className={clsx(
        'mt-1 ml-1 inline-block max-w-prose break-words text-xs text-text-interactive-error',
        className
      )}
    >
      {message}
    </span>
  ) : null
}
