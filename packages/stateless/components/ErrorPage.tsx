import { ReactNode } from 'react'

export interface ErrorPageProps {
  title?: string
  children: ReactNode
}

export const ErrorPage = ({ title, children }: ErrorPageProps) => (
  <div className="mx-auto max-w-prose space-y-3 break-words p-6 text-center">
    {title && <h1 className="header-text">{title}</h1>}

    {children}
  </div>
)
