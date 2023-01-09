import clsx from 'clsx'

import { DaoInfoBarProps } from '@dao-dao/types/stateless/DaoInfoBar'

import { Loader } from '../logo/Loader'

export * from '@dao-dao/types/stateless/DaoInfoBar'

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
        <Icon className="mb-2 h-5 w-5 text-icon-secondary" />

        <p className="secondary-text">{label}</p>
        <div className="symbol-small-body-text flex flex-row gap-1 font-mono">
          {value}
        </div>
      </div>
    ))}
  </div>
)

export const DaoInfoBarLoader = () => <Loader className="h-32" />
