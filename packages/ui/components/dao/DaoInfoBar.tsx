import clsx from 'clsx'
import { ComponentType } from 'react'

import { DaoInfoBarProps } from '@dao-dao/tstypes/ui/DaoInfoBar'
import { LoaderProps } from '@dao-dao/tstypes/ui/Loader'

export * from '@dao-dao/tstypes/ui/DaoInfoBar'

export const DaoInfoBar = ({ items, className }: DaoInfoBarProps) => (
  <div
    className={clsx(
      'flex flex-row flex-wrap gap-12 items-center px-8 pt-5 pb-9',
      className
    )}
  >
    {items.map(({ Icon, label, value }, index) => (
      <div
        key={index}
        className="flex basis-0 flex-col grow gap-1 items-center text-center"
      >
        <Icon className="mb-2 w-5 h-5 text-icon-secondary" />

        <p className="secondary-text">{label}</p>
        <div className="flex flex-row gap-1 font-mono symbol-small-body-text">
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
