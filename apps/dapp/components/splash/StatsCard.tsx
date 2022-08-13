// GNU AFFERO GENERAL PUBLIC LICENSE Version 3. Copyright (C) 2022 DAO DAO Contributors.
// See the "LICENSE" file in the root directory of this package for more copyright information.

import { FC } from 'react'

export const StatsCard: FC = ({ children }) => (
  <div className="flex flex-col gap-1 items-center px-6 md:px-6">
    {children}
  </div>
)
