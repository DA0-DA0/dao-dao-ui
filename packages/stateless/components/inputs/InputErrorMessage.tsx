import clsx from 'clsx'
import { FieldError } from 'react-hook-form'

export interface InputErrorMessageProps {
  error?: FieldError | string
  className?: string
}

export const InputErrorMessage = ({
  error,
  className,
}: InputErrorMessageProps) =>
  typeof error === 'string' || error?.message ? (
    <span
      className={clsx(
        'mt-1 ml-1 inline-block max-w-prose break-words text-xs text-text-interactive-error',
        className
      )}
    >
      {typeof error === 'string' ? error : error.message}
    </span>
  ) : null
