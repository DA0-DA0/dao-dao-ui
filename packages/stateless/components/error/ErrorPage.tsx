import clsx from 'clsx'
import { ReactNode } from 'react'

export interface ErrorPageProps {
  title?: string
  titleClassName?: string
  children: ReactNode
  className?: string
}

export const ErrorPage = ({
  title,
  titleClassName,
  children,
  className,
}: ErrorPageProps) => (
  <div
    className={clsx(
      'mx-auto flex max-w-prose flex-col items-center gap-4 break-words p-6 text-center',
      className
    )}
  >
    {title && <h1 className={clsx('header-text', titleClassName)}>{title}</h1>}

    {children}
  </div>
)
