import { WarningRounded } from '@mui/icons-material'
import { ReactNode } from 'react'

export const Warning = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-row items-center gap-4 rounded-md bg-background-secondary p-4">
      <WarningRounded className="!h-10 !w-10" />

      {children}
    </div>
  )
}
