import { FC, ReactNode } from 'react'

import { Button } from '../Button'
import { LogoNoBorder } from '../Logo'

export interface BalanceCardProps {
  title: ReactNode
  icon?: ReactNode
  buttonLabel: ReactNode
  loading: boolean
  onClick: () => void
}

export const BalanceCard: FC<BalanceCardProps> = ({
  title,
  icon,
  buttonLabel,
  loading,
  onClick,
  children,
}) => (
  <div className="py-4 px-6 w-full rounded-lg border border-default">
    {typeof title === 'string' ? (
      <h2 className="font-bold primary-text">{title}</h2>
    ) : (
      title
    )}
    <div className="mt-2 mb-4">
      {loading ? (
        <div className="inline-block mt-2 animate-spin-medium">
          <LogoNoBorder />
        </div>
      ) : (
        children
      )}
    </div>
    <div className="flex justify-end">
      <Button onClick={onClick} size="sm" variant="secondary">
        {icon} {buttonLabel}
      </Button>
    </div>
  </div>
)
