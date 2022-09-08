import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ComponentType, ReactNode, useEffect, useState } from 'react'

import { UnfoldLess, UnfoldMore } from '@dao-dao/icons'

import { IconButton } from '../IconButton'
import { Tooltip } from '../Tooltip'

export interface RowProps {
  Icon: ComponentType<{ className: string }>
  label: string
  expandedLocalStorageKey?: string
  showBadge?: boolean
  onClick?: () => void
  children?: ReactNode
  rightNode?: ReactNode
  defaultExpanded?: boolean
  localHref?: string
  compact?: boolean
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
  localHref,
  compact = false,
}: RowProps) => {
  const { asPath } = useRouter()
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

  return compact ? (
    <RowWrapper localHref={localHref}>
      <div
        className={clsx('flex flex-row items-center py-2.5 px-6 body-text', {
          'hover:opacity-70 active:opacity-60 transition-opacity cursor-pointer':
            onClick || localHref,
          'bg-background-interactive-selected':
            localHref && localHref === asPath,
        })}
        onClick={onClick}
      >
        <Tooltip title={label}>
          <div className="flex relative justify-center items-center w-8 h-8">
            <Icon className="!w-8 !h-8" />
            {showBadge && (
              <div className="absolute -top-[0.1875rem] -right-[0.1875rem] w-1.5 h-1.5 bg-icon-interactive-active rounded-full"></div>
            )}
          </div>
        </Tooltip>
      </div>

      <div>{children}</div>
    </RowWrapper>
  ) : (
    <RowWrapper localHref={localHref}>
      <div
        className={clsx('flex flex-row gap-4 items-center p-2 body-text', {
          'hover:opacity-70 active:opacity-60 transition-opacity cursor-pointer':
            onClick || localHref,
          'bg-background-interactive-selected rounded-md':
            localHref && localHref === asPath,
        })}
        onClick={onClick}
      >
        <div className="flex relative justify-center items-center w-6 h-6">
          <Icon className="!w-6 !h-6" />
          {showBadge && (
            <div className="absolute -top-[0.1875rem] -right-[0.1875rem] w-1.5 h-1.5 bg-icon-interactive-active rounded-full"></div>
          )}
        </div>

        <p className="grow">{label}</p>
        {/* If children exist, display expand button. */}
        {children ? (
          <IconButton
            Icon={ExpandButton}
            className="text-icon-secondary"
            onClick={() => setExpanded((e) => !e)}
            size="sm"
            variant="ghost"
          />
        ) : (
          // If children do not exist but rightNode does, display it.
          rightNode
        )}
      </div>

      {/* Load in background even when hidden. */}
      <div className={clsx({ hidden: !expanded })}>{children}</div>
    </RowWrapper>
  )
}

interface RowWrapperProps {
  localHref?: string
  remoteHref?: string
  children: ReactNode
}

const RowWrapper = ({ localHref, remoteHref, children }: RowWrapperProps) =>
  localHref ? (
    <Link href={localHref}>
      <a className="block">{children}</a>
    </Link>
  ) : remoteHref ? (
    <a className="block" href={remoteHref} rel="noreferrer" target="_blank">
      {children}
    </a>
  ) : (
    <div>{children}</div>
  )
