import clsx from 'clsx'
import { FC } from 'react'

interface ErrorPageProps {
  title: string
}

export const ErrorPage: FC<ErrorPageProps> = ({ title, children }) => (
  <div className="mx-auto max-w-prose break-words p-6 text-center">
    <h1 className={clsx('header-text', { 'mb-3': !!children })}>{title}</h1>

    {children}
  </div>
)
