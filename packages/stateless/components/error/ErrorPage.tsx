import clsx from 'clsx'
import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

export interface ErrorPageProps {
  /**
   * Defaults to unexpected error title.
   */
  title?: string
  /**
   * Optional class name for the title.
   */
  titleClassName?: string
  /**
   * If passed, will be displayed below the title.
   */
  error?: Error | string
  /**
   * Optionally show any children.
   */
  children?: ReactNode
  /**
   * Optional class name for the container.
   */
  className?: string
}

export const ErrorPage = ({
  title,
  titleClassName,
  error,
  children,
  className,
}: ErrorPageProps) => {
  const { t } = useTranslation()

  title ??= t('error.unexpectedError')

  return (
    <div
      className={clsx(
        'mx-auto flex max-w-prose flex-col items-center gap-4 break-words p-6 text-center',
        className
      )}
    >
      {!!title && (
        <p className={clsx('header-text', titleClassName)}>{title}</p>
      )}

      {!!error && (
        <pre className="whitespace-pre-wrap text-xs text-text-interactive-error">
          {error instanceof Error ? error.message : error}
        </pre>
      )}

      {children}
    </div>
  )
}
