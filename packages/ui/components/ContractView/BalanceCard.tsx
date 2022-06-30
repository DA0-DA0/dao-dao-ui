import clsx from 'clsx'
import { FC, ReactNode } from 'react'

import { Button } from '../Button'
import { LogoNoBorder } from '../Logo'

export interface BalanceCardProps {
  title: ReactNode
  icon?: ReactNode
  buttonLabel: ReactNode
  loading: boolean
  onClick: () => void
  opaque?: boolean
}

export const BalanceCard: FC<BalanceCardProps> = ({
  title,
  icon,
  buttonLabel,
  loading,
  onClick,
  opaque,
  children,
}) => (
  <div
    className={clsx('w-full rounded-lg p-5', {
      'border border-default': !opaque,
      'bg-primary': opaque,
    })}
  >
    {typeof title === 'string' ? (
      <h2
        className={clsx({
          'caption-text font-mono': !opaque,
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
        <div className="mt-2 inline-block animate-spin-medium">
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
