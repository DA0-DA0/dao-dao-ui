// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more
// copyright information.

import { ReactNode } from 'react'

export interface SplashStatsCardProps {
  children: ReactNode | ReactNode[]
}

export const SplashStatsCard = ({ children }: SplashStatsCardProps) => (
  <div className="flex flex-col items-center gap-1 px-6 md:px-6">
    {children}
  </div>
)
