import { ReactNode } from 'react'

export interface HomepageLayoutProps {
  children: ReactNode
}

export const HomepageLayout = ({ children }: HomepageLayoutProps) => (
  <>{children}</>
)
