// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { ReactNode } from 'react'

export interface FormCardProps {
  children: ReactNode
}

export const FormCard = ({ children }: FormCardProps) => (
  <div className="py-4 px-6 my-2 bg-disabled rounded-lg">{children}</div>
)
