import clsx from 'clsx'
import { ReactNode } from 'react'

export interface ErrorPageProps {
  title: string
  children: ReactNode
}

export const ErrorPage = ({ title, children }: ErrorPageProps) => (
  <div className="p-6 mx-auto max-w-prose text-center break-words">
    <h1 className={clsx('header-text', { 'mb-3': !!children })}>{title}</h1>

    {children}
  </div>
)
