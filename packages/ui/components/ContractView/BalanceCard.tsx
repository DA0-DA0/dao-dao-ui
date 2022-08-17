import clsx from 'clsx'
import { ReactNode } from 'react'

import { Button } from '../Button'
import { LogoNoBorder } from '../Logo'

export interface BalanceCardProps {
  children: ReactNode | ReactNode[]
  title: ReactNode
  icon?: ReactNode
  buttonLabel: ReactNode
  loading: boolean
  onClick: () => void
  opaque?: boolean
}

export const BalanceCard = ({
  title,
  icon,
  buttonLabel,
  loading,
  onClick,
  opaque,
  children,
}: BalanceCardProps) => (
  <div
    className={clsx('p-5 w-full rounded-lg', {
      'border border-default': !opaque,
      'bg-primary': opaque,
    })}
  >
    {typeof title === 'string' ? (
      <h2
        className={clsx({
          'font-mono caption-text': !opaque,
          'link-text': opaque,
        })}
      >
        {title}
      </h2>
    ) : (
      title
    )}
    <div className="my-4">
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
