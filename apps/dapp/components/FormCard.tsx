import { ReactNode, FC } from 'react'

export interface FormCardProps {
  children: ReactNode
}

export const FormCard: FC<FormCardProps> = ({ children }) => (
  <div className="bg-disabled rounded rounded-lg px-6 py-4 my-2">
    {children}
  </div>
)
