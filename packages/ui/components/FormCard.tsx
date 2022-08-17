import { ReactNode } from 'react'

export interface FormCardProps {
  children: ReactNode
}

export const FormCard = ({ children }: FormCardProps) => (
  <div className="py-4 px-6 my-2 bg-disabled rounded-lg">{children}</div>
)
