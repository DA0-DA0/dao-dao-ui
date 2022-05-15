import clsx from 'clsx'
import { FC } from 'react'

interface ErrorPageProps {
  title: string
}

export const ErrorPage: FC<ErrorPageProps> = ({ title, children }) => (
  <div className="p-6 mx-auto max-w-prose text-center break-words">
    <h1 className={clsx('text-3xl font-bold', { 'mb-3': !!children })}>
      {title}
    </h1>

    {children}
  </div>
)
