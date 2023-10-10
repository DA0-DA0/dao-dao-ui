import clsx from 'clsx'

import { Tooltip } from '@dao-dao/stateless'
import { formatDateTimeTz, formatDateWithDayAndMaybeYear } from '@dao-dao/utils'

import { Wrappr } from '../types'

export type WrapprLineProps = {
  wrappr: Wrappr
  onClick: () => void
  transparentBackground?: boolean
}

export const WrapprLine = ({
  wrappr,
  onClick,
  transparentBackground,
}: WrapprLineProps) => (
  <div
    className={clsx(
      'box-content grid h-8 cursor-pointer grid-cols-2 items-center gap-4 rounded-lg py-3 px-4 transition hover:bg-background-interactive-hover active:bg-background-interactive-pressed',
      !transparentBackground && 'bg-background-tertiary'
    )}
    onClick={onClick}
  >
    <p className="primary-text">{wrappr.title}</p>

    <div className="flex flex-row items-center justify-end">
      <Tooltip title={formatDateTimeTz(wrappr.initiallyCreated)}>
        <p className="secondary-text text-right font-mono">
          {formatDateWithDayAndMaybeYear(wrappr.initiallyCreated)}
        </p>
      </Tooltip>
    </div>
  </div>
)
