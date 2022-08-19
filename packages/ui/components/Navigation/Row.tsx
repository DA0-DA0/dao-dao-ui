import clsx from 'clsx'
import { ComponentType, ReactNode, SVGProps, useEffect, useState } from 'react'

import { UnfoldLess, UnfoldMore } from '@dao-dao/icons'

import { IconButton } from '../IconButton'

export interface RowProps {
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  label: string
  expandedLocalStorageKey?: string
  showBadge?: boolean
  onClick?: () => void
  children?: ReactNode
  rightNode?: ReactNode
  defaultExpanded?: boolean
}

export const Row = ({
  Icon,
  label,
  expandedLocalStorageKey,
  showBadge,
  onClick,
  children,
  rightNode,
  defaultExpanded = false,
}: RowProps) => {
  const [expanded, setExpanded] = useState(
    expandedLocalStorageKey && typeof localStorage !== 'undefined'
      ? localStorage.getItem(expandedLocalStorageKey) === '1'
      : defaultExpanded
  )
  useEffect(() => {
    if (expandedLocalStorageKey && typeof localStorage !== 'undefined') {
      localStorage.setItem(expandedLocalStorageKey, Number(expanded).toString())
    }
  }, [expanded, expandedLocalStorageKey])

  const ExpandButton = expanded ? UnfoldLess : UnfoldMore

  return (
    <div>
      <div
        className={clsx('flex flex-row gap-4 items-center p-2 body-text', {
          'hover:opacity-80 active:opacity-70 transition-opacity cursor-pointer':
            onClick,
        })}
      >
        <div className="flex relative justify-center items-center w-6 h-6">
          <Icon className="w-4 h-4" />
          {showBadge && (
            <div className="absolute -top-[0.1875rem] -right-[0.1875rem] w-1.5 h-1.5 rounded-full bg-icon-interactive-active"></div>
          )}
        </div>
        <p className="grow">{label}</p>
        {/* If children exist, display expand button. */}
        {children ? (
          <IconButton
            icon={<ExpandButton className="w-3 h-3 text-icon-secondary" />}
            onClick={() => setExpanded((e) => !e)}
            size="small"
            variant="ghost"
          />
        ) : (
          // If children do not exist but rightNode does, display it.
          rightNode
        )}
      </div>
      {/* Load in background even when hidden. */}
      <div className={clsx({ hidden: !expanded })}>{children}</div>
    </div>
  )
}
