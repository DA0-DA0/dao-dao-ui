// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more
// copyright information.

import { ReactNode } from 'react'

export interface HomepageLayoutProps {
  children: ReactNode
}

export const HomepageLayout = ({ children }: HomepageLayoutProps) => (
  <>{children}</>
)
