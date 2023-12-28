import clsx from 'clsx'
import { FieldError } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export interface InputErrorMessageProps {
  error?: FieldError | string | Error | unknown
  className?: string
}

export const InputErrorMessage = ({
  error,
  className,
}: InputErrorMessageProps) => {
  const { t } = useTranslation()
  const message =
    error &&
    (typeof error === 'string'
      ? error
      : error instanceof Error ||
        (typeof error === 'object' &&
          'message' in error &&
          typeof (error as { message: string }).message === 'string')
      ? (error as { message: string }).message
      : t('error.unknownError'))

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
