import { UnfoldLess, UnfoldMore } from '@mui/icons-material'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { ComponentType, ReactNode, useEffect, useState } from 'react'

import { LinkWrapperProps, RowProps } from '@dao-dao/types'

import { IconButton } from '../icon_buttons'
import { Loader } from '../logo/Loader'
import { Tooltip } from '../tooltip/Tooltip'

export const Row = ({
  Icon: _Icon,
  label,
  expandedLocalStorageKey,
  showBadge,
  onClick,
  children,
  rightNode,
  href,
  defaultExpanded = false,
  forceExpanded = false,
  compact = false,
  loading = false,
  selected = false,
  LinkWrapper,
  shallow,
  containerClassName,
  contentContainerClassName,
}: RowProps) => {
  const { asPath } = useRouter()
  const [expanded, setExpanded] = useState(
    forceExpanded ||
      (expandedLocalStorageKey && typeof localStorage !== 'undefined'
        ? localStorage.getItem(expandedLocalStorageKey) === '1'
        : defaultExpanded)
  )
  useEffect(() => {
    if (forceExpanded) {
      return
    }

    if (expandedLocalStorageKey && typeof localStorage !== 'undefined') {
      localStorage.setItem(expandedLocalStorageKey, Number(expanded).toString())
    }
  }, [expanded, expandedLocalStorageKey, forceExpanded])

  const Icon = _Icon || ((props) => <div {...props} style={{ content: ' ' }} />)
  const ExpandButton = expanded ? UnfoldLess : UnfoldMore

  // If no onClick or href, and has expandable children, set onClick to toggle
  // expanded.
  if (!onClick && !href && children && !loading) {
    onClick = () => setExpanded((e) => !e)
  }

  return compact ? (
    <div className={containerClassName}>
      <RowWrapper LinkWrapper={LinkWrapper} href={href} shallow={shallow}>
        <div
          className={clsx('body-text flex flex-row items-center py-2.5 px-6', {
            'cursor-pointer transition-opacity hover:opacity-70 active:opacity-60':
              onClick || href,
            'bg-background-interactive-selected':
              selected || (href && href === asPath),
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
                <div className="absolute -top-[0.1rem] right-0 h-1.5 w-1.5 animate-fade-in rounded-full bg-icon-interactive-active"></div>
              )}
            </div>
          </Tooltip>
        </div>
      </RowWrapper>

      <div className={clsx({ hidden: !expanded })}>{children}</div>
    </div>
  ) : (
    <div className={containerClassName}>
      <RowWrapper LinkWrapper={LinkWrapper} href={href} shallow={shallow}>
        <div
          className={clsx(
            'body-text flex flex-row items-center gap-4 p-3 md:gap-3 md:p-2',
            {
              'cursor-pointer transition-opacity hover:opacity-70 active:opacity-60':
                onClick || href,
              'rounded-md bg-background-interactive-selected':
                selected || (href && href === asPath),
            },
            contentContainerClassName
          )}
          onClick={onClick}
        >
          <div className="relative flex h-8 w-8 items-center justify-center md:h-6 md:w-6">
            <Icon className="!h-8 !w-8 md:!h-6 md:!w-6" />
            {showBadge && (
              <div className="absolute -top-[0.1875rem] -right-[0.1875rem] h-1.5 w-1.5 animate-fade-in rounded-full bg-icon-interactive-active"></div>
            )}
          </div>

          <p className="grow text-base md:text-sm">{label}</p>

          {/* Override expand button with loader. */}
          {loading ? (
            <Loader className="!justify-end" size={24} />
          ) : // If children exist and not forcing expanded, display expand button.
          children && !forceExpanded ? (
            <IconButton
              Icon={ExpandButton}
              className="text-icon-secondary"
              onClick={(event) => {
                event.stopPropagation()
                event.preventDefault()
                setExpanded((e) => !e)
              }}
              size="sm"
              variant="ghost"
            />
          ) : (
            // If children do not exist but rightNode does, display it.
            rightNode
          )}
        </div>
      </RowWrapper>

      {children && (
        // Load in background even when hidden.
        <div className={clsx({ hidden: !expanded })}>{children}</div>
      )}
    </div>
  )
}

interface RowWrapperProps {
  LinkWrapper: ComponentType<LinkWrapperProps>
  shallow?: boolean
  href?: string
  children: ReactNode
}

const RowWrapper = ({
  LinkWrapper,
  children,
  href,
  shallow,
}: RowWrapperProps) =>
  href ? (
    <LinkWrapper className="block" href={href} shallow={shallow}>
      {children}
    </LinkWrapper>
  ) : (
    <>{children}</>
  )
