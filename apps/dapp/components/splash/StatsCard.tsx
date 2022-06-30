import { FC } from 'react'

export const StatsCard: FC = ({ children }) => (
  <div className="flex flex-col items-center gap-1 px-6 md:px-6">
    {children}
  </div>
)
