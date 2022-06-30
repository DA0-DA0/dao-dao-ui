import { FC } from 'react'

export const StatsCard: FC = ({ children }) => (
  <div className="flex flex-col gap-1 items-center px-6 md:px-6">
    {children}
  </div>
)
