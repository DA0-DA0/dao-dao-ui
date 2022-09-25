import { ReactNode } from 'react'

export interface ErrorPageProps {
  title?: string
  children: ReactNode
}

export const ErrorPage = ({ title, children }: ErrorPageProps) => (
  <div className="p-6 mx-auto space-y-3 max-w-prose text-center break-words">
    {title && <h1 className="header-text">{title}</h1>}

    {children}
  </div>
)
