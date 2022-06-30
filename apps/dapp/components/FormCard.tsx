import { FC, ReactNode } from 'react'

export interface FormCardProps {
  children: ReactNode
}

export const FormCard: FC<FormCardProps> = ({ children }) => (
  <div className="my-2 rounded-lg bg-disabled py-4 px-6">{children}</div>
)
