import { ReactNode, FC } from 'react'

export interface FormCardProps {
  children: ReactNode
}

export const FormCard: FC<FormCardProps> = ({ children }) => (
  <div className="py-4 px-6 my-2 rounded rounded-lg bg-disabled">
    {children}
  </div>
)
