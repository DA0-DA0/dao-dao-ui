import clsx from 'clsx'
import { ComponentType } from 'react'

import { DaoInfoBarProps } from '@dao-dao/types/components/DaoInfoBar'
import { LoaderProps } from '@dao-dao/types/components/Loader'

export * from '@dao-dao/types/components/DaoInfoBar'

export const DaoInfoBar = ({ items, className }: DaoInfoBarProps) => (
  <div
    className={clsx(
      'flex flex-row flex-wrap items-center gap-12 px-8 pt-5 pb-9',
      className
    )}
  >
    {items.map(({ Icon, label, value }, index) => (
      <div
        key={index}
        className="flex grow basis-0 flex-col items-center gap-1 text-center"
      >
        <Icon className="text-icon-secondary mb-2 h-5 w-5" />

        <p className="secondary-text">{label}</p>
        <div className="symbol-small-body-text flex flex-row gap-1 font-mono">
          {value}
        </div>
      </div>
    ))}
  </div>
)

export interface DaoInfoBarLoaderProps {
  Loader: ComponentType<LoaderProps>
}

export const DaoInfoBarLoader = ({ Loader }: DaoInfoBarLoaderProps) => (
  <Loader className="h-32" />
)
