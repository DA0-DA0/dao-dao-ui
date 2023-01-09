import { UnfoldLess, UnfoldMore } from '@mui/icons-material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ComponentType, ReactNode, useEffect, useState } from 'react'

import { LinkWrapperProps } from '@dao-dao/types'

import { IconButton } from '../icon_buttons'
import { Loader } from '../logo/Loader'
import { Tooltip } from '../tooltip/Tooltip'

export interface RowProps {
  Icon: ComponentType<{ className: string }>
  label: string
  expandedLocalStorageKey?: string
  showBadge?: boolean
  onClick?: () => void
  children?: ReactNode
  rightNode?: ReactNode
  defaultExpanded?: boolean
  href?: string
  compact?: boolean
  loading?: boolean
  LinkWrapper: ComponentType<LinkWrapperProps>
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
  href,
  compact = false,
  loading = false,
  LinkWrapper,
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
    <RowWrapper LinkWrapper={LinkWrapper} href={href}>
      <div
        className={clsx('body-text flex flex-row items-center py-2.5 px-6', {
          'cursor-pointer transition-opacity hover:opacity-70 active:opacity-60':
            onClick || href,
          'bg-background-interactive-selected': href && href === asPath,
        })}
        onClick={onClick}
      >
        <Tooltip title={label}>
          <div
            className={clsx(
              'relative flex h-8 w-8 items-center justify-center',
              loading && 'animate-pulse'
            )}
          >
            <Icon className="!h-8 !w-8" />
            {showBadge && (
              <div className="absolute -top-[0.1875rem] -right-[0.1875rem] h-1.5 w-1.5 rounded-full bg-icon-interactive-active"></div>
            )}
          </div>
        </Tooltip>
      </div>

      <div>{children}</div>
    </RowWrapper>
  ) : (
    <RowWrapper LinkWrapper={LinkWrapper} href={href}>
      <div
        className={clsx('body-text flex flex-row items-center gap-4 p-2', {
          'cursor-pointer transition-opacity hover:opacity-70 active:opacity-60':
            onClick || href,
          'rounded-md bg-background-interactive-selected':
            href && href === asPath,
        })}
        onClick={onClick}
      >
        <div className="relative flex h-6 w-6 items-center justify-center">
          <Icon className="!h-6 !w-6" />
          {showBadge && (
            <div className="absolute -top-[0.1875rem] -right-[0.1875rem] h-1.5 w-1.5 rounded-full bg-icon-interactive-active"></div>
          )}
        </div>

        <p className="grow">{label}</p>

        {/* Override expand button with loader. */}
        {loading ? (
          <Loader className="!justify-end" size={24} />
        ) : // If children exist, display expand button.
        children ? (
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
  LinkWrapper: ComponentType<LinkWrapperProps>
  href?: string
  children: ReactNode
}

const RowWrapper = ({ LinkWrapper, href, children }: RowWrapperProps) =>
  href ? (
    <LinkWrapper className="block" href={href}>
      {children}
    </LinkWrapper>
  ) : (
    <div>{children}</div>
  )
