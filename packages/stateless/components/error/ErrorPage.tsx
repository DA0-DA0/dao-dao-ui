import { ReactNode } from 'react'

export interface ErrorPageProps {
  title?: string
  children: ReactNode
}

export const ErrorPage = ({ title, children }: ErrorPageProps) => (
  <div className="mx-auto flex max-w-prose flex-col items-center gap-4 break-words p-6 text-center">
    {title && <h1 className="header-text">{title}</h1>}

    {children}
  </div>
)
