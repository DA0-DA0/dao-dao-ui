import { ComponentProps, ReactNode } from 'react'

import clsx from 'clsx'

export interface IconStatsProps {
  Icon: (props: ComponentProps<any>) => JSX.Element
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function HeroStat({ Icon, size = 'md', children }: IconStatsProps) {
  return (
    <div className="flex items-center space-x-2">
      <Icon
        className={clsx('text-secondary fill-current', {
          'w-3 h-3': size == 'sm',
          'w-4 h-4': size == 'md',
          'w-5 h-5': size == 'lg',
        })}
      />
      <span>{children}</span>
    </div>
  )
}
